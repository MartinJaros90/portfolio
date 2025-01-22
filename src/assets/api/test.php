<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log file für Debugging
$logFile = __DIR__ . '/test_log.txt';
function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, date('Y-m-d H:i:s') . ": $message\n", FILE_APPEND);
}

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $json = file_get_contents('php://input');
        logMessage("Received data: " . $json);
        
        $data = json_decode($json);
        
        if (!$data) {
            throw new Exception("Invalid JSON data");
        }
        
        // Simuliere E-Mail-Versand
        logMessage("Simulating email send to: " . ($data->email ?? 'no email provided'));
        
        // Simuliere Verzögerung
        sleep(1);
        
        // Sende Test-Response zurück
        echo json_encode([
            'success' => true,
            'message' => 'Test successful',
            'received_data' => $data
        ]);
        
    } catch (Exception $e) {
        logMessage("Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}