<?php
   include '../database.php';
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
if(isset($request->email)  and isset($request->token))//and isset($request->'password']) and isset($request->'sessionKey']))
{	 
 
    
    //if update type is size
    //then run update size query
    if($request->updateType=='quantity')
    { 
        $res = $mysqli->query("UPDATE cart set quantity=$request->quantity where productId='$request->productId' and email='$request->email'");
    }
    else if($request->updateType=='size')
    {
        $res = $mysqli->query("UPDATE cart set size=$request->size where productId=$request->productId and email='$request->email'");
    }
    
?>