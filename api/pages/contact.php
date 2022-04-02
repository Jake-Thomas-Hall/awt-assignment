<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_pageManagement.php';

$pageManager = new PageManagement();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $result = [];
    try {
        $result = $pageManager->getPageContent('contact');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    // Return result in formatted associated array.
    $formattedResults = [
        'contactTitle' => $result[array_search("contactTitle", array_column($result, 'pageSection'))],
        'contactCardFirst' => $result[array_search("contactCardFirst", array_column($result, 'pageSection'))],
        'contactCardSecondTitle' => $result[array_search("contactCardSecondTitle", array_column($result, 'pageSection'))],
        'contactCardThirdTitle' => $result[array_search("contactCardThirdTitle", array_column($result, 'pageSection'))]
    ];
    
    jsonResponse('Contact page content sections', $formattedResults);
}
