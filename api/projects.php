<?php
// projects.php: Fetch all projects 

require_once 'db.php';

// Only GET requests are allowed here
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use GET.']);
    exit();
}

try {
    // SQL query to get projects with their category name and student name
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
        ORDER BY p.created_at DESC
    ";

    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch all results as an associative array
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    http_response_code(200);
    echo json_encode($projects);
} catch (PDOException $e) {
    // Log the error and return a generic message
    error_log('Fetch projects failed: ' . $e->getMessage());
    http_response_code(500);
    // Temporarily show the detailed error for debugging
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
