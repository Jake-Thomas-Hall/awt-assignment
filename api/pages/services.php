<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_utilities.php';
require __DIR__ . '/../php/_pageManagement.php';

$pageManager = new PageManagement();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $result = [];
    try {
        $result = $pageManager->getPageContent('services');
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    // Return result in formatted associated array.
    $formattedResults = [
        'servicesTitle' => $result[array_search("servicesTitle", array_column($result, 'pageSection'))],
        'servicesCardFirst' => $result[array_search("servicesCardFirst", array_column($result, 'pageSection'))],
        'servicesCardSecond' => $result[array_search("servicesCardSecond", array_column($result, 'pageSection'))],
        'servicesCardThird' => $result[array_search("servicesCardThird", array_column($result, 'pageSection'))],
        'servicesCardFourth' => $result[array_search("servicesCardFourth", array_column($result, 'pageSection'))],
        'servicesCardFifth' => $result[array_search("servicesCardFifth", array_column($result, 'pageSection'))]
    ];
    
    jsonResponse('Services page content sections', $formattedResults);
}
