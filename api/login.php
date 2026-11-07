<?php
// login.php: Authenticate a student and start a session.

// Include the database connection file
require_once 'db.php';

// Start a PHP session to store the logged-in user's data
session_start();

// Only allow POST requests for security
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use POST.']);
    exit();
}

// Read the JSON data sent from React
$data = json_decode(file_get_contents('php://input'), true);

// Extract email and password, with default empty strings if not provided
$email    = strtolower(trim((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

// Check if either field is empty
if ($email === '' || $password === '') {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Please enter both email and password.']);
    exit();
}

try {
    // Prepare a SQL statement to find the user by email
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM students WHERE email = ?');

    // Execute the query with the provided email
    $stmt->execute([$email]);

    // Fetch the result as an associative array
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists AND if the provided password matches the hashed one
    // password_verify() securely compares plain text with the hash
    if ($user && password_verify($password, $user['password_hash'])) {

        // Generate a new session ID for security (prevents session fixation)
        session_regenerate_id(true);

        // Store user data in the session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];

        // Return success response with user details (excluding password)
        http_response_code(200); // OK
        echo json_encode([
            'message' => 'Login successful',
            'user' => [
                'id'    => $user['id'],
                'name'  => $user['name'],
                'email' => $user['email'],
            ],
        ]);
    } else {
        // If email not found OR password is wrong, return a generic error for security
        http_response_code(401); // Unauthorized
        echo json_encode(['error' => 'Invalid email or password.']);
    }
} catch (PDOException $e) {
    // Log the actual error for debugging (server-side)
    error_log('Login failed: ' . $e->getMessage());

    // Return a generic error message to the client (hide technical details)
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error. Please try again later.']);
}
