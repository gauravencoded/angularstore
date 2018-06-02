<?php

include "../database.php";
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$namePattern="/^[a-zA-Z ]*$/";
$passwordPattern="/^[a-zA-Z0-9]*$/";
$mobilePattern="/^[0-9]{10}/";

$insert=true;

    if(isset($request->registerName) and isset($request->registerEmail) and isset($request->registerPassword) and isset($request->registerMobile) )
    {
       
        preg_match($passwordPattern,$request->registerPassword,$matchedPassword);
        preg_match($mobilePattern,$request->registerMobile,$matchedMobile);
        preg_match($namePattern,$request->registerName,$matchedName);
        
        if(!filter_var($request->registerEmail,FILTER_VALIDATE_EMAIL))
        {
            $insert=false;
            $message['status']="fail";
            $message['email']="Please enter correct email";
        }
        if($request->registerName!=$matchedName[0])
        {
            $insert=false;
            $message['status']="fail";
            $message['name']="Your name should be Alphanumeric";
       
        }
       if($request->registerMobile!=$matchedMobile[0])
        {
            $insert=false;
            $message['status']="fail";
            $message['mobile']="The Mobile number you entered seems to be incorrect";
        }
      
        if($request->registerPassword!=$matchedPassword[0])
        {
            $insert=false;
            $message['status']="fail";
            $message['password']="Your passwords seems to be containing unwanted characters";
       
        }
       
        if($insert!=false)
        { 
            $date=getdate();
            $initDate=$date['mday']."-".$date['mon']."-".$date['year'];
            $res=$mysqli->query("INSERT INTO customers VALUES('$request->registerName','00-00-0000','$request->registerEmail','$request->registerMobile','$request->registerPassword','$initDate','New')");
        
            if($mysqli->affected_rows>0)
            {
                if(isset($request->products))
                {   
                    $cartItems=json_decode($request->products);  
                 
                    foreach($cartItems->items as $c)
                    {
                        $res=$mysqli->query("select quantity from cart where productId=$c->productId and size='$c->size' and email='$request->registerEmail'");
                    
                        if($res->num_rows==0)
                        { 
                            $res = $mysqli->query("insert into cart values($c->productId,'$c->size','$request->registerEmail',$c->quantity)");
                        }
                        else
                        {
                            $row_no = $res->num_rows - 1;
		                    $res->data_seek($row_no);
		                    $row = $res->fetch_assoc();
		                    $row['quantity']=$row['quantity'];
		                    $f_quantity=$row['quantity']+$c->quantity;
                            $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId=$c->productId  and email='$request->registerEmail'");
                        }
                    }
                }
                //send mail here
                //generate link here
                 $token=generateRandomString($length = 16); 
                $otp=generateOTP($length=6);
                //insert into activation table
                $res=$mysqli->query("INSERT INTO activation VALUES('$request->registerEmail','$token','$otp','Unused')");
                
                
                
                
                $to  = $request->registerEmail . ', '; // note the comma
                $to .= 'singhgaurav4242@gmail.com';
                $subject = 'Welcome to CollegeCults';
                $msg = "
                            <html>
                                <head>
                                    <title>Welcome to CollegeCults</title>
                                </head>
                                <body>
                                <h4>Hi! $request->registerName,</h4>
                                    <p>You are welcome to CollegeCults. Thanks for registering please find below your account activation details.</p>
                                    <table>
                                       
                                        <tr>
                                            <td>OTP</td><td>$otp</td>
                                        </tr>
                                        <tr>
                                            <td>Activation link: </td><td><a href='http://collegecult.000webhostapp.com/activate.html?querystring=$token&email=$request->registerEmail'>Click To Activate</a></td>
                                        </tr>
                                    </table>
                                </body>
                            </html>";
                
                
                
                
               
                $headers  = 'MIME-Version: 1.0' . "\r\n";
                $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                $headers .= 'From: Collegecults Admin <admin@collegecult.esy.es>' . "\r\n";
                mail($to, $subject, $msg, $headers);
                
           
                $message['status']='success';
                echo json_encode($message);
                
            }
         
        }
        else
        {
            echo json_encode($message);
        }
       
    }
    else
    {
        // one of the array element is not set 
        $message['status']='fail';
        $message['description']="Some unexpected error occured";
        echo json_encode($message);
    }



function generateOTP($length = 6)  //function to generate random string token for authentication
        {
            $characters = '0123456789';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) 
            {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }
function generateRandomString($length = 16)  //function to generate random string token for authentication
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) 
            {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

?>