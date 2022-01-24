<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_userManagement.php';
require __DIR__ . '/../php/_utilities.php';

$userManager = new UserManagement();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['token']) && isset($_POST['newPassword']) && isset($_POST['newPasswordConfirm'])) {
        try {
            $userManager->resetPasswordConfirm($_POST['token'], $_POST['newPassword'], $_POST['newPasswordConfirm']);
        }
        catch (Exception $ex) {
            jsonErrorResponse(500, $ex->getMessage(), null);
        }

        jsonResponse("Password successfully reset, please attempt a login.");
    } else {
        jsonErrorResponse(400, 'Request reset failed; email not provided.');
    }
}