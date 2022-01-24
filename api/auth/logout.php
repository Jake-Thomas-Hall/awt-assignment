<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

$requestHeaders = apache_request_headers();

if (!array_key_exists('Authorization', $requestHeaders)) {
    jsonErrorResponse(400, 'You are not currently logged in.');
}

try {
    $auth->logout($requestHeaders['Authorization']);
}
catch (Exception $ex) {
    jsonErrorResponse(500, $ex->getMessage());
}

jsonResponse('Logout successful.', ['LogoutSuccess' => true]);
