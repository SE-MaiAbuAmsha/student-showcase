<?php
//delete a project. Only its owner can do it.
require_once 'project_input.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    respond(405, ['error' => 'Method not allowed. Please use DELETE.']);
}

$studentId = require_login();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    respond(400, ['error' => 'Invalid project ID.']);
}

require_own_project($pdo, $id, $studentId); // ownership check

try {
    $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ? AND student_id = ?');
    $stmt->execute([$id, $studentId]);
    respond(200, ['message' => 'Project deleted.']);
} catch (PDOException $e) {
    error_log('Delete project failed: ' . $e->getMessage());
    respond(500, ['error' => 'Server error. Could not delete project.']);
}
