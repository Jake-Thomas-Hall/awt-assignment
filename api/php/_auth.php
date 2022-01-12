<?php

class Auth
{
    public int $id = 0;
    public string $email = "";
    public string $firstName = "";
    public string $lastName = "";
    public string $created = "";

    public function login(string $email, string $password): bool
    {
        global $connection;

        $userQuery = $connection->prepare("SELECT id, firstName, lastName, email, password, created FROM t_users WHERE email = ?");

        $userQuery->bind_param("s", $email);
        $userQuery->execute();

        $userQuery->bind_result($resultId, $resultFirstName, $resultLastName, $resultEmail, $resultPassword, $resultCreated);
        $userQuery->store_result();

        if ($userQuery->num_rows() > 0) {
            $userQuery->fetch();

            if (password_verify($password, $resultPassword)) {
                $this->id = $resultId;
                $this->email = $resultEmail;
                $this->firstName = $resultFirstName;
                $this->lastName = $resultLastName;
                $this->created = $resultCreated;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function authGuard(string $token): bool
    {
        global $connection;

        $tokenQuery = $connection->prepare("SELECT iduser FROM tbl_authorise WHERE token = ?");

        $tokenQuery->bind_param("s", $token);
        $tokenQuery->execute();

        $tokenQuery->bind_result($userID);
        $tokenQuery->store_result();

        // If result is more than 0, this means a persisted session has been found.
        if ($tokenQuery->num_rows > 0) {
            $tokenQuery->fetch();

            // Fetch user based on associated Id of user from the persist table.
            $userQuery = $connection->query("SELECT id, firstName, lastName, email, password, created FROM tbl_users WHERE id = {$userID}");
            $row = $userQuery->fetch_assoc();

            $this->id = $row['id'];
            $this->firstName = $row['firstName'];
            $this->lastName = $row['lastName'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->created = $row['created'];
            return true;
        }
    }
}
