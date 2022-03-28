<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_pageManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$pageManager = new PageManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    if (!isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Recaptcha token not provided, cannot process request without token');
    }
    
    try {
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $result = $pageManager->updatePageContent($_POST['id'], $_POST['content']);
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    jsonResponse('Page content section updated.');
}