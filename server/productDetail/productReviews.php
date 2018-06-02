<?php

include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);


	$arr=array();

	$res = $mysqli->query("SELECT * FROM productreviews where productId=$request->productId");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	{
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$arr[$row_no]=$row;
	}
$result=json_encode($arr); 
if($res->num_rows>0)
{
echo $result;    
}





?>