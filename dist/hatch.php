
<?
	if(!file_exists('summary_' . date('Ymd', time()) . '.txt')) {
		require_once("./Base.php");

		$file = new FileTransfer();
		$file->transfer();
	}else {
		unlink('summary_' . date('Ymd', time()) . '.txt');
		require_once("./Base.php");
		
		$file = new FileTransfer();
		$file->transfer();
	}
	$time = date('YmdGis',time());
	$fp = fopen('./hatch.log','w');
	file_put_contents("./hatch.log","hatch run at $time\n",FILE_APPEND);
	fclose($fp);
?>
