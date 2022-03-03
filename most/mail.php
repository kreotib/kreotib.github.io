<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';


$mail = new PHPMailer(true);
$name = $_POST[‘name’];
$email = $_POST[‘email’];

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'smtp-relay.gmail.com';                     //Указать smtp сервер почты. Для примера здесь smtp сервер gmail
    $mail->SMTPAuth   = true;
    $mail->Username   = 'exmaple@gmail.com';                     //Логин от почты с которой будет отправлятся письмо
    $mail->Password   = 'pass';                               //Пароль от почты с которой будет отправлятся письмо
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('example@gmail.com', 'Mailer');  // Почта с которой отправляется письмо
    $mail->addAddress('example-to@gmail.com');     // Почта на которую отправлятся письмо (Адрес может быть один и тот же. Т.е отправка письма самому себе)

    //Content
    $mail->isHTML(true);
    $mail->Subject = “Заголовок”;
    $mail->Body = “Имя $name . Телефон $number . Почта $email”;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
