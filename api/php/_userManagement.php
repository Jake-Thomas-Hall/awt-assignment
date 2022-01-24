<?php

class UserManagement
{
    public function addUser(Auth $user): int
    {
        global $connection;

        if (!is_null($this->getIdFromName($user->email))) {
            throw new Exception('An account with this email already exists.');
        }

        $addAccountQuery = $connection->prepare("INSERT INTO tbl_users (firstName, lastName, email, password) VALUES (?, ?, ?, ?);");
        $hash = password_hash($user->password, PASSWORD_DEFAULT);

        $addAccountQuery->bind_param("ssss", $user->firstName, $user->lastName, $user->email, $hash);
        $addAccountQuery->execute();

        if (!empty($addAccountQuery->error)) {
            throw new Exception("Failed to add user.");
        }

        return $addAccountQuery->insert_id;
    }

    public function getIdFromName(string $email): int|null
    {
        global $connection;
        $userQuery = $connection->prepare("SELECT id FROM tbl_users WHERE email = ?");

        $userQuery->bind_param("s", $email);
        $userQuery->execute();

        $userQuery->bind_result($userID);
        $userQuery->store_result();
        $userQuery->fetch();

        return $userQuery->num_rows() > 0 ? $userID : null;
    }

    public function sendResetEmail(int $userId): void
    {
        global $connection;
        $insertReset = $connection->query("INSERT INTO tbl_password_reset (userId) VALUES ($userId);");

        if (!$insertReset) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        $tokenQuery = $connection->query("SELECT token FROM tbl_password_reset WHERE id = $connection->insert_id;");
        $userQuery = $connection->query("SELECT firstName, lastName, email FROM tbl_users WHERE id = $userId;");

        if (!$tokenQuery || !$userQuery) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        $tokenRow = $tokenQuery->fetch_assoc();
        $userRow = $userQuery->fetch_assoc();

        $config = include(__DIR__ . '/../config.php');

        $to = $userRow['email'];
        $subject = 'Hazel Admin password reset';
        $message = "<p>Please click the link below to reset your password</p>
        <a href='{$config->app_address}/admin/reset?token={$tokenRow['token']}'>Reset password</a>
        <p>Please do not reply to this email; this inbox is not monitored.</p>";
        $headers = [
            'From' => $config->app_email,
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'text/html; charset=UTF-8'
        ];

        mail($to, $subject, $message, $headers);
    }

    public function resetPasswordConfirm(string $token, string $newPassword, string $newPasswordConfirm): void {
        global $connection;

        if ($newPassword !== $newPasswordConfirm) {
            throw new Exception('New passwords does not match, please try again.');
        }

        $tokenQuery = $connection->prepare("SELECT userId FROM tbl_password_reset WHERE token = ?");

        $tokenQuery->bind_param("s", $token);
        $tokenQuery->execute();

        $tokenQuery->bind_result($userId);
        $tokenQuery->store_result();
        $tokenQuery->fetch();

        if ($tokenQuery->num_rows() < 1) {
            throw new Exception('Could not reset password, please send a new password reset email.');
        }

        $this->updateUserPassword($userId, $newPassword);

        // Clean up any outstanding reset tokens for this user; previously generated ones should not be valid after a reset succeeds
        $connection->query("DELETE FROM tbl_password_reset WHERE userId = $userId");
    }

    public function updateUserPassword(int $userId, string $newPassword): void {
        global $connection;

        // Assumsion made that input already santisied or retreived directly from DB by the time it reaches this point
        $hash = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordQuery = $connection->query("UPDATE `tbl_users` SET `password` = '$hash' WHERE id = $userId;");

        // Removes all user sessions; do not want to allow login via tokens that were aquired via old password, expectation that user logs in again in all
        // locations after a password reset
        $removeSessionsQuery = $connection->query("DELETE FROM tbl_authorise WHERE userId = $userId");
        
        if (!$updatePasswordQuery || !$removeSessionsQuery) {
            throw new Exception('Could not set new password.');
        }
    }
}
