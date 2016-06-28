
<?php
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-header: GET');
	require_once("./Base.php");
	$page = $_GET['page'];                                                                             
	$size = $_GET['size'];                                                                          
	$file = new FileTransfer();                                                                     
	$file->file_read($page,$size);
?>
