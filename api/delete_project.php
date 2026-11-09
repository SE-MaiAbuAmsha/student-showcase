<?php
// delete_project.php: Delete a project by ID.
require_once 'db.php';

// Only DELETE requests are allowed
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use DELETE.']);
    exit();
}

// Get the project ID from the URL (e.g., delete_project.php?id=5)
$project_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($project_id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid project ID.']);
    exit();
}

try {
    // Delete the project from the database
    $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$project_id]);

    // Check if a row was actually deleted
    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Project deleted successfully.']);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'Project not found.']);
    }
} catch (PDOException $e) {
    error_log('Delete project failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error. Could not delete project.']);
}
