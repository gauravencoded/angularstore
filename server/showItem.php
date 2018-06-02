<?php
include 'database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$res1 = $mysqli->query("SELECT productId, gender,productCategory,name,price,discount,description,designer FROM products where productId=$request->productId");
	for ($row_no = $res1->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res1->data_seek($row_no);
				$row = $res1->fetch_assoc();
				$arr[$row_no]=$row;
			}
$res2 = $mysqli->query("select size from sizeinventory where productId=$request->productId" );
for ($row_no = $res2->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res2->data_seek($row_no);
				$row = $res2->fetch_assoc();
				$arra[$row_no]=$row;
			}
if($request->productCategory=='T-Shirts')
{
    $res3 = $mysqli->query("select * from tshirts where productId=$request->productId" );
    for ($row_no = $res3->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res3->data_seek($row_no);
				$row = $res3->fetch_assoc();
				$array[$row_no]=$row;
			}
}

if($request->productCategory=='Posters')
{
    $res3 = $mysqli->query("select * from posters where productId=$request->productId" );
    for ($row_no = $res3->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res3->data_seek($row_no);
				$row = $res3->fetch_assoc();
				$array[$row_no]=$row;
			}
}

if($request->productCategory=='Shoes')
{
    $res3 = $mysqli->query("select * from shoes where productId=$request->productId" );
    for ($row_no = $res3->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res3->data_seek($row_no);
				$row = $res3->fetch_assoc();
				$array[$row_no]=$row;
			}
}

if($request->productCategory=='Accessories')
{
    $res3 = $mysqli->query("select * from Accessories where productId=$request->productId" );
    for ($row_no = $res3->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res3->data_seek($row_no);
				$row = $res3->fetch_assoc();
				$array[$row_no]=$row;
			}
}


$result['desc']=$array;
$result['size']=$arra;
$result['detail']=$arr;

echo json_encode($result);

//productId, productCategory,name,price,discount,description,designer
?>