<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_pageManagement.php';

$pageManager = new PageManagement();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $result = [];
    try {
        $result = $pageManager->getPageContent('about');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    // Return result in formatted associated array.
    $formattedResults = [
        'aboutTitle' => $result[array_search("aboutTitle", array_column($result, 'pageSection'))],
        'aboutCardFirst' => $result[array_search("aboutCardFirst", array_column($result, 'pageSection'))],
        'aboutCardSecond' => $result[array_search("aboutCardSecond", array_column($result, 'pageSection'))],
        'aboutCardThird' => $result[array_search("aboutCardThird", array_column($result, 'pageSection'))]
    ];
    
    jsonResponse('About page content sections', $formattedResults);
}
