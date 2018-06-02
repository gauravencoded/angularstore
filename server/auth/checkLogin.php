<?php $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
if(isset($request->email) and isset($request->password))
{
	include '../database.php';
    if(strlen($request->email)<=7 or strlen($request->email)>=50)
    {
        $message['status']="Fail";
		$message['cause']="Your email or password is not correct";
		echo json_encode($message);
    }
    else
    {
        //check if email is in proper format
	   $res = $mysqli->query("SELECT name,email,password FROM customers where email='$request->email' and password='$request->password' and status='Active'");
	   
        if($res->num_rows!=0)
	    {
	      $token=generateRandomString($length = 16); 
          $row_no = $res->num_rows-1;
		  $res->data_seek($row_no);
		  $row = $res->fetch_assoc();
          $message['status']='success';
          $message['name']=$row['name'];
          $message['email']=$row['email'];
          $message['token']=$token;
        
          //insert the authentication token in database table authentication
          $date=getdate();
          $initDate=$date['mday']."-".$date['mon']."-".$date['year'];
            
            $res1=$mysqli->query("insert into authenticate values('$request->email','$token','$initDate')");
            
            if($mysqli->affected_rows==1) //if inserted successfully
            {
                if(isset($request->products))
                {   
                    $cartItems=json_decode($request->products);  
                 
                    foreach($cartItems->items as $c)
                    {
                        $res=$mysqli->query("select quantity from cart where productId=$c->productId and size='$c->size' and email='$request->email'");
                    
                        if($res->num_rows==0)
                        { 
                            $res = $mysqli->query("insert into cart values($c->productId,'$c->size','$request->email',$c->quantity)");
                        }
                        else
                        {
                            $row_no = $res->num_rows - 1;
		                    $res->data_seek($row_no);
		                    $row = $res->fetch_assoc();
		                    $row['quantity']=$row['quantity'];
		                    $f_quantity=$row['quantity']+$c->quantity;
                            $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId=$c->productId  and email='$request->email'");
                    }
                }
            }
            echo json_encode($message);
	   }
       else //return error if token insertion fails
        {
          $message['status']="Fail";
		  $message['cause']="OOPS! We are facing problems logging you in. Please try again.";
		  echo json_encode($message);  
        }
    }   
    else
	{	
        $message['status']="Fail";
		$message['cause']="Your email or password is not correct";
		echo json_encode($message);
	}
}}
else
{  
	$message['status']="Fail";
	$message['cause']="Please enter your email and password";
	echo json_encode($message);
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