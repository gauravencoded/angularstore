<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";
if(isset($request->email)  and isset($request->token))
{	
    include '../database.php';
	$res = $mysqli->query("DELETE FROM cart WHERE email='$request->email' and size='$request->size' and productId='$request->productId'");
	
	$res = $mysqli->query("SELECT c.productId,c.size,c.quantity, p.price, p.discount,p.name, p.productCategory FROM cart c, products p  where c.email='$request->email' and c.productId=p.productId");
	if($res->num_rows>0)
    {
        for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	    {
		  $res->data_seek($row_no);
		  $row = $res->fetch_assoc();
		  $arr[$row_no]=$row;
	    }
        if($res->num_rows>0)
        {
            echo json_encode($arr);
        }
        
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
?>