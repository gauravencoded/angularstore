<?php
include 'database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);

$res2 = $mysqli->query("select size from sizeinventory where productId=$request->productId and quantityAvailable>0" );
for ($row_no = $res2->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res2->data_seek($row_no);
				$row = $res2->fetch_assoc();
				$arra[$row_no]=$row;
			}
echo json_encode($arra);