<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

// Normal logins are done via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        try {
            $auth->login($_POST['email'], $_POST['password']);

            jsonResponse("Login successful", ['token' => $auth->token]);
        } catch (Exception $ex) {
            jsonErrorResponse(403, $ex->getMessage(), null);
        }
    } else {
        jsonErrorResponse(400, 'Login failed; credentials not provided.', null);
    }
}

// Token checks done via GET - API endpoints are guarded by 'authGuard.php' being used inline, this endpoint can be used by frontend to check user access when loading 
// a protected page.
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $requestHeaders = apache_request_headers();

    if (!array_key_exists('Authorization', $requestHeaders)) {
        jsonErrorResponse(403, 'Login failed, please login again.', null);
    }

    // Error out and return 403 if token authentication fails. If successful, return 200.
    if (!$auth->authGuard($requestHeaders['Authorization'])) {
        jsonErrorResponse(403, 'Login failed, please login again.', null);
    }
    else {
        jsonResponse("Token authentication passed.", ['authStatus' => true]);
    }
}
