<?php
// helpers shared by the project endpoints.
require_once 'auth.php';

function clean_url($value, $label)
{
    $value = trim((string)$value);
    if ($value === '') {
        return null;
    }
    if (strlen($value) > 500 || !preg_match('#^https?://#i', $value) || !filter_var($value, FILTER_VALIDATE_URL)) {
        respond(400, ['error' => "$label must be a valid link starting with http:// or https://."]);
    }
    return $value;
}

function read_project_input($pdo, $data)
{
    $data        = is_array($data) ? $data : [];
    $title       = trim((string)($data['title'] ?? ''));
    $description = trim((string)($data['description'] ?? ''));
    $category    = trim((string)($data['category'] ?? ''));

    if (mb_strlen($title) < 3 || mb_strlen($title) > 150) {
        respond(400, ['error' => 'Title must be between 3 and 150 characters.']);
    }
    if (mb_strlen($description) < 20 || mb_strlen($description) > 600) {
        respond(400, ['error' => 'Description must be between 20 and 600 characters.']);
    }

    $stmt = $pdo->prepare('SELECT id FROM categories WHERE name = ?');
    $stmt->execute([$category]);
    $categoryId = $stmt->fetchColumn();
    if ($categoryId === false) {
        respond(400, ['error' => 'Please choose a valid category.']);
    }

    return [
        'category_id' => (int)$categoryId,
        'title'       => $title,
        'description' => $description,
        'image_url'   => clean_url($data['imageUrl'] ?? '', 'Image URL'),
        'github_url'  => clean_url($data['githubUrl'] ?? '', 'GitHub URL'),
        'demo_url'    => clean_url($data['demoUrl'] ?? '', 'Demo URL'),
    ];
}

function require_own_project($pdo, $projectId, $studentId)
{
    $stmt = $pdo->prepare('SELECT student_id FROM projects WHERE id = ?');
    $stmt->execute([$projectId]);
    $row = $stmt->fetch();

    if (!$row) {
        respond(404, ['error' => 'Project not found.']);
    }
    if ((int)$row['student_id'] !== $studentId) {
        respond(403, ['error' => 'You can only change your own projects.']);
    }
}

function format_project($row)
{
    $row['id']        = (int)$row['id'];
    $row['studentId'] = (int)$row['studentId'];
    return $row;
}
