<?php
// db.php: the database connection used by every API file.

$db_host = 'localhost';
$db_name = 'student_showcase_db';
$db_user = 'root';
$db_pass = '';

// the CORS lines were removed because the Vite proxy makes them unnecessary
header('Content-Type: application/json; charset=UTF-8');

function respond($status, $data)
{
    http_response_code($status);
    echo json_encode($data);
    exit();
}

try {
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,       // throw errors instead of failing silently
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,  // rows come back as named arrays
        ]
    );
} catch (PDOException $e) {
    // the real reason goes to the server log, the browser gets a generic message
    error_log('DB connection failed: ' . $e->getMessage());
    respond(500, ['error' => 'Server error. Please try again later.']);
}
