<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$project_id  = isset($data['project_id']) ? (int)$data['project_id'] : 0;
$category_name = trim((string)($data['category'] ?? ''));
$title       = trim((string)($data['title'] ?? ''));
$description = trim((string)($data['description'] ?? ''));
$image_url   = trim((string)($data['imageUrl'] ?? ''));
$github_url  = trim((string)($data['githubUrl'] ?? ''));
$demo_url    = trim((string)($data['demoUrl'] ?? ''));

if ($project_id <= 0 || $category_name === '' || $title === '' || $description === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill all required fields.']);
    exit();
}

$image_url = $image_url === '' ? null : $image_url;
$github_url = $github_url === '' ? null : $github_url;
$demo_url = $demo_url === '' ? null : $demo_url;

try {
    $cat_stmt = $pdo->prepare('SELECT id FROM categories WHERE name = ?');
    $cat_stmt->execute([$category_name]);
    $category = $cat_stmt->fetch(PDO::FETCH_ASSOC);

    if (!$category) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid category selected.']);
        exit();
    }
    $category_id = $category['id'];

    $stmt = $pdo->prepare('
        UPDATE projects 
        SET category_id = ?, title = ?, description = ?, image_url = ?, github_url = ?, demo_url = ?
        WHERE id = ?
    ');
    $stmt->execute([$category_id, $title, $description, $image_url, $github_url, $demo_url, $project_id]);

    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Project updated successfully!']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found or no changes made.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error. Could not update project.']);
}
