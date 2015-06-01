<?php
	class upload extends main {

		public function __construct(){
			$this->init();
		} 
		
		public function uploadAudioFile(){
			if($_SESSION['app_status']){
				$return = 'false';
				$count  = 0;
				for($i=0;$i<count($_FILES['audioFiles']['name']);$i++){
					$tmp  = $_FILES['audioFiles']['tmp_name'][$i];
					$name = $this->path.'/aud/'.$_FILES['audioFiles']['name'][$i];
					if(move_uploaded_file($tmp,$name)) $count++;
				}
				if($count) $return = 'true';
				header('content-type: text/plain');
				echo $return;
			}
		}

		public function uploadImageFile(){
			if($_SESSION['app_status']){
				$return = 'false';
				$count  = 0;
				for($i=0;$i<count($_FILES['imageFiles']['name']);$i++){
					$tmp  = $_FILES['imageFiles']['tmp_name'][$i];
					$name = $this->path.'/bak/'.$_FILES['imageFiles']['name'][$i];
					if(move_uploaded_file($tmp,$name)) $count++;
				}
				if($count) $return = 'true';
				header('content-type: text/plain');
				echo $return;
			}
		}

		public function uploadFontFile(){
			if($_SESSION['app_status']){
				$return = 'false';
				$count  = 0;
				for($i=0;$i<count($_FILES['fontFiles']['name']);$i++){
					$tmp  = $_FILES['fontFiles']['tmp_name'][$i];
					$name = $this->path.'/font/'.$_FILES['fontFiles']['name'][$i];
					if(move_uploaded_file($tmp,$name)) $count++;
				}
				if($count) $return = 'true';
				header('content-type: text/plain');
				echo $return;
			}
		}

	}