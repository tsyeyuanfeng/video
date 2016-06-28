<?php
// error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE); 


/**
* ���ip����Ч�ģ�����ĳ��򲻻�ִ��
* �ļ�һ��ֻ����һ�Σ���summary_2015
*/
class FileTransfer{
	public $ip;//ip��ַ
	public $fp;//�ļ�ָ�룬��д�ļ�
	function __construct($ip = null){
		$targetIPList = array();    
		// parse ip
		exec('arp', $onlineTerminals);
		if(count($onlineTerminals) > 0) {

			foreach($onlineTerminals as $terminal) {
				if(preg_match("/192\.168\.[0-9]{1,3}\.[0-9]{1,3}/", $terminal, $match)) {
					if($match && count($match) > 0) {
						array_push($targetIPList, $match[0]);
					}
				}			    		
			}
		}

		if(count($targetIPList) <= 0) {
			echo "There is no terminal online";
			exit;
		}
		//get valid ip 
		$ip = '';
		$opts = array(
		'http'=>array(
		'method'=>"GET",
		'timeout'=>1,
		)
		);
		$context = stream_context_create($opts);
		foreach($targetIPList as $item) {
			$url = 'http://'.$item.':8080'; 
			$result = file_get_contents($url,false,$context);
			if(!$result){
				continue;
			}else{
				$ip = $item;
				break;
			}
		}
		if($ip == ''){
			echo 'can not get content from ips above';
			exit;
		}else{
			$this->ip = $ip;
		}
	}
	function transfer(){
		//$urlRoot = 'http://' . $this->ip . ':8080/sharingfile'; 
		$urlRoot = 'http://192.168.199.192:8080/sharingfile/';
		$result = file_get_contents($urlRoot);
		
		//var_dump($result);
		//��ȡĿ¼
		$videos = array();
		if(preg_match_all('/<a .*?href="(.*?)".*?>/', $result, $match)) {
			$hrefs = $match[1];
			//�ļ���
			$files = array();
			foreach($hrefs as $href) {
				$href = substr($href, 0, -1);
				if(is_numeric($href)){
					array_push($files, $href);
				}
			}
			
			foreach($files as $item){
				//xml�ļ�·��
				$urlXml = $urlRoot . "$item/info/desc/Publications.xml";
				$xml = file_get_contents($urlXml);
				if(!$xml) continue;
				$xml = simplexml_load_string($xml);
				$id = $item;
				$FileID = $xml->PublicationVA->MFile->FileID;
				//$videoUrl = $urlRoot . "/$item/content/".$FileID . "_S.mp4";
				$videoUrl = $urlRoot . "/$item/content/";
				$result = file_get_contents($videoUrl);
				preg_match_all('/<a .*?href="(.*?)".*?>/', $result, $match);
				if(!empty($match[1][1])) {
					$videoUrl =$videoUrl.$match[1][1];
					$pic = $xml->PublicationVA->Posters->Poster->PosterName;
					$pubNameAttrs = $xml->PublicationNames->PublicationName->attributes();
					$attrs = array();
					foreach($pubNameAttrs as $k => $v) {
				   		$attrs[$k] = strval($v);
					}
					$title = $attrs['value'];
					$urlPic = $urlRoot . "/$item/info/poster/$pic";
					$Duration = $xml->PublicationVA->MFile->Duration;
					
					$duration = $Duration*1;
					if(empty($Duration))
					{
						$Duration = -1;
					}
					//if( $this->file_download($urlPic, $id,  $pic)
					//&&  $this->file_download($urlXml, $id, 'Publications.xml')
					//){
						//$this->file_write($id, $FileID, $video, $pic, $title);
					//}
					$video['duration'] = $duration;
					$video['url'] = $videoUrl;
					$video['thumb'] = $urlPic;
					$video['title'] = $title;			
					
					$video = json_encode($video);
					$this->file_write($video); 			
					unset($video); 
				}
			}
		}
		
	}
		
	/**
	* src��    	Դ�ļ���ַ
	* des��   		������ַ
	*/

	function file_download($src, $path, $filename){
		if(!file_exists("file/$path")){
			mkdir("file/$path");
		}
		if(file_exists("file/$path/$filename")){
			return true;
		}
		$fp_output = fopen("file/$path/$filename", 'w');
		$ch = curl_init($src);
		curl_setopt($ch, CURLOPT_FILE, $fp_output);
		curl_exec($ch);
		curl_close($ch);
		fclose($fp_output);
		return true;
	}

	/**
	* id: 	  		��Ʒid
	* PreviewID:	����    
	* video��		Զ����Ƶ·�� ��Ҫʵʱ����ip
	* pic��    	����ͼƬ��ַ
	* xml��   		����xml�ļ���ַ
	*/
	function file_write($content){

		$fp = fopen('summary_' . date('Ymd', time()) . '.txt', 'a');

		fwrite($fp, "$content\n");
		fclose($fp);
	}
	

	/**
	* begin��    	��ʼλ��
	* length:		��ȡ�ļ�����
	*/
	function file_read($begin, $length = 10){
	//�ж��ļ��Ƿ���ڣ������������ɽ�Ŀ�б�
		if(!file_exists('summary_' . date('Ymd', time()) . '.txt')){
			$this->transfer();
		}
		$fp =  fopen('summary_' . date('Ymd', time()) . '.txt', 'r');
		$items = array(
			'status'=>200,
			'message'=>'success',
		);
		$data = array(
		);
		$meta = array(
			'page'=>$begin,
		);
		$i = 0;
		while (!feof($fp) && $i < ($begin-1)*$length+$length) {
			if ($i >= ($begin-1)*$length) {
				$item = trim(fgets($fp));
				$item = json_decode($item);
				if($item) array_push($data , $item);
			}else{
				fgets($fp);
			}
			$i++;
		}
		fclose($fp);
		$items['data']['videoList'] = $data;
		$items['data']['meta'] = $meta;
		$items= json_encode($items);
		echo $items;
	}

	function __destruct(){
		if($this->fp){
			fclose($this->fp);
		}
	}
}


//$id = $_GET['id'];



?>
