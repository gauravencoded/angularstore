<?php
include 'database.php';
$res2 = $mysqli->query("delete from activation" );
$res1=$mysqli->query("delete from customers");
$res=$mysqli->query("delete from authenticate");
?>