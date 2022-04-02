<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_userManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    if (!isset($_POST['userId']) || !isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Parameters required remove user not provided.');
    }

    // Hard coded to prevent removal of default admin account (id will never change if DB is imported in right way)
    if ($_POST['userId'] == 3) {
        jsonErrorResponse(500, 'You cannot remove the default admin account.');
    }

    // Setup auth object with user Id in order to perform removal.
    $newUser = new Auth();
    $newUser->id = $_POST['userId'];

    try {
        // Validate recaptcha score is not low, then remove user.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $userManager->removeUser($newUser);
        jsonResponse('User successfully removed.');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }    
}