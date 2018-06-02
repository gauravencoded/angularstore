<?php

 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
include '../database.php';
$res=$mysqli->query("select distinct storeType from stores order by priority");
for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row['storeType'];
			}
$store['types']=$arr;


foreach($arr as $a)
{ 
    $res=$mysqli->query("select storeName,key1,key2 from stores where storeType='$a'");
    for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$stores[$a][$row_no]=$row;
			}

}

$store['names']=$stores;
echo json_encode($store);