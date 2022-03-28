<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_pageManagement.php';
require __DIR__ . '/../php/_auth.php';

$pageManager = new PageManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!isset($_GET['recaptchaToken'])) {
        jsonErrorResponse(400, 'Recaptcha token not provided, cannot process request without token');
    }
    
    $result = [];
    try {
        $auth->validateRecaptcha($_GET['recaptchaToken']);
        $result = $pageManager->getPageContent('home');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    $formattedResults = [
        'homeCardFirst' => $result[array_search("homeCardFirst", array_column($result, 'pageSection'))],
        'homeCardSecond' => $result[array_search("homeCardSecond", array_column($result, 'pageSection'))]
    ];
    
    jsonResponse('Home page content sections', $formattedResults);
}
