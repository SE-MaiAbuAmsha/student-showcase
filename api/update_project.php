<?php
// update_project.php: Update an existing project.
require_once 'db.php';

// Only POST or PUT requests are allowed (we'll use POST for simplicity)
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use PUT or POST.']);
    exit();
}

// Read JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Extract and sanitize
$project_id  = isset($data['project_id']) ? (int)$data['project_id'] : 0;
$category_id = isset($data['category_id']) ? (int)$data['category_id'] : 0;
$title       = trim((string)($data['title'] ?? ''));
$description = trim((string)($data['description'] ?? ''));
$image_url   = trim((string)($data['image_url'] ?? ''));
$github_url  = trim((string)($data['github_url'] ?? ''));
$demo_url    = trim((string)($data['demo_url'] ?? ''));

// Validate required fields
if ($project_id <= 0 || $category_id <= 0 || $title === '' || $description === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill all required fields (title, description, category).']);
    exit();
}

// Convert empty strings to NULL
$image_url = $image_url === '' ? null : $image_url;
$github_url = $github_url === '' ? null : $github_url;
$demo_url = $demo_url === '' ? null : $demo_url;

try {
    // Update the project in the database
    $stmt = $pdo->prepare('
        UPDATE projects 
        SET category_id = ?, title = ?, description = ?, image_url = ?, github_url = ?, demo_url = ?
        WHERE id = ?
    ');
    $stmt->execute([$category_id, $title, $description, $image_url, $github_url, $demo_url, $project_id]);

    // Check if the project existed and was updated
    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Project updated successfully!']);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'Project not found or no changes were made.']);
    }
} catch (PDOException $e) {
    error_log('Update project failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error. Could not update project.']);
}
