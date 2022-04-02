<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_userManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    // Check required parameters are present.
    if (!isset($_POST['firstName']) || !isset($_POST['lastName']) || !isset($_POST['email']) || !isset($_POST['newPassword']) || !isset($_POST['newPasswordConfirm']) || !isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Parameters required to add new user not provided.');
    }

    // Check provided passwords match
    if ($_POST['newPassword'] !== $_POST['newPasswordConfirm']) {
        jsonErrorResponse(400, 'Password for new user does not match, please try again.');
    }

    // Set up auth object in order to perform user insert.
    $newUser = new Auth();
    $newUser->firstName = $_POST['firstName'];
    $newUser->lastName = $_POST['lastName'];
    $newUser->email = $_POST['email'];
    $newUser->password = $_POST['newPassword'];

    try {
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $userManager->addUser($newUser);
        jsonResponse('User successfully added.');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }    
}