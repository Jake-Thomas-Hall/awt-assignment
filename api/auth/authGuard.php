<?php
// Intended to be used as script via require before protected pages, not intended to run on it's own.
require __DIR__ . '/../php/_auth.php';
require __DIR__ . '/../php/_utilities.php';

$auth = new Auth();

$requestHeaders = apache_request_headers();

if (!array_key_exists('Authorization', $requestHeaders)) {
    jsonErrorResponse(403, 'Login failed, please login again.', null);
}

// Error out and return 403 if token authentication fails. Front end redirect to login screen in this scenario.
// If successful, allow continuation without issue.
if (!$auth->authGuard($requestHeaders['Authorization'])) {
    jsonErrorResponse(403, 'Login failed, please login again.', null);
}
