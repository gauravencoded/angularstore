<?php
include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
	$res = $mysqli->query("SELECT productId,discount,price, name FROM products  where productCategory='$request->giftName'");
	if($res->num_rows - 1>0)
	{
		for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}
			echo json_encode($arr);
	}
	else
	{
		$err['status']='Fail';
		$err['message']='OOPS!! this store seems to be out of stock at this moment, visit back after some time till we give it his life and purpose back to serve you';
		echo json_encode($err);
	}

?>