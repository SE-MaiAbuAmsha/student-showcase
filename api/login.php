<?php
// login.php: check the credentials and start a session.
require_once 'auth.php'; // CHANGED: auth.php already loads db.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed. Please use POST.']);
}

$data     = json_decode(file_get_contents('php://input'), true);
$email    = strtolower(trim((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

if ($email === '' || $password === '') {
    respond(400, ['error' => 'Please enter both email and password.']);
}

try {
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM students WHERE email = ?');
    $stmt->execute([$email]);
    $student = $stmt->fetch(); // CHANGED: FETCH_ASSOC is already the default in db.php

    // CHANGED: one check for both cases. The same message hides which emails exist.
    if (!$student || !password_verify($password, $student['password_hash'])) {
        respond(401, ['error' => 'Invalid email or password.']);
    }

    start_session(); // CHANGED: shared helper with the safer cookie settings
    session_regenerate_id(true); // new session id after login (prevents session fixation)
    $_SESSION['student_id'] = (int)$student['id']; // CHANGED: only the id is stored; the name is read from the DB when needed

    respond(200, [
        'student' => [ // CHANGED: key renamed from "user" to match the table name
            'id'    => (int)$student['id'],
            'name'  => $student['name'],
            'email' => $student['email'],
        ],
    ]);
} catch (PDOException $e) {
    error_log('Login failed: ' . $e->getMessage());
    respond(500, ['error' => 'Server error. Please try again later.']);
}
