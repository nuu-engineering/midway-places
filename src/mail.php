<?php
    // header('Access-Control-Allow-Origin: *');
    if(isset($_POST['email'])) {
        require_once __DIR__ . '/vendor/autoload.php';

        //Configuration recovered from: http://ourcodeworld.com/articles/read/14/swiftmailer-send-mails-from-php-easily-and-effortlessly
        $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
            ->setUsername('daniel.ortiz@nuu.co')
            ->setPassword('ywtxgnkwfzmsalhp');

        $mailer = new Swift_Mailer($transport);

        $messageText = $_POST['message'];
        $inquiryType = $_POST['inquiry'];
        $toEmail = array("daniel.ortiz@nuu.co" => "Testing | Daniel");
        $name = $_POST['name'];
        $email = $_POST['email'];
        $fromEmail = array($email => $name);

        switch ($inquiryType) {
          case "development":
            $toEmail["lsloan@midway.team"] = "Larry Sloan";
            $testEmail = "dev";
            break;

          case "property-operations":
            $toEmail["mhart@midway.team"] = "Micah Hart";
            $testEmail = "props";
            break;

          case "marketing":
            $toEmail["sbedinger@midway.team"] = "Shannon Bedinger";
            $testEmail = "market";
            break;

          case "leasing";
            $toEmail["ljacobs@midway.team"] = "Lacee Jacobs";
            $testEmail = "lease";
            break;

          case "investment":
            $toEmail["rwilliamson@midway.team"] = "Robert Williamson";
            $testEmail = "invest";
            break;

          default:
            $toEmail["daniel.ortiz@nuu.co"] = "Daniel | Inquiry Error";
        }

        // You can change "A message from Pivot Template Form" to your own subject if you want.
        $message = (new Swift_Message('New Midway submission'))
            ->setFrom($fromEmail)
            ->setTo($toEmail)
            ->setReplyTo($fromEmail)
            ->setBody('Email: ' . $email . "\n" . 'Name: ' . $name . "\n" . 'Inquiry Type: ' . $inquiryType . "\n\n" . 'Message: ' . $messageText);

        // Send the message or catch an error if it occurs.
        try{
          echo($mailer->send($message));
        }
        catch(Exception $e){
          echo($e->getMessage());
          error_log($e->getMessage());
        }
        http_response_code(200);
        return 200;
    }

    http_response_code(403);
    return 403;
?>