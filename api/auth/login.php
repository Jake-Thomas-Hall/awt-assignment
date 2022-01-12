<?php
require __DIR__ . '/../php/_connect.php';
require __DIR__ . '/../php/_auth.php';

$auth = new Auth();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        if (!$auth->login($_POST['email'], $_POST['password'])) {
            http_response_code(403);
            header('Content-Type: application/json');
            json_encode([
                'status' => 403,
                'message' => 'Login failed; credentials invalid'
            ]);
            die;
        }
    }
}