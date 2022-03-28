<?php
require __DIR__ . '/../../php/_connect.php';
require __DIR__ . '/../../php/_pageManagement.php';
require __DIR__ . '/../../php/_utilities.php';
require __DIR__ . '/../../php/_auth.php';

$pageManager = new PageManagement();
$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['recaptchaToken'])) {
        jsonErrorResponse(400, 'Recaptcha token not provided, cannot process request without token');
    }

    if (!isset($_POST['name']) && !isset($_POST['email']) && !isset($_POST['company']) && !isset($_POST['message'])) {
        jsonErrorResponse(400, 'Could not send enquiry, bad form data.');
    }
    
    try {
        $auth->validateRecaptcha($_POST['recaptchaToken']);
        $result = $pageManager->sendEnquiryEmail($_POST['name'], $_POST['email'], $_POST['message'], $_POST['company']);
    }
    catch (Exception $exception) {
        jsonErrorResponse(500, $exception->getMessage());
    }
    
    jsonResponse('Enquiry email sent. Please wait for a response, we aim to get back to messages within 3 working days.');
}