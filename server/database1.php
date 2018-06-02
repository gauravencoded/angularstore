<?php
$mysqli = new mysqli("mysql.hostinger.in", "u582174651_singh", "colgconkt", "u582174651_store");
if ($mysqli->connect_errno) 
	{
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	