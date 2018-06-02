<?php
include '../database.php';

 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";

if(isset($request->email) and isset($request->token))//and isset($request->'password']) and isset($request->'sessionKey']))
{
	  preg_match($token_pattern,$request->token,$matched_token);
    if(filter_var($request->email, FILTER_VALIDATE_EMAIL) and $matched_token[0]==$request->token) 
    {
        $email=$request->email;
        $token=$request->token;
        $res=$mysqli->query("SELECT EMAIL,TOKEN FROM AUTHENTICATE WHERE EMAIL='$email' and token='$matched_token[0]'");
        if($res->num_rows>0)
        {
	       $res = $mysqli->query("select * from wishlist where productId='$request->productId' and email='$request->email'");
            if( $res->num_rows> 0)
	       {
		      echo "Item is already in your wishlist";
	       }
	       else  //insert item in the wishlist of the user
	       {
		      $res = $mysqli->query("INSERT INTO wishlist values('$request->productId','$request->email')");
	       }
	       //return count of items in the wishlist of the user	
	       $res = $mysqli->query("SELECT count(productId) as numberOfItems FROM wishlist where email='$request->email'");
	       for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	       {
		      $res->data_seek($row_no);
		      $row = $res->fetch_assoc();
		      $arr[$row_no]=$row;
	       }
           echo json_encode($arr);
        }
        else
        {
            $message['status']='fail';
            $message['message']="You are not logged in1";
            echo json_encode($message);
        }
    }
    else
    {
        $message['status']='fail';
        $message['message']="You are not logged in1";
        echo json_encode($message);
    }
}
else
{
     $message['status']='fail';
        $message['message']="You are not logged in2";
        echo json_encode($message);
}
?>