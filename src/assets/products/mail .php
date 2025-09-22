<?php
// Enable error reporting (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set response header for JSON output
header('Content-Type: application/json');

// Read raw JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Sanitize and assign variables
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$company = trim($data['company'] ?? '');
$message = trim($data['message'] ?? '');

// Validate required fields
if (
    empty($name) || empty($email) || empty($phone) || empty($message) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    !preg_match('/^[0-9]{10}$/', $phone)
) {
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields correctly.']);
    exit;
}

// Database credentials
$servername = "localhost";
$username = "root";
$password = ""; // Your DB password here
$dbname = "aquilainnovation_db";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, company, message) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $name, $email, $phone, $company, $message);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send your message. Please try again.']);
}

$stmt->close();
$conn->close();
?>
