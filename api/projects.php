<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    $student_id = null;

    if (isset($_GET['mine']) && $_GET['mine'] == '1') {
        if (isset($_GET['student_id'])) {
            $student_id = (int)$_GET['student_id'];
        }
    } elseif (isset($_GET['student_id'])) {
        $student_id = (int)$_GET['student_id'];
    }
    $sql = "
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
    ";

    if ($student_id) {
        $sql .= " WHERE p.student_id = ?";
    }

    $sql .= " ORDER BY p.created_at DESC";

    $stmt = $pdo->prepare($sql);

    if ($student_id) {
        $stmt->execute([$student_id]);
    } else {
        $stmt->execute();
    }

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($projects);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
