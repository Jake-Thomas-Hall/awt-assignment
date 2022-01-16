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

    public function getIdFromName(string $email)
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
}
