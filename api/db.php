<?php
// db.php - Database Connection File

// 1. Database Credentials
$host = 'localhost';
$dbname = 'student_showcase_db'; // اسم الداتا بيز (تأكدي إنه مطابق للي عملتيه)
$username = 'root';   // اسم المستخدم الافتراضي في XAMPP
$password = '';       // الباسورد الافتراضي في XAMPP فاضي

// 2. CORS Headers (Very Important for React to connect with PHP)
// This tells the browser that it's okay for React (on port 5173) to request data from this PHP file.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 3. Handle Preflight Request
// Browsers send an OPTIONS request first to check if the server is secure. We just say "Yes, go ahead".
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 4. Try to Connect
try {
    // Create a new connection using PDO (the safest way to connect to MySQL)
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    // Tell PDO to throw an error if something goes wrong (so we can see the error)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // If the connection is successful, do nothing. The script will continue.

} catch (PDOException $e) {
    // 5. If connection fails, return a JSON error message
    http_response_code(500); // 500 means "Internal Server Error"
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit(); // Stop the script
}
