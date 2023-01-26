<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

// For XAMPP - Suppress notice and warning
// ini_set('display_errors', 0);
// error_reporting(E_ERROR | E_WARNING | E_PARSE);

$default = [
    'logo' => '',
    'back' => '',
    'icon' => ''
];

$default2 = [
    'logo' => '',
    'back' => '',
    'icon' => '',
    'config' => '',
    'credentials' => ''
];

$default3 = [
    'credentials' => '',
];

$_POST = array_replace($default2, $_POST);
$_FILES = array_replace($default, $_FILES);
$_GET = array_replace($default3, $_GET);

$credentials = json_decode(file_get_contents('../sec/sec.json'), true);

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
            "message" => "Error uploading the logo file!"
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
                "message" => "LogoUploadError"
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
            "message" => "Error uploading the Back file!"
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
                "message" => "BackUploadError"
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
            "message" => "Error uploading the Icon file!"
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
                "message" => "IconUploadError"
            );
        }
    }
} else if ($_POST['config']) {
    $json = $_POST["config"];
    $error = null;
    if (is_array($_POST) && !empty($_POST["config"]["error"])) {
        $error = $_POST["config"]["error"];
    }

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the Icon file!"
        );
    } else {
        //write json to file
        if (file_put_contents("../config/data.json", $json)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "ConfigJsonOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "ConfigJsonError"
            );
        }
    }
} else if ($_POST['credentials']) {
    $json = $_POST["credentials"];
    $error = null;
    if (is_array($_POST) && !empty($_POST["credentials"]["error"])) {
        $error = $_POST["credentials"]["error"];
    }

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading credentials file!"
        );
    } else {
        //write json to file
        if (file_put_contents("../sec/sec.json", $json)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "CredentialsJsonOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "CredentialsJsonError"
            );
        }
    }
} else if ($_POST['logo']) {
    $del_name = $_POST["logo"];
    $error = null;
    if (is_array($_POST) && !empty($_POST["logo"]["error"])) {
        $error = $_POST["logo"]["error"];
    }

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error deleting the Logo file!"
        );
    } else {
        if (unlink("." . $del_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "LogoDeleteOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "LogoDeleteError"
            );
        }
    }
} else if ($_POST['back']) {
    $del_name = $_POST["back"];
    $error = null;
    if (is_array($_POST) && !empty($_POST["back"]["error"])) {
        $error = $_POST["back"]["error"];
    }

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error deleting the Back file!"
        );
    } else {
        if (unlink("." . $del_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "BackDeleteOk",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "BackDeleteError"
            );
        }
    }
} else if ($_POST['icon']) {
    $del_name = $_POST["icon"];
    $error = null;
    if (is_array($_POST) && !empty($_POST["icon"]["error"])) {
        $error = $_POST["icon"]["error"];
    }

    if ($error > 0) {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error deleting the Icon file!"
        );
    } else {
        if (file_exists("." . $del_name)) {
            unlink("." . $del_name);
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "IconDeleteOk",
            );
            // unlink('your_file_name');
        } else {
            $data = '{"Error":[{"Type":"File", "Details":"File not found!"}]}';
            $response = json_decode($data);
            // echo 'File not found!';
        }
        // if (unlink("." . $del_name)) {
        //     $response = array(
        //         "status" => "success",
        //         "error" => false,
        //         "message" => "IconDeleteOk",
        //     );
        // } else {
        //     $response = array(
        //         "status" => "error",
        //         "error" => true,
        //         "message" => "IconDeleteError"
        //     );
        // }
    }
} else if ($_GET) {
    $response = $credentials;
} else {
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "RequestError"
    );
}

echo json_encode($response);
