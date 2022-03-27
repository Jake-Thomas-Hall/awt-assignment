<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';
require __DIR__ . '/../php/_utilities.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        try {
            $result = $userManager->getIdFromName($_POST['email']);

            if (!is_null($result)) {
                $userManager->sendResetEmail($result);
            }
    
            jsonResponse("Password reset request sent; if this email address exists in the system you will receive a reset email. Please follow the steps in the email.");
        }
        catch (Exception $exception) {
            jsonErrorResponse(500, $exception->getMessage());
        }
    } else {
        jsonErrorResponse(400, 'Request reset failed; email not provided.');
    }
}
