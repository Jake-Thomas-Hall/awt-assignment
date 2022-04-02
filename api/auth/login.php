<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

// Normal logins are done via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['recaptchaToken'])) {
        try {
            // Use recaptcha to check user isn't bot before attempting login
            $auth->validateRecaptcha($_POST['recaptchaToken']);
            $auth->login($_POST['email'], $_POST['password']);

            jsonResponse("Login successful", [
                'token' => $auth->token,
                'userId' => $auth->id
            ]);
        } catch (Exception $ex) {
            jsonErrorResponse(403, $ex->getMessage());
        }
    } else {
        jsonErrorResponse(400, 'Login failed; credentials not provided.');
    }
}

// Token checks done via GET - API endpoints are guarded by 'authGuard.php' being used inline, this endpoint can be used by frontend to check user access when loading 
// a protected page, or to perform automatic logins via persisted token.
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!isset($_GET['recaptchaToken'])) {
        jsonErrorResponse(400, 'Login failed, bad request.');
    }

    try {
        // Use recaptcha to check user isn't bot before attempting token login
        $auth->validateRecaptcha($_GET['recaptchaToken']);
        $requestHeaders = apache_request_headers();

        if (!array_key_exists('Auth-Token', $requestHeaders)) {
            jsonErrorResponse(403, 'Login failed, please login again.');
        }
    
        // Error out and return 403 if token authentication fails. If successful, return 200.
        if (!$auth->authGuard($requestHeaders['Auth-Token'])) {
            jsonErrorResponse(403, 'Login failed, please login again.');
        }
        else {
            jsonResponse("Token authentication passed.", [
                'authStatus' => true,
                'userId' => $auth->id
            ]);
        }
    }
    catch (Exception $exception) {
        jsonErrorResponse(400, $exception->getMessage());
    }
}
