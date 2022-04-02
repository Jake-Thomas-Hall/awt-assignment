<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_userManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require __DIR__ . '/../../auth/authGuard.php';

    // Page parameter must be provided in order to allow limits to work.
    if (!isset($_GET['page'])) {
        jsonErrorResponse(400, 'Parameter required to list users not provided.');
    }

    try {
        // Get array of users, returns empty array if page num is provided outside of acceptable range, rather than erroring.
        $users = $userManager->getUsers($_GET['page']);
        jsonResponse('Users successfully fetched.', $users);
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }    
}