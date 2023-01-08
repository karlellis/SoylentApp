<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");



$response = array();
if ($_FILES['logo']) {
    $upload_dir = '../img/';
    $logo_name = $_FILES["logo"]["name"];
    $logo_tmp_name = $_FILES["logo"]["tmp_name"];
    $error = $_FILES["logo"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    } else {
        $random_name = rand(1000, 1000000) . "-" . $logo_name;
        $upload_name = $upload_dir . $random_name;
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($logo_tmp_name, $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "UploadOk",
                "filename" => $random_name
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "UploadError"
            );
        }
    }
} else if ($_FILES['back']) {
    $upload_dir = '../img/';
    $back_name = $_FILES["back"]["name"];
    $back_tmp_name = $_FILES["back"]["tmp_name"];
    $error = $_FILES["back"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    } else {
        $random_name = rand(1000, 1000000) . "-" . $back_name;
        $upload_name = $upload_dir . $random_name;
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($back_tmp_name, $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "UploadOk",
                "filename" => $random_name
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "UploadError"
            );
        }
    }
} else if ($_FILES['icon']) {
    $upload_dir = '../appicons/';
    $icon_name = $_FILES["icon"]["name"];
    $icon_tmp_name = $_FILES["icon"]["tmp_name"];
    $error = $_FILES["icon"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "UploadError"
        );
    } else {
        $random_name = rand(1000, 1000000) . "-" . $icon_name;
        $upload_name = $upload_dir . $random_name;
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($icon_tmp_name, $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "UploadOk",
                "filename" => $random_name
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "UploadError"
            );
        }
    }
} else if ($_POST['config']) {
    $json = $_POST["config"];
    $error = $_POST["config"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "DeleteError"
        );
    } else {
        //write json to file
        if (file_put_contents("../config/data.json", $json)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "JsonOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "JsonError"
            );
        }
    }
} else if ($_POST['logo']) {
    $del_name = $_POST["logo"];
    $error = $_POST["logo"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "DeleteError"
        );
    } else {
        if (unlink("." . $del_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "DeleteOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "DeleteError"
            );
        }
    }
}  else if ($_POST['back']) {
    $del_name = $_POST["back"];
    $error = $_POST["back"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "DeleteError"
        );
    } else {
        if (unlink("." . $del_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "DeleteOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "DeleteError"
            );
        }
    }
} else if ($_POST['icon']) {
    $del_name = $_POST["icon"];
    $error = $_POST["icon"]["error"];

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "DeleteError"
        );
    } else {
        if (unlink("." . $del_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "DeleteOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "DeleteError"
            );
        }
    }
} else {
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "RequestError"
    );
}

echo json_encode($response);
