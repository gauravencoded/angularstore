<?php
include '../database.php';
 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 
            $orders=array();
            $activeOrders=array();
            $cancelledOrders=array();
            $deliveredOrders=array();
            $allOrders=array();
            $res=$mysqli->query("select orderId,status from orders where email='$request->email'");
            for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
            {
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
            }

            //PUSH ORDERIDS INTO RESPECTIVE ORDER TYPE
            foreach($arr as $a)
            {
                /*if($a['status']=="Cancelled")
                {
                    array_push($cancelledOrders,$a['orderId']);
                }*/
                 if($a['status']=='Active')
                {
                    array_push($activeOrders,$a['orderId']);
                }
                else if($a['status']=='Delivered')
                {
                    array_push($deliveredOrders,$a['orderId']);
                }
            }
            unset($arr);
            $arr=array();
            //FETCH ALL THE ITEMS FOR ACTIVE ORDER IDS
            foreach($activeOrders as $a)
            {
                $res=$mysqli->query("select o.orderId,o.quantity,o.productId,o.discountValue,p.name,o.size, p.price from orderItems o, products p where orderId='$a' and o.productId=p.productId");
                for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
                {
				    $res->data_seek($row_no);
				    $row = $res->fetch_assoc();
				    $arr[$row_no]=$row;
                }
                $active[$a]=$arr;
            }
            $orders['active']=$active;
            array_push($allOrders,$orders);
            unset($orders);
            //FETCH ALL ITEMS FROM CANCELLED ITEMS
            $orders=array();
            $arra=array();
            foreach($cancelledOrders as $b)
            {
                $res=$mysqli->query("select o.orderId,o.size,o.productId,o.quantity,o.discountValue,p.price from orderItems o, products p where orderId='$b' and o.productId=p.productId");
                for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
                {
				    $res->data_seek($row_no);
				    $row = $res->fetch_assoc() ;
				    $arra[$row_no]=$row;
                }
                $cancelled[$b]=$arra;
            }
            if($cancelledOrders!=null)
            {
                $orders['cancelled']= $cancelled;   
            }
            array_push($allOrders,$orders);
            unset($orders);
            //FETCH ALL ITEMS FROM delivered ITEMS
            $orders=array();
            $arra=array();
           foreach($deliveredOrders as $d)
            {
                $res=$mysqli->query("select o.orderId,o.productId,o.size,o.quantity,o.discountValue,p.price from orderItems o, products p where orderId='$d' and o.productId=p.productId");
                for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
                {
				    $res->data_seek($row_no);
				    $row = $res->fetch_assoc() ;
				    $arra[$row_no]=$row;
                }
                $delivered[$d]=$arra;
            }
            if($deliveredOrders!=null)
            {
                $orders['delivered']= $delivered;   
            }
            array_push($allOrders,$orders);
            echo json_encode($allOrders);
        
?>