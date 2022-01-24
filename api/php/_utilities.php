<?php

function jsonResponse(string $message = "", $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'message' => $message,
        'data' => $data
    ]);
    die;
}

function jsonErrorResponse(int $code, string $message = "", $data = null) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'message' => $message,
        'data' => $data
    ]);
    die;
}