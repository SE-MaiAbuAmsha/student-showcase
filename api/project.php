<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit();
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid project ID.']);
    exit();
}

try {
    $stmt = $pdo->prepare('
        SELECT 
            p.id, 
            p.title, 
            p.description, 
            p.image_url AS imageUrl, 
            p.github_url AS githubUrl, 
            p.demo_url AS demoUrl, 
            p.student_id AS studentId,
            c.name AS category, 
            s.name AS author 
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        JOIN students s ON p.student_id = s.id
        WHERE p.id = ?
    ');
    $stmt->execute([$id]);
    $project = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($project) {
        http_response_code(200);
        echo json_encode($project);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error.']);
}
