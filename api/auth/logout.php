<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Could not logout, bad request.');
    }

    // Get the request headers
    $requestHeaders = apache_request_headers();

    // Auth-Token header must exist, gets attached to all requests that are sent via http interceptor on front end when user is logged in.
    if (!array_key_exists('Auth-Token', $requestHeaders)) {
        jsonErrorResponse(400, 'You are not currently logged in.');
    }
    
    try {
        // Recaptcha before attempting to logout, guards from bot logout attempts.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $auth->logout($requestHeaders['Auth-Token']);
    }
    catch (Exception $ex) {
        jsonErrorResponse(500, $ex->getMessage());
    }
    
    jsonResponse('Logout successful.', ['LogoutSuccess' => true]);
}

