<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use POST.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$student_id = isset($data['student_id']) ? (int)$data['student_id'] : 0;
$category_name = trim((string)($data['category'] ?? ''));
$title = trim((string)($data['title'] ?? ''));
$description = trim((string)($data['description'] ?? ''));
$image_url = trim((string)($data['imageUrl'] ?? ''));
$github_url = trim((string)($data['githubUrl'] ?? ''));
$demo_url = trim((string)($data['demoUrl'] ?? ''));

if ($student_id <= 0 || $category_name === '' || $title === '' || $description === '') {
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

    $stmt = $pdo->prepare('INSERT INTO projects (student_id, category_id, title, description, image_url, github_url, demo_url) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$student_id, $category_id, $title, $description, $image_url, $github_url, $demo_url]);

    http_response_code(201);
    echo json_encode([
        'message' => 'Project published successfully!',
        'project_id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    error_log('Create project failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error. Could not publish project.']);
}
