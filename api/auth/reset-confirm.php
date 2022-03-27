<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_auth.php';

$userManager = new UserManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['token']) && isset($_POST['newPassword']) && isset($_POST['newPasswordConfirm']) && isset($_POST['recaptchaToken'])) {
        try {
            $auth->validateRecaptcha($_POST['recaptchaToken']);
            $userManager->resetPasswordConfirm($_POST['token'], $_POST['newPassword'], $_POST['newPasswordConfirm']);
        }
        catch (Exception $ex) {
            jsonErrorResponse(500, $ex->getMessage(), null);
        }

        jsonResponse("Password successfully reset, please attempt to login.");
    } else {
        jsonErrorResponse(400, 'Request reset failed; all data required not provided');
    }
}