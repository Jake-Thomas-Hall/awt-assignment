<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_auth.php';

$userManager = new UserManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['recaptchaToken'])) {
        try {
            // Validate recaptcha score is not low
            $auth->validateRecaptcha($_POST['recaptchaToken']);
            // Get ID for provided user id
            $result = $userManager->getIdFromName($_POST['email']);

            // If result is not null, send reset email.
            if (!is_null($result)) {
                $userManager->sendResetEmail($result);
            }
    
            // Do not indicate to user if email exists in system or not, prevents security risks.
            jsonResponse("Password reset request sent; if this email address exists in the system you will receive a reset email. Please follow the steps in the email.");
        }
        catch (Exception $exception) {
            jsonErrorResponse(500, $exception->getMessage());
        }
    } else {
        jsonErrorResponse(400, 'Request reset failed; required data not provided.');
    }
}
