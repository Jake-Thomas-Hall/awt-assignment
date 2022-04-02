<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_userManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    // Check that required parameters are provided.
    if (!isset($_POST['userId']) || !isset($_POST['newPassword']) || !isset($_POST['newPasswordConfirm']) || !isset($_POST['currentPassword']) || !isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Parameters required to perform password update not provided.');
    }

    // Check new password matches via confirm field
    if ($_POST['newPassword'] !== $_POST['newPasswordConfirm']) {
        jsonErrorResponse(400, 'New password did not match, please try again.');
    }

    try {
        // Validate recaptcha score is not low, then perform password update.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $userManager->checkUserPassword($_POST['userId'], $_POST['currentPassword']);
        $userManager->updateUserPassword($_POST['userId'], $_POST['newPassword']);
        jsonResponse('Your password has successfully been updated, please log back in.');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }    
}