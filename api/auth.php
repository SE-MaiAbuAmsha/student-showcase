<?php
require_once 'db.php';

function start_session()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function current_student_id()
{
    start_session();
    return isset($_SESSION['student_id']) ? (int)$_SESSION['student_id'] : null;
}

function require_login()
{
    $id = current_student_id();
    if ($id === null) {
        respond(401, ['error' => 'Please log in first.']);
    }
    return $id;
}
