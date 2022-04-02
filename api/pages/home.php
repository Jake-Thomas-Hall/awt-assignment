<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_pageManagement.php';

$pageManager = new PageManagement();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $result = [];
    try {
        $result = $pageManager->getPageContent('home');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    // Return results in a formatted associated array.
    $formattedResults = [
        'homeTitle' => $result[array_search("homeTitle", array_column($result, 'pageSection'))],
        'homeCarouselTitle' => $result[array_search("homeCarouselTitle", array_column($result, 'pageSection'))],
        'homeCardFirst' => $result[array_search("homeCardFirst", array_column($result, 'pageSection'))],
        'homeCardSecond' => $result[array_search("homeCardSecond", array_column($result, 'pageSection'))]
    ];
    
    jsonResponse('Home page content sections', $formattedResults);
}
