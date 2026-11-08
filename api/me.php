<?php
// me.php: returns the logged-in student, or 401 if there is no valid session.
require_once 'auth.php';

$id = require_login();

$stmt = $pdo->prepare('SELECT id, name, email FROM students WHERE id = ?');
$stmt->execute([$id]);
$student = $stmt->fetch();

// The account was deleted while the session was still alive.
if (!$student) {
    respond(401, ['error' => 'Please log in first.']);
}

respond(200, ['student' => $student]);
