<?php
include '../database.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$token_pattern="/^[a-zA-Z0-9]*$/";

if(isset($request->email) and isset($request->token))
{ 
    preg_match($token_pattern,$request->token,$matched_token);
    if(filter_var($request->email, FILTER_VALIDATE_EMAIL) and $matched_token[0]==$request->token) 
    {
        $email=$request->email;
        $token=$request->token;
        $res=$mysqli->query("SELECT EMAIL,TOKEN FROM AUTHENTICATE WHERE EMAIL='$email' and token='$matched_token[0]'");
        if($res->num_rows>0)
        {
            $res = $mysqli->query("delete from authenticate where token='$request->token' and email='$email'");
          
            if($res->affected_rows>0)
            {
                for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			    {
				    $res->data_seek($row_no);
				    $row = $res->fetch_assoc();
				    $arra[$row_no]=$row;
			    }
                $message['status']='success';
                $message['email']=$arra[0]['email'];
                echo json_encode($message);
            }
            else
            {
                $message['status']='fail';
                $message['messgage']="Unable to logout3";
                echo json_encode($message);
            }
        }
        else
        {
            $message['status']='fail';
            $message['messgage']="Unable to logout2";
            echo json_encode($message);    
        }
    }
    else
    {
        $message['status']='fail';
        $message['messgage']="Unable to logout1";
        echo json_encode($message);
    }
}
?>