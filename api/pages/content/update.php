<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_pageManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$pageManager = new PageManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require __DIR__ . '/../../auth/authGuard.php';

    // Do not allow past if recaptcha token not provided.
    if (!isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Recaptcha token not provided, cannot process request without token');
    }
    
    try {
        // Validate that recaptcha score is not low, and then perform content update.
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $result = $pageManager->updatePageContent($_POST['id'], $_POST['content']);
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    jsonResponse('Page content section updated.');
}