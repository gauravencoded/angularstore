<?php
include 'database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$res =$mysqli->query("select m.matchPId, p.productCategory from matching m, products p where m.matchPId=p.productId and m.productId=$request->productId");
if($res->num_rows>0)
{    
for ($row_no=$res->num_rows-1;$row_no>=0;$row_no--)
{
    $res->data_seek($row_no);
    $row=$res->fetch_assoc();
    $arrs[$row_no]=$row;
}

echo json_encode($arrs);
}
else
{
    echo 0;
}