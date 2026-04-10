<?php
// ini_set('session.save_path', 'C:\lighttpd\sessions'); // Solo per lighttpd da commentare in produzione
session_start(); // Deve essere la PRIMA riga del file
header('Content-Type: application/json'); // Forza il browser a capire che è JSON

if ($_POST['action'] === 'login') {
    $userIn = $_POST['username'];
    $passIn = $_POST['password'];

    // Leggi il file segreto dal server
    $secData = json_decode(file_get_contents("../sec/sec.json"), true);

    // Usa password_verify per confrontare l'hash
    if (password_verify($userIn, $secData['user']) && password_verify($passIn, $secData['password'])) {
        $_SESSION['admin_logged_in'] = true;
        session_write_close(); 
        // Opzionale: Inizia una sessione PHP qui
        echo json_encode(["status" => "success", "authenticated" => true]);
    } else {
        session_write_close(); 
        echo json_encode(["status" => "error", "message" => "Credenziali errate"]);
    }
    exit;
}
