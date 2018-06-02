<?php
include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$querystringPattern="/^[a-zA-Z0-9]{16}/";
if(isset($request->querystring))
{
     preg_match($querystringPattern,$request->querystring,$matchedstring);
       if($request->querystring==$matchedstring[0])
        {
            
    $res = $mysqli->query("select email from activation where status='Unused' and email='$request->email' and querystring='$request->querystring'"); 

    if($res->num_rows>0)
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
        $message['messgage']="one";
        echo json_encode($message);
    }        
    }
    else
    {
        $message['status']='fail';
        $message['messgage']="two";
        echo json_encode($message);
    }
    
}