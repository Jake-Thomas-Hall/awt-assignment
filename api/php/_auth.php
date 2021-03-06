<?php

class Auth
{
    public int $id = 0;
    public string $email = "";
    public string $firstName = "";
    public string $lastName = "";
    public string $password = "";
    public string $created = "";
    public string $token = "";

    public function validateRecaptcha(string $recaptchaToken): void {
        $config = include(__DIR__ . '/../config.php');

        // Prepare POST fields for curl
        $fields = [
            'secret' => $config->app_recaptchaSecret,
            'response' => $recaptchaToken
        ];

        // Build the fields into query string.
        $fieldsString = http_build_query($fields);

        // Initialise curl and set options to perform query
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fieldsString);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Get raw query result
        $rawResult = curl_exec($ch);

        // Decode the resulting JSON.
        $recaptchaVerify = json_decode($rawResult);

        // If score does not exist, then for some reason the recaptcha query failed. Do not return informative message, just return same message for security.
        if (!property_exists($recaptchaVerify, 'score')) {
            throw new Exception('Request failed; our spam dedection determined that this request potentially originated from a bot, please try again.');
        }

        // Disallow scores below 0.35, most of the time scores come back as 0.9, so decided to be really forgiving here considering now alternative 
        // recaptcha v2 auth can take place instead on frontend.
        if ($recaptchaVerify->score < 0.35) {
            throw new Exception('Request failed; our spam dedection determined that this request potentially originated from a bot, please try again.');
        }
    }

    public function login(string $email, string $password): void
    {
        global $connection;

        // Fetch user details by email
        $userQuery = $connection->prepare("SELECT id, firstName, lastName, email, password, created FROM tbl_users WHERE email = ?");

        $userQuery->bind_param("s", $email);
        $userQuery->execute();

        $userQuery->bind_result($resultId, $resultFirstName, $resultLastName, $resultEmail, $resultPassword, $resultCreated);
        $userQuery->store_result();

        // If no user found, throw error.
        if ($userQuery->num_rows() > 0) {
            $userQuery->fetch();

            // Validate password, if fails, return error.
            if (password_verify($password, $resultPassword)) {
                // Store user details for later potential use within this Auth class instance
                $this->id = $resultId;
                $this->email = $resultEmail;
                $this->firstName = $resultFirstName;
                $this->lastName = $resultLastName;
                $this->created = $resultCreated;

                // Now need to create a persistant login token to return for this user.
                $tokenInsertQuery = $connection->query("INSERT INTO tbl_authorise (userId) VALUES ($this->id)");

                if ($tokenInsertQuery) {
                    // If insert of new login token succeeds, return it from method and also set last login of user.
                    $tokenQuery = $connection->query("SELECT token FROM tbl_authorise WHERE id = $connection->insert_id;");

                    $connection->query("UPDATE tbl_users SET lastLogin=now() WHERE id = $this->id;");

                    $row = $tokenQuery->fetch_assoc();

                    $this->token = $row['token'];
                }
                else {
                    throw new Exception('Login succeeded, but acquiring a persistance token failed. Plese try logging in again.');
                }
            } else {
                throw new Exception('Login failed, credentials were not valid.');
            }
        } else {
            throw new Exception('Login failed, credentials were not valid.');
        }
    }

    public function logout(string $token): void {
        global $connection;

        // Remove this specific login token, doesn't remove all login tokens for user in order to preserve other sessions they may have.
        $logoutQuery = $connection->prepare("DELETE FROM tbl_authorise WHERE token = ?");

        $logoutQuery->bind_param("s", $token);
        $delete = $logoutQuery->execute();

        if (!$delete || $logoutQuery->affected_rows < 1) {
            throw new Exception('Logout failed.');
        }
    }

    public function authGuard(string $token): bool
    {
        global $connection;

        // Function is used to check if token is a valid login token
        $tokenQuery = $connection->prepare("SELECT userId FROM tbl_authorise WHERE token = ?");

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

            // Store login details for later user as part of this auth instance.
            $this->id = $row['id'];
            $this->firstName = $row['firstName'];
            $this->lastName = $row['lastName'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->created = $row['created'];

            // Also update last login date for user (don't need to worry about checking if this succeeded or not)
            $connection->query("UPDATE tbl_users SET lastLogin=now() WHERE id = $this->id;");

            return true;
        }

        return false;
    }
}
