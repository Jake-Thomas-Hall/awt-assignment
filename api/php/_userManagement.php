<?php

class UserManagement
{
    public function addUser(Auth $user): int
    {
        global $connection;

        // Check that user does not already exist first, DB strucutre does this as well via unique key, better to test for it instead of relying on that though.
        if (!is_null($this->getIdFromName($user->email))) {
            throw new Exception('An account with this email already exists.');
        }

        $addAccountQuery = $connection->prepare("INSERT INTO tbl_users (firstName, lastName, email, password) VALUES (?, ?, ?, ?);");
        $hash = password_hash($user->password, PASSWORD_DEFAULT);

        // Bind hashed password into prepared statement and use user details from auth object.
        $addAccountQuery->bind_param("ssss", $user->firstName, $user->lastName, $user->email, $hash);
        $addAccountQuery->execute();

        if (!empty($addAccountQuery->error)) {
            throw new Exception("Failed to add user.");
        }

        // Return the inserted user id, for potential usage/returning to frontend
        return $addAccountQuery->insert_id;
    }

    public function removeUser(Auth $user)
    {
        global $connection;

        // Perform a simple delete statement using the user Id from the provided auth object.
        $addAccountQuery = $connection->prepare("DELETE FROM tbl_users WHERE id = ?;");

        $addAccountQuery->bind_param("i", $user->id);
        $addAccountQuery->execute();

        if (!empty($addAccountQuery->error)) {
            throw new Exception("Failed to remove user.");
        }
    }

    public function getIdFromName(string $email): int|null
    {
        global $connection;
        // Gets the user's Id using the email address, this is why the emails need to be unique as well.
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
        // Insert password reset token for user.
        $insertReset = $connection->query("INSERT INTO tbl_password_reset (userId) VALUES ($userId);");

        if (!$insertReset) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        // Get the inserted token and user details
        $tokenQuery = $connection->query("SELECT token FROM tbl_password_reset WHERE id = $connection->insert_id;");
        $userQuery = $connection->query("SELECT firstName, lastName, email FROM tbl_users WHERE id = $userId;");

        if (!$tokenQuery || !$userQuery) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        $tokenRow = $tokenQuery->fetch_assoc();
        $userRow = $userQuery->fetch_assoc();

        $config = include(__DIR__ . '/../config.php');

        // Send email to user, providing link to perform password reset within email body.
        $to = $userRow['email'];
        $subject = 'Hazel Admin password reset';
        $message = "<p>Please click the link below to reset your password</p>
        <a href='{$config->app_address}/admin/login/reset-confirm?token={$tokenRow['token']}'>Reset password</a>
        <br/>
        <p>Please do not reply to this email; this inbox is not monitored.</p>";
        $headers = [
            'From' => $config->app_email,
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'text/html; charset=UTF-8'
        ];

        mail($to, $subject, $message, $headers);
    }

    public function resetPasswordConfirm(string $token, string $newPassword, string $newPasswordConfirm): void
    {
        global $connection;

        // check that the provided passwords actually match
        if ($newPassword !== $newPasswordConfirm) {
            throw new Exception('New passwords does not match, please try again.');
        }

        // Check that the token actually exists in the reset table.
        $tokenQuery = $connection->prepare("SELECT id, userId, created FROM tbl_password_reset WHERE token = ?");

        $tokenQuery->bind_param("s", $token);
        $tokenQuery->execute();

        $tokenQuery->bind_result($tokenId, $userId, $createdDateString);
        $tokenQuery->store_result();
        $tokenQuery->fetch();

        if ($tokenQuery->num_rows() < 1) {
            throw new Exception('Could not reset password, please send a new password reset email.');
        }

        // Check that it's not been more than an hour elapsed since password reset was requested
        $createdDateTime = new DateTime($createdDateString);
        $nowDateTime = new DateTime();

        $difference = $createdDateTime->diff($nowDateTime);
        $hoursDifference = $difference->h + ($difference->days * 24);

        // Throw exception and clean up expired reset token if hour has elapsed.
        if ($hoursDifference >= 1) {
            $connection->query("DELETE FROM tbl_password_reset WHERE id = $tokenId;");
            throw new Exception('Cannot resset password, this reset link has expired (reset links expire after one hour)');
        }

        // Now finally update the user's password
        $this->updateUserPassword($userId, $newPassword);

        // Clean up any outstanding reset tokens for this user; previously generated ones should not be valid after a reset succeeds
        $connection->query("DELETE FROM tbl_password_reset WHERE userId = $userId");
    }

    public function updateUserPassword(int $userId, string $newPassword): void
    {
        global $connection;

        // Hash and use prepared statement to update user password
        $hash = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordQuery = $connection->prepare("UPDATE `tbl_users` SET `password` = ? WHERE id = ?;");
        $updatePasswordQuery->bind_param("si", $hash, $userId);
        $updatePasswordQuery->execute();

        if (!empty($updatePasswordQuery->error)) {
            throw new Exception("Failed to update password.");
        }

        // Removes all user sessions; do not want to allow login via tokens that were aquired via old password, expectation that user logs in again in all
        // locations after a password reset, front end should redirect to login upon update password actions.
        $removeSessionsQuery = $connection->prepare("DELETE FROM tbl_authorise WHERE userId = ?");
        $removeSessionsQuery->bind_param("i", $userId);
        $removeSessionsQuery->execute();

        if (!empty($removeSessionsQuery->error)) {
            throw new Exception('Failed to log user out from persisted sessions.');
        }
    }

    // Solely used when performing user password updates.
    public function checkUserPassword(int $userId, string $currentPassword)
    {
        global $connection;

        // Fetch user details by id
        $userQuery = $connection->prepare("SELECT id, firstName, lastName, email, password, created FROM tbl_users WHERE id = ?");

        $userQuery->bind_param("i", $userId);
        $userQuery->execute();

        $userQuery->bind_result($resultId, $resultFirstName, $resultLastName, $resultEmail, $resultPassword, $resultCreated);
        $userQuery->store_result();

        // If no user found, throw error.
        if ($userQuery->num_rows() > 0) {
            $userQuery->fetch();

            // Validate password, if fails, throw error
            if (!password_verify($currentPassword, $resultPassword)) {
                throw new Exception('Cannot update password, current password not valid.');
            }
        } else {
            throw new Exception('Cannot update password, current password not valid.');
        }
    }

    public function getUsers(int $pageNum): array
    {
        global $connection;

        // Use limit to paginate results, return 11 so that frontend knows to show next button or not.
        $limitEnd = (10 * $pageNum) + 1;
        $limitStart = $limitEnd - 11;

        $getUsersStmt = $connection->prepare("SELECT tbl_users.id, tbl_users.firstName, tbl_users.lastName, tbl_users.email, tbl_users.created, tbl_users.lastLogin FROM `tbl_users` LIMIT ?, ?;");
        $getUsersStmt->bind_param("ii", $limitStart, $limitEnd);
        $getUsersStmt->execute();

        $result = $getUsersStmt->get_result() ?: throw new Exception("Error while fetching users");

        $users = $result->fetch_all(MYSQLI_ASSOC);

        return $users;
    }

    public function updateUserDetails(int $userId, string $firstName, string $lastName)
    {
        global $connection;

        // Allow user first/last name to be updated, do not allow emails to be updated due to all the annoying issues that poses...
        $updateUserStmt = $connection->prepare("UPDATE tbl_users SET tbl_users.firstName = ?, tbl_users.lastName = ? WHERE tbl_users.id = ?;");
        $updateUserStmt->bind_param("ssi", $firstName, $lastName, $userId);
        $updateUserStmt->execute();

        if (!empty($updateUserStmt->error)) {
            throw new Exception("Failed to update user details.");
        }
    }
}
