<?php
    class login extends main {
        private $json          = null;    
        private $sql_login     = "select * from tv_usuarios where usr_login=':user' and usr_pass=':pass' and usr_status='ACTIVO';";
        private $sql_userdata  = "select usr_id id,usr_nombre nombre from tv_usuarios where usr_id=':id' and usr_status='ACTIVO';"; 
        private $sql_password  = "update tv_usuarios set usr_pass=':pass' where usr_id=:id;";
        
        public function __construct(){
            $this->init();
        }
        public function execute(){
            $this->json = json_decode(file_get_contents('php://input'));
            $method = $this->sanitizeString($this->json->m);
            if(method_exists($this,$method)){
                $this->$method();
            }
        }
        private function login(){
            $user = $this->sanitizeString($this->json->user);
            $pass = $this->sanitizeString($this->json->pass);
            $sql  = str_replace(array(':user',':pass'),array($user,$pass),$this->sql_login);
            $query= $this->pdo->prepare($sql);
            $query->execute();
            $user = $query->fetch(PDO::FETCH_OBJ);
            if($user->usr_id){
                
				$_SESSION["app_status"] = true;
				$_SESSION["app_user"]   = $user->usr_id;
				$_SESSION["app_time"]	= time();
                $return = 'true';
            } else {
				unset($_SESSION["app_status"]);
				unset($_SESSION["app_user"]);
				unset($_SESSION["app_time"]);
            }
       
            error_log('APP STATUS'.$_SESSION["app_status"]);
            error_log('APP USER'.$_SESSION["app_user"]);
            error_log('APP TIME'.$_SESSION["app_time"]);
            
            header('content-type: text/plain');
            echo $return;
        }
        private function userdata(){
            if($this->checkStatus()){
                $id     = $_SESSION['app_user'];
                $sql    = str_replace(':id',$id,$this->sql_userdata);
                $query  = $this->pdo->query($sql);
                $json   = $query->fetch(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }
        private function logout(){
            $return = 'true';
            unset($_SESSION['app_status']);
            unset($_SESSION['app_active']);
            unset($_SESSION['app_time']);
            session_destroy();
            header('content-type: text/plain');
            echo $return;
        }
        private function password(){
            $return = 'false';
            $id=$this->sanitizeInt($this->json->id);
            $pass=$this->sanitizeString($this->json->pass);
            $sql=str_replace(array(':id',':pass'),array($id,$pass),$this->sql_password);
            $query = $this->pdo->prepare($sql);
            if($query->execute()) $return='true';
            header('content-type: text/plain');
            echo $return;
        }
        
    }