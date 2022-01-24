<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';
require __DIR__ . '/../php/_utilities.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        $result = $userManager->getIdFromName($_POST['email']);

        if (!is_null($result)) {
            $userManager->sendResetEmail($result);
        }

        jsonResponse("Password reset email successfully sent");
    } else {
        jsonErrorResponse(400, 'Request reset failed; email not provided.');
    }
}
