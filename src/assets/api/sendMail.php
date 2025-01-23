<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log file für Debugging
$logFile = __DIR__ . '/email_log.txt';
function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, date('Y-m-d H:i:s') . ": $message\n", FILE_APPEND);
}

// CORS Headers für alle Anfragen
header("Access-Control-Allow-Origin: https://martin-jaros.ch");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Log request method
logMessage("Request Method: " . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Log incoming request
        logMessage("Received POST request");
        
        // Get and parse JSON data
        $json = file_get_contents('php://input');
        logMessage("Received data: " . $json);
        
        $params = json_decode($json);
        
        if (!$params) {
            throw new Exception("Invalid JSON data");
        }
        
        if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
            throw new Exception("Missing required fields");
        }
        
        $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
        $name = htmlspecialchars($params->name);
        $message = htmlspecialchars($params->message);
        
        $recipient = 'martinjaros88@gmail.com';  
        $subject = "Contact From <$email>";
        $messageBody = "
            <html>
            <body>
                <h2>Neue Kontaktanfrage</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>E-Mail:</strong> $email</p>
                <p><strong>Nachricht:</strong><br>$message</p>
            </body>
            </html>";
        
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: Portfolio Contact Form <noreply@martin-jaros.ch>',
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $mailSent = mail($recipient, $subject, $messageBody, implode("\r\n", $headers));
        
        if ($mailSent) {
            logMessage("Mail sent successfully");
            echo json_encode(['success' => true]);
        } else {
            throw new Exception("Failed to send email");
        }
        
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
