<?php
// auth.php: session helpers shared by every endpoint that needs a logged-in student.
require_once 'db.php';

// Start the session once, with safer cookie settings.
function start_session()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'httponly' => true,   // JavaScript cannot read the session cookie
            'samesite' => 'Lax',  // the cookie is not sent with POST/PUT/DELETE from other sites
        ]);
        session_start();
    }
}

// Returns the logged-in student's id, or null if nobody is logged in.
function current_student_id()
{
    start_session();
    return isset($_SESSION['student_id']) ? (int)$_SESSION['student_id'] : null;
}

// Stops the request with 401 unless a student is logged in. Returns the id otherwise.
function require_login()
{
    $id = current_student_id();
    if ($id === null) {
        respond(401, ['error' => 'Please log in first.']);
    }
    return $id;
}
