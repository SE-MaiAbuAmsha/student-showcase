<?php
// projects.php: Fetch projects. Can filter by student_id.

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    // 1. Check if a student_id is provided in the URL (e.g., projects.php?student_id=6)
    $student_id = isset($_GET['student_id']) ? (int)$_GET['student_id'] : null;

    $sql = "
        SELECT 
            p.id, 
            p.title, 
            p.description, 
            p.image_url, 
            p.github_url, 
            p.demo_url, 
            c.name AS category, 
            s.name AS author 
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        JOIN students s ON p.student_id = s.id
    ";

    // 2. If student_id is provided, filter by it
    if ($student_id) {
        $sql .= " WHERE p.student_id = ?";
    }

    $sql .= " ORDER BY p.created_at DESC";

    $stmt = $pdo->prepare($sql);

    // 3. Execute with or without the parameter
    if ($student_id) {
        $stmt->execute([$student_id]);
    } else {
        $stmt->execute();
    }

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($projects);
} catch (PDOException $e) {
    error_log('Fetch projects failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
