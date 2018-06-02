<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//var_dump($request);
$message=array();
if(isset($request->email))
{
    include '../database.php';
 	$res = $mysqli->query("SELECT email FROM customers where email='$request->email'");
    if($res->num_rows>0)
    {
        //generate a random sttring
        $bytes = random_int(0,1000000000);
        //update customer table
        $res=$mysqli->query("update customers set status='$bytes' where email='$request->email'");
        if($res)
        {  
            $res=$mysqli->query("select * from customers where email='$request->email' and status=$bytes");
            $res->data_seek($res->num_rows);
			$row = $res->fetch_assoc();
			$arr[0]=$row;
			echo json_encode($arr);
    
            $to=$request->email;
            $subject = 'CollegeCult- Password recovery';

            $msg = '
            <html>
            <head>
            <title>CollegeCult- Password recovery</title>
                </head>
                <body>
                <p>Click on the following link and you will be redirected to page for setting up nwe password.</p>
                <center><a href="/changePassword.html?status=$bytes">Recover Your Password</a></center>
                </body>
                </html>';

            // To send HTML mail, the Content-type header must be set
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            // Additional headers
            //$headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
            $headers .= 'From: CollegeCult <birthday@example.com>' . "\r\n";
            $headers .= 'Bcc: 4ravishanker@gmail.com' . "\r\n";
            $headers .= 'Bcc: singhgaurav4242@gmail.com' . "\r\n";
            // Mail it
            if(mail($to, $subject, $msg, $headers))
            {
                $message['status']='success';
                $message['message']="An email with the link to reset your password is sent to your email id". $request->email.". Please login and conform this is you.";
                echo json_encode($message);
            }
            else
            {
                $message['status']='fail';
                $message['case']="retry";
                $message['message']="Sorry, something went wrong. PLease try again.";  
                echo json_encode($message);
            }
        }
        else
        {
            echo "query failed";
        }
    }
    else
    {
        $message['status']='fail';
        $message['case']="absent";
        $message['message']="Sorry, ".$request->email." is not present in our system. Please Sign Up.";
         echo json_encode($message);
    }
}
?>