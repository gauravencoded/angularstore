<?php

include '../database.php';

 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$arr=array();

if(isset($request->email))
{
  $now=getdate();
$date=$now['year']."-".$now['mon']."-".$now['mday'];
    $res = $mysqli->query("insert into productreviews values($request->productId,'$date','$request->username','$request->comment')");
    $res=$mysqli->query("SELECT * FROM PRODUCTREVIEWS WHERE productId=$request->productId");

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
}
	else{echo "suck";}





?>