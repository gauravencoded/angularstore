<?php
include '../database.php';

	$res = $mysqli->query("SELECT * FROM products where gender='M' limit 6");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}

echo json_encode($arr);

?>