<?php
// logout.php: destroy the session on the server.
require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed. Please use POST.']);
}

start_session();
$_SESSION = [];     // empty the stored data
session_destroy();  // delete the session itself

respond(200, ['message' => 'Logged out.']);
