<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_userManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$userManager = new UserManagement();

// Via get request, return logged in users detail - uses fact that authGuard performs a login check to get these details, hows that for reuse :)
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require __DIR__ . '/../../auth/authGuard.php';
    
    // Return in associated array
    jsonResponse('User details fetched', [
        'firstName' => $auth->firstName,
        'lastName' => $auth->lastName,
        'created' => $auth->created,
        'email' => $auth->email
    ]);
}

// When posting instead, perform an update of user details
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    // Check required parameters are provided
    if (!isset($_POST['userId']) || !isset($_POST['firstName']) || !isset($_POST['lastName']) || !isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Parameters required to perform user details update not provided.');
    }

    try {
        // Validate recaptcha score is not low and perform update of user details.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $userManager->updateUserDetails($_POST['userId'], $_POST['firstName'], $_POST['lastName']);
        jsonResponse('Your user details have been successfully updated.');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }    
}