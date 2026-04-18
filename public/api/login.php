<?php
// ini_set('session.save_path', 'C:\lighttpd\sessions'); // Solo per lighttpd da commentare in produzione
session_start();
header('Content-Type: application/json');

if ($_POST['action'] === 'login') {
    $userIn = $_POST['username'];
    $passIn = $_POST['password'];

    // Read the secret file from the server
    $secData = json_decode(file_get_contents("../sec/sec.json"), true);

    // Use password_verify to compare the hash
    if (password_verify($userIn, $secData['user']) && password_verify($passIn, $secData['password'])) {
        $_SESSION['admin_logged_in'] = true;
        session_write_close(); 
        echo json_encode(["status" => "success", "authenticated" => true]);
    } else {
        session_write_close(); 
        echo json_encode(["status" => "error", "message" => "Credenziali errate"]);
    }
    exit;
}
