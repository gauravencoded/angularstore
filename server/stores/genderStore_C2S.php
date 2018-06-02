<?php
include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);

	$res = $mysqli->query("SELECT * FROM products WHERE gender='$request->gender' and productCategory='$request->productCategory'");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}
echo json_encode($arr);

?>