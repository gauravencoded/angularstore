<?php
include "../database.php";
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$res = $mysqli->query("SELECT email FROM customers where email='$request->email'");
	
	if($res->num_rows!=0)
	{
	   if($request->requestType!='register')
       {
            $row_no = $res->num_rows-1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
            $message['status']='success';
            $message['email']=$row['email'];
            echo json_encode($message);
       
       }
		
        else if($request->requestType=='register')
        { 
            $message['status']='fail';
            $message['email']="null";
            echo  json_encode($message);
        }
    
    }
else
{
    if($request->requestType=='register')
    {
        $message['status']='success';
        $message['email']=$request->email;
        echo json_encode($message);
    }
    else if($request->requestType!='register')
    { 
        $message['status']='fail';
        $message['email']="null";
        echo json_encode($message);
    }
}