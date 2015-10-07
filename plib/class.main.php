<?php
	class main
	{
        protected $path = null;
        protected $url  = null;
        protected $pdo  = null;
        
        public function init(){
            global $basePath,$baseUrl,$baseDB,$baseUS,$basePW;
            $this->path = $basePath;
            $this->url  = $baseUrl;
            $this->pdo  = new PDO($baseDB,$baseUS,$basePW);
        }
        protected function status(){
            $return = 'false';
            if($_SESSION['app_status']) $return = 'true';
            header('content-type: text/plain');
            echo $return;
        }
        protected function checkStatus(){
            $return = false;
            if(isset($_SESSION['app_status']) && $_SESSION['app_status']>=1) $return = true;
            return $return;
        }
    	protected function sanitizeGetInt($key=null){
			$_GET[$key] = filter_var($_GET[$key],FILTER_SANITIZE_NUMBER_INT);
			if(!filter_var($_GET[$key],FILTER_VALIDATE_INT)){
				$_GET[$key] = 0;
			}
			return $_GET[$key];
		}

        protected function sanitizeGetString($key=null){
			$_POST[$key] = filter_var($_GET[$key],FILTER_SANITIZE_STRING);
			error_log($_POST[$key]);
			if(!filter_var($_GET[$key],FILTER_VALIDATE_REGEXP,array('options'=>array('regexp'=>'/^[0-9a-zA-Z\.\-\_]+$/')))){
				$_GET[$key] = null;
			}
			return $_POST[$key];
		}

		protected function sanitizePostInt($key=null){
			$_POST[$key] = filter_var($_POST[$key],FILTER_SANITIZE_NUMBER_INT);
			if(!filter_var($_POST[$key],FILTER_VALIDATE_INT)){
				$_POST[$key] = 0;
			}
			return $_POST[$key];
		}

		protected function sanitizePostString($key=null){
			$_POST[$key] = filter_var($_POST[$key],FILTER_SANITIZE_STRING);
			if(!filter_var($_POST[$key],FILTER_VALIDATE_REGEXP,array('options'=>array('regexp'=>'/^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\ \s\,\.\*\-\_\:]+$/')))){
				$_POST[$key] = null;
			}
			return $_POST[$key];
		}
        
        protected function sanitizeInt($int=null){
			$int = filter_var($int,FILTER_SANITIZE_NUMBER_INT);
			if(!filter_var($int,FILTER_VALIDATE_INT)){
				$int = 0;
			}
			return $int;
		}

		protected function sanitizeString($string=null){
			$string = filter_var($string,FILTER_SANITIZE_STRING);
			if(!filter_var($string,FILTER_VALIDATE_REGEXP,array('options'=>array('regexp'=>'/^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\#\ \s\,\.\*\-\_\:]+$/')))){
				$string = null;
			}
			return $string;
		}

		protected function sanitizePostTime($key=null){
			$_POST[$key] = filter_var($_POST[$key],FILTER_SANITIZE_STRING);
			if(!filter_var($_POST[$key],FILTER_VALIDATE_REGEXP,array('options'=>array('regexp'=>'/^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$//')))){
				$_POST[$key] = null;
			}
			return $_POST[$key];
		}

		protected function notFound404(){
			header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found",true,404);
            header("Status: 404 Not Found",true,404);
            header('NetworkError: 404 Not Found',true,404);
            header('X-PHP-Response-Code: 404', true, 404);
            exit();
		}

		protected function hex2rgb($hex) {
		   $hex = str_replace("#", "", $hex);

		   if(strlen($hex) == 3) {
		      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
		      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
		      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
		   } else {
		      $r = hexdec(substr($hex,0,2));
		      $g = hexdec(substr($hex,2,2));
		      $b = hexdec(substr($hex,4,2));
		   }
		   $rgb = array($r, $g, $b);

		   return $rgb;
		}
    }
        
        /*
		public $sqlTvMsgSelect 		= "select * from tv_msg order by tv_id asc;";
		public $sqlTvMsgInsert 		= "insert into tv_msg values (NULL,':tv_msg',':tv_front_color',':tv_back_color',':tv_back_image',':tv_font_family',':tv_font_size',':tv_play_direction',':tv_play_time')";
		public $sqlTvMsgDelete 		= "delete from tv_msg where tv_id=:tv_id limit 1;";
		public $sqlTvMsgUpdate 		= "update tv_msg set tv_msg=':tv_msg',tv_front_color=':tv_front_color',tv_back_color=':tv_back_color',tv_back_image=':tv_back_image',tv_font_family=':tv_font_family',tv_font_size=':tv_font_size',tv_play_direction=':tv_play_direction',tv_play_time=':tv_play_time' where tv_id=:tv_id limit 1;";
		public $sqlTvMsgSelectOne 	= "select * from tv_msg where tv_id=:tv_id;";
		public $sqlAuthenticateUser = "select * from tv_usuarios where usr_login=':user' and usr_pass=':pass' and usr_status='ACTIVO'";
        public $sqlUsuariosGrid     = "select SQL_CALC_FOUND_ROWS * from tv_usuarios limit :pos,:lim;";
        public $sqlUsuariosInsert   = "insert into tv_usuarios values (null,':usr_nombre',':usr_login',':usr_pass',':usr_status');";
        public $sqlUsuariosSelectOne= "select * from tv_usuarios where usr_id=:usr_id;";
        public $sqlUsuariosUpdate 	= "update tv_usuarios set usr_nombre=':usr_nombre',usr_login=':usr_login',usr_pass=':usr_pass',usr_status=':usr_estado' where usr_id=:usr_id;";
        public $sqlUsuariosDelete 	= "delete from tv_usuarios where usr_id=:usr_id limit 1;";

		final public function initClass($config = array()) {
			if(count($config)){
				if(strlen($config['baseUrl']))  $this->baseUrl  = $config['baseUrl'];
				if(strlen($config['basePath'])) $this->basePath = $config['basePath'];
				if(strlen($config['appTitle'])) $this->appTitle = $config['appTitle'];
				if(strlen($config['appDescription'])) $this->appDescription = $config['appDescription'];
				if(strlen($config['appLifeTime'])) $this->appLifeTime = $config['appLifeTime'];
				
				if(strlen($config['dbT'])) $this->dbT = $config['dbT'];
				if(strlen($config['dbH'])) $this->dbH = $config['dbH'];
				if(strlen($config['dbN'])) $this->dbN = $config['dbN'];
				if(strlen($config['dbU'])) $this->dbU = $config['dbU'];
				if(strlen($config['dbP'])) $this->dbP = $config['dbP'];

                $this->dbPDO = new PDO($this->dbT.':host='.$this->dbH.';dbname='.$this->dbN,$this->dbU,$this->dbP);

				require_once $this->basePath.'/lib/class.html.php';
				require_once $this->basePath.'/lib/class.input.filter.php';

				$this->classHtml   = new html();
				$this->classFilter = new InputFilter();

				$this->classHtml->title   = $this->appTitle;
				$this->classHtml->charset = 'UTF-8';
				$this->classHtml->lang    = 'es';

				$this->classHtml->setCss($this->baseUrl.'/css/bootstrap.min.css');
				$this->classHtml->setCss($this->baseUrl.'/css/bootstrap-theme.min.css');
				$this->classHtml->setCss($this->baseUrl.'/css/pick-a-color.min.css');
				$this->classHtml->setCss($this->baseUrl.'/css/jquery.timepicker.css');
				$this->classHtml->setCss($this->baseUrl.'/css/tv.css');
				
				$this->classHtml->setJs($this->baseUrl.'/js/jquery.min.js');
				$this->classHtml->setJs($this->baseUrl.'/js/bootstrap.min.js');
				$this->classHtml->setJs($this->baseUrl.'/js/pick-a-color.min.js');
				$this->classHtml->setJs($this->baseUrl.'/js/tinycolor.min.js');
				$this->classHtml->setJs($this->baseUrl.'/js/jquery.timepicker.min.js');
				$this->classHtml->setJs($this->baseUrl.'/js/jquery.fullscreen.js');
				$this->classHtml->setJs($this->baseUrl.'/js/md5.js');
				$this->classHtml->setJs($this->baseUrl.'/js/tv.js');

				$Fonts = scandir($this->basePath.'/font/');
				unset($Fonts[0]);
				unset($Fonts[1]);
				foreach($Fonts as $tmp_font){
					$font = explode('.',$tmp_font);
					$this->fontFace .= '@font-face{';
					$this->fontFace .= ' font-family:"'.$font[0].'";';
					$this->fontFace .= ' src:url("'.$this->baseUrl.'/font/'.$tmp_font.'");';
					$this->fontFace .= ' } ';
				}

				$this->classHtml->setStyle($this->fontFace);
			}
		}

		final public function urlGetParam($id = null){
			return $this->classFilter->process($_GET[$id]);
		}

		final public function urlPostParam($id = null){
			return $this->classFilter->process($_POST[$id]);
		}

		final public function urlPathParam($id = null){
			$prm = explode('/',$_SERVER['PATH_INFO']);
			return $this->classFilter->process($prm[$id]);
		}

		final public function sectionTitle($section=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($section)){
				$html = $this->classHtml->h1(
					$section,
					'sectionTitle',
					'class:"jumbotron text-capitalize"'
				);
			}

			// Salida.
			return $html;

		}
		final public function msgError($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgError',
					'class:"bg-danger text-danger"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgMuted($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgMuted',
					'class:"bg-muted text-muted"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgPrimary($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgPrimary',
					'class:"bg-primary text-primary"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgSuccess($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgSuccess',
					'class:"bg-success text-success"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgInfo($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgInfo',
					'class:"bg-info text-info"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgWarning($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgWarning',
					'class:"bg-warning text-warning"'
				);
			}

			// Salida.
			return $html;
		}
		final public function msgDanger($msg=null){

			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($msg)){
				$html .= $this->classHtml->div(
					$msg,
					'msgDanger',
					'class:"bg-danger text-danger"'
				);
			}

			// Salida.
			return $html;
		}
		final public function getHtmlDoc($content=null){
		
			// Definicion.
			$html = null;

			// Proceso.
			if(strlen($content)){
				$this->classHtml->tag(
					'div',
					$content,
					'tvDivMain',
					'class:"container";'
				);	
			}
			$html = $this->classHtml->getHtmlDoc();

			// Salida.
			return $html;
		}
		final public function getLastTime(){
			if(isset($_SESSION["app_last_time"])): return $_SESSION["app_last_time"];
			else: return time();
			endif;
		}
        */