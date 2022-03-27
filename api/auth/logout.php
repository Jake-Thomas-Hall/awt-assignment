<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Could not logout, bad request.');
    }

    $requestHeaders = apache_request_headers();

    if (!array_key_exists('Auth-Token', $requestHeaders)) {
        jsonErrorResponse(400, 'You are not currently logged in.');
    }
    
    try {
        // Recaptcha before attempting to logout, guards from bot login attempts.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $auth->logout($requestHeaders['Auth-Token']);
    }
    catch (Exception $ex) {
        jsonErrorResponse(500, $ex->getMessage());
    }
    
    jsonResponse('Logout successful.', ['LogoutSuccess' => true]);
}

