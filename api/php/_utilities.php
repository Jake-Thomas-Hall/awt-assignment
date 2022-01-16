<?php

function jsonResponse(string $message = "", $data) {
    header('Content-Type: application/json');
    echo json_encode([
        'message' => $message,
        'data' => $data
    ]);
    die;
}

function jsonErrorResponse(int $code, string $message = "", $data) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'message' => $message,
        'data' => $data
    ]);
    die;
}