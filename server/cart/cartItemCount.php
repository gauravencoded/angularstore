<?php
include '../database.php';

 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";
if(isset($request->email)  and isset($request->token) )
{	
	  preg_match($token_pattern,$request->token,$matched_token);
    if(filter_var($request->email, FILTER_VALIDATE_EMAIL) and $matched_token[0]==$request->token) 
    {
        $email=$request->email;
        $token=$request->token;
        $res=$mysqli->query("SELECT EMAIL,TOKEN FROM authenticate WHERE EMAIL='$email' and token='$matched_token[0]'");
        if($res->num_rows>0)
        {
            $res = $mysqli->query("SELECT sum(quantity) FROM cart where email='$request->email'");
	        for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_row();
                $arr[0]=$row;
			}
            if($arr[0][0]>0)
            {
                echo json_encode($arr);        
            }
            else
            {
                echo 0;
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