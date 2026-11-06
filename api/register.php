<?php
// register.php
require_once 'db.php';

// 1. Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Please use POST."]);
    exit();
}

// 2. Get the data sent from React (JSON format)
$data = json_decode(file_get_contents("php://input"));

// 3. Check if all required fields are present
if (empty($data->name) || empty($data->email) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill all required fields (name, email, password)."]);
    exit();
}

$name = trim($data->name);
$email = trim($data->email);
$password = $data->password;

// 4. Hash the password (for security)
$password_hash = password_hash($password, PASSWORD_DEFAULT);

try {
    // 5. Check if the email already exists
    $stmt = $pdo->prepare("SELECT id FROM students WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409); // 409 Conflict
        echo json_encode(["error" => "Email is already registered."]);
        exit();
    }

    // 6. Insert the new user into the database
    $stmt = $pdo->prepare("INSERT INTO students (name, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $password_hash]);

    // 7. Return success response
    http_response_code(201); // 201 Created
    echo json_encode([
        "message" => "Registration successful!",
        "user" => [
            "id" => $pdo->lastInsertId(),
            "name" => $name,
            "email" => $email
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Registration failed: " . $e->getMessage()]);
}
