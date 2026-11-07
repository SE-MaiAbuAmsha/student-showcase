<?php
// register.php: create a student account.
require_once 'db.php';

// Only POST is accepted.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed. Please use POST.']);
}

// CHANGED: read the JSON body as an array. A missing field becomes an empty string.
$data     = json_decode(file_get_contents('php://input'), true);
$name     = trim((string)($data['name'] ?? ''));
$email    = strtolower(trim((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

// CHANGED: validate on the server too, because the browser checks can be bypassed
if ($name === '' || $email === '' || $password === '') {
    respond(400, ['error' => 'Please fill all required fields (name, email, password).']);
}
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    respond(400, ['error' => 'Name must be between 2 and 100 characters.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
    respond(400, ['error' => 'Please enter a valid email address.']);
}
if (strlen($password) < 8 || strlen($password) > 72) { // bcrypt only reads 72 bytes
    respond(400, ['error' => 'Password must be between 8 and 72 characters.']);
}

// Never store the plain password.
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

try {
    // CHANGED: no SELECT first. The UNIQUE index on email does the check for us.
    $stmt = $pdo->prepare('INSERT INTO students (name, email, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $passwordHash]);

    respond(201, [
        'message' => 'Registration successful!',
        'student' => [
            'id'    => (int)$pdo->lastInsertId(),
            'name'  => $name,
            'email' => $email,
        ],
    ]);
} catch (PDOException $e) {
    // CHANGED: SQLSTATE 23000 means a duplicate value in a UNIQUE column (the email)
    if ($e->getCode() === '23000') {
        respond(409, ['error' => 'Email is already registered.']);
    }
    // CHANGED: log the details, send only a generic message
    error_log('Register failed: ' . $e->getMessage());
    respond(500, ['error' => 'Server error. Please try again later.']);
}
