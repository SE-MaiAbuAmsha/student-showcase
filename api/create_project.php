<?php
// create_project.php: Add a new project to the database.
require_once 'db.php';

// Only POST is allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use POST.']);
    exit();
}

// Read JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Extract and sanitize
$student_id  = isset($data['student_id']) ? (int)$data['student_id'] : 0;
$category_id = isset($data['category_id']) ? (int)$data['category_id'] : 0;
$title       = trim((string)($data['title'] ?? ''));
$description = trim((string)($data['description'] ?? ''));
$image_url   = trim((string)($data['image_url'] ?? ''));
$github_url  = trim((string)($data['github_url'] ?? '')); // Now optional
$demo_url    = trim((string)($data['demo_url'] ?? ''));

// Validate required fields
if ($student_id <= 0 || $category_id <= 0 || $title === '' || $description === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill all required fields.']);
    exit();
}

// Convert empty strings to NULL for the database
$image_url = $image_url === '' ? null : $image_url;
$github_url = $github_url === '' ? null : $github_url;
$demo_url = $demo_url === '' ? null : $demo_url;

try {
    // Insert project into the database
    $stmt = $pdo->prepare('INSERT INTO projects (student_id, category_id, title, description, image_url, github_url, demo_url) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$student_id, $category_id, $title, $description, $image_url, $github_url, $demo_url]);

    // Return success response
    http_response_code(201); // Created
    echo json_encode([
        'message' => 'Project published successfully!',
        'project_id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    // Log and return error
    error_log('Create project failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error. Could not publish project.']);
}
