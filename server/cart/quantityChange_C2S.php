<?php
include '../database.php'; 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
 $token_pattern="/^[a-zA-Z0-9]*$/";
if(isset($request->email) and isset($request->token) )//and isset($request->'password']) and isset($request->'sessionKey']))
{	
  preg_match($token_pattern,$request->token,$matched_token);
  if(filter_var($request->email, FILTER_VALIDATE_EMAIL) and $matched_token[0]==$request->token) 
  {
      $email=$request->email;
      $token=$request->token;
      $res=$mysqli->query("SELECT EMAIL,TOKEN FROM AUTHENTICATE WHERE EMAIL='$email' and token='$matched_token[0]'");
      if($res->num_rows>0)
      {
        $res = $mysqli->query("select quantity from cart where productId='$request->productId'and email='$request->email' and size='$request->size'");
        $row_no = $res->num_rows - 1;
        $res->data_seek($row_no);
	    $row = $res->fetch_assoc();
	    $quantity=$row['quantity'];
        if($quantity==1 and $request->action=='decrease')
        {    
            //delete the item if cart has only single item and action is decrease
            $res = $mysqli->query("DELETE FROM cart WHERE email='$request->email'  and size='$request->size' and productId='$request->productId'");
        }
        else if($quantity>1 and $request->action=='decrease')
        {   
            //decrease the count of item if there is more than one item and action is decrease
            $row_no = $res->num_rows - 1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
		    $f_quantity=$row['quantity']-1;
		    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$request->productId' and size='$request->size' and email='$request->email'");
        }
        else if($quantity>=1 and $request->action=='increase')
        {
    		//increase the count of item if there are one or more than one count of item and action is increase
            $row_no = $res->num_rows - 1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
		    $f_quantity=$row['quantity']+1;
		    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$request->productId'  and size='$request->size' and email='$request->email'");
        }
        //fetch cart items
          $res = $mysqli->query("SELECT c.productId,c.size,c.quantity, p.price, p.discount,p.name, p.productCategory FROM cart c, products p  where c.email='$request->email' and c.productId=p.productId");
	       if($res->num_rows>0)
		   {
               for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			   {
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
               }
               echo json_encode($arr);
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
?>