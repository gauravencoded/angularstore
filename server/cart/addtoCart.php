 <?php
include '../database.php'; 
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";

//chack if the user is logged in ask her for credentials
if(isset($request->email) and isset($request->token) )//and isset($request->password']) and isset($request->sessionKey']))
{
	  preg_match($token_pattern,$request->token,$matched_token);
    if(filter_var($request->email, FILTER_VALIDATE_EMAIL) and $matched_token[0]==$request->token) 
    {
        $email=$request->email;
        $token=$request->token;
        $res=$mysqli->query("SELECT EMAIL,TOKEN FROM AUTHENTICATE WHERE EMAIL='$email' and token='$matched_token[0]'");
        if($res->num_rows>0)
        {//check if the productid is set
	       if(isset($request->productId))
	       {	
		      $res=$mysqli->query("update products set incart=incart+1 where productId=$request->productId");
              $res = $mysqli->query("select quantity from cart where productId='$request->productId'and email='$request->email' and size='$request->size'");
		      if($res->num_rows>0)
		      {
                    $row_no = $res->num_rows - 1;
		            $res->data_seek($row_no);
		            $row = $res->fetch_assoc();
		            $f_quantity=$row['quantity']+1;
		            $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$request->productId' and email='$request->email' and size='$request->size'");
		      }
		      else
		      {
		          $res = $mysqli->query("INSERT INTO cart values('$request->productId','$request->size','$request->email',1)");
		      }
        
              $res=$mysqli->query("Select sum(quantity) from cart where email='$request->email'");
              $row_no = $res->num_rows - 1;
              $res->data_seek($row_no);
		      $row = $res->fetch_assoc();
              $arr['count']=$row['sum(quantity)'];
              echo json_encode($arr);
	       }
	       else
	       {
	           $message['status']='fail';
               $message['message']="YSome unexpected error occured";
                echo json_encode($message);
	       }
        }
        else
        {
	        $message['status']='fail';
            $message['message']="You are not logged in1";
            echo json_encode($message);
        }
    }
    else
    {
	    $message['status']='fail';
        $message['message']="You are not logged in1";
        echo json_encode($message);
    }
}
else
{
    $message['status']='fail';
    $message['message']="You are not logged in1";
    echo json_encode($message);
}

?>