<?php
include '../database.php';
	 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";
if(isset($request->email)  and isset($request->token))//and isset($request->'password']) and isset($request->'sessionKey']))
{	
	$res = $mysqli->query("DELETE FROM cart WHERE email='$request->email' and productId='$request->productId'");
}
else
{
echo "please log in";
}	


?>