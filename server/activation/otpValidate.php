<?php
include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
$otpPattern="/^[0-9]{6}/";
$querystringPattern="/^[a-zA-Z0-9]{16}/";
// check if otp and querystrin is set and as per the format

$insert=true;
if(isset($request->otp) and isset($request->querystring))
{
    preg_match($otpPattern,$request->otp,$matchedotp);
    preg_match($querystringPattern,$request->querystring,$matchedstring);
       if($request->querystring!=$matchedstring[0])
        {
            $insert=false;
        }
       if($request->otp!=$matchedotp[0])
        {
            $insert=false;
     
        }
      if(!filter_var($request->email,FILTER_VALIDATE_EMAIL))
        {
            $insert=false;
        }
    if($insert)
    {
        //var_dump($request->email);
        $res = $mysqli->query("select * from activation  where email='$request->email' and otp=$request->otp and querystring='$request->querystring' and status='Unused'");
    if($res->num_rows==1)
    {
        for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
        {
            $res->data_seek($row_no);
			$row = $res->fetch_assoc();
			$arra[$row_no]=$row;
        }
         $email=$arra[0]['email'];
         $token=generateRandomString($length = 16); 
         $date=getdate();
         $initDate=$date['mday']."-".$date['mon']."-".$date['year'];
        
        $res=$mysqli->query("insert into authenticate values('$email','$token','$initDate')");    
        
        $message['email']=$arra[0]['email'];
        $message['token']=$token;
        $message['status']='success';
            
        
        echo json_encode($message);
         $res = $mysqli->query("delete from activation  where email='$request->email' and otp=$request->otp and querystring='$request->querystring' and status='Unused'");
         $res = $mysqli->query("update customers set status='Active' where email='$request->email' and status='New'");
        
    }
    else
    {
        $message['status']='fail';
        $message['messgage']="";
        echo json_encode($message);
    }
}
    else
    {
        $message['status']='fail';
        $message['messgage']="";
        echo json_encode($message);
    }

}
    
    


function generateRandomString($length = 16)  //function to generate random string token for authentication
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) 
    {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>
