<?php

require __DIR__ . '/_auth.php';

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

    public function resetPassword(int $userId): void
    {
        global $connection;
        $insertReset = $connection->query("INSERT INTO tbl_password_reset (userId) VALUES ($userId);");

        if (!$insertReset) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        $tokenQuery = $connection->query("SELECT token FROM tbl_password_reset WHERE id = $connection->insert_id;");
        $userQuery= $connection->query("SELECT firstName, lastName, email FROM tbl_users WHERE id = $userId;");

        if (!$tokenQuery || !$userQuery) {
            throw new Exception('Error while sending reset authentication email, please try again.');
        }

        $tokenRow = $tokenQuery->fetch_assoc();
        $userRow = $tokenQuery->fetch_assoc();

        $config = include(__DIR__ . '/../config.php');
        

        $to = $userRow['email'];
        $subject = 'Hazel Admin password reset';
        $message = "Test body goes here.\r\nWith a new line as well :)";
        $headers = [
            'From' => $config->app_email,
            'X-Mailer' => 'PHP/' . phpversion()
        ];

        mail($to, $subject, $message, $headers);
    }
}
