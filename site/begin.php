<?php
	ini_set('session.gc_maxlifetime', '28800');
	session_start();

	$link = mysql_connect("localhost", "20102bd1", "T8WASy4BcXbYLUav")
		or die("Could not connect<br>\n");

	mysql_select_db("20102bd1") or die("Could not select database<br>\n");
?>
