<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        $result = $userManager->getIdFromName($_POST['email']);

        if (!is_null($result)) {

        }

        jsonResponse("Login successful", ['token' => $auth->token]);
    } else {
        jsonErrorResponse(400, 'Login failed; credentials not provided.', null);
    }
}
