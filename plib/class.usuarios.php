<?php
    class usuarios extends main {
        private $json = null;
        private $sql_usuarios = "select usr_id id, usr_nombre nombre, usr_login login,usr_status estado from tv_usuarios order by usr_id desc;";
        private $sql_insert   = "insert into tv_usuarios (usr_id,usr_nombre,usr_login,usr_pass,usr_status) values (NULL,':usr_nombre',':usr_login',':usr_pass',':usr_status');";
        private $sql_select   = "select usr_id id, usr_nombre nombre, usr_login login, usr_pass pass, usr_status status from tv_usuarios where usr_id=:id;";
        private $sql_update1  = "update tv_usuarios set usr_nombre=':usr_nombre',usr_login=':usr_login',usr_pass=':usr_pass',usr_status=':usr_status' where usr_id=:usr_id;";
        private $sql_update2  = "update tv_usuarios set usr_nombre=':usr_nombre',usr_login=':usr_login',usr_status=':usr_status' where usr_id=:usr_id;";
        private $sql_delete   = "delete from tv_usuarios where usr_id=:usr_id;";
        private $sql_status   = "update tv_usuarios set usr_status=':usr_status' where usr_id=:usr_id;";
        
        public function __construct(){
            $this->init();
        }
        public function execute(){
            $this->json = json_decode(file_get_contents('php://input'));
            $method = $this->sanitizeString($this->json->m);
            if(method_exists($this,$method) && $_SESSION['app_status']===true){
                $this->$method();
            }
        }
        private function usuarios(){
            $sql   = $this->sql_usuarios;
            $query = $this->pdo->query($sql);
            $json  = $query->fetchAll(PDO::FETCH_OBJ);
            header('content-type: application/json');
            echo json_encode($json);
        }
        private function insert(){
            $return = 'false';
            $keys   = array(':usr_nombre',':usr_login',':usr_pass',':usr_status');
            $values = array(
                'usr_nombre' => $this->sanitizeString($this->json->nombre),
                'usr_login'  => $this->sanitizeString($this->json->login),
                'usr_pass'   => $this->sanitizeString($this->json->pass),
                'usr_status' => $this->sanitizeString($this->json->status)
            );
            $sql = str_replace($keys,$values,$this->sql_insert);
            if($this->pdo->exec($sql)){
                $return = 'true';
            }
            header('content-type: text/plain');
            echo $return;
        }
        private function select(){
            $id = $this->sanitizeInt($this->json->id);
            $sql= str_replace(':id',$id,$this->sql_select);
            $query = $this->pdo->query($sql);
            $json  = $query->fetch(PDO::FETCH_OBJ);
            header('content-type: application/json');
            echo json_encode($json);
        }
        private function update(){
            $usr_id      = $this->sanitizeInt($this->json->id);
            $usr_nombre  = $this->sanitizeString($this->json->nombre);
            $usr_login   = $this->sanitizeString($this->json->login);
            $usr_pass    = $this->sanitizeString($this->json->pass);
            $usr_status  = $this->sanitizeString($this->json->status);
            $sql_tmp     = $this->sql_update2;
            if(isset($usr_pass)) $sql_tmp     = $this->sql_update1;
            $sql=str_replace(
                array(':usr_id',':usr_nombre',':usr_login',':usr_pass',':usr_status'),
                array( $usr_id,  $usr_nombre,  $usr_login,  $usr_pass,  $usr_status),
                $sql_tmp
            );
            error_log($sql);
            $query=$this->pdo->prepare($sql);
            $return='false';
            if($query->execute()) $return='true';
            header('content-type: text/plain');
            echo $return;
        }
        private function delete(){
            $return = 'false';
            $id = $this->sanitizeInt($this->json->id);
            $sql = str_replace(':usr_id',$id,$this->sql_delete);
            $query = $this->pdo->prepare($sql);
            if($query->execute()){
                $return = 'true';
            }
            header('content-type: text/plain');
            echo $return;
        }
        private function changeStatus(){
            $return = 'false';
            $status = 'INACTIVO';
            $id     = $this->sanitizeInt($this->json->id);
            $sql    = str_replace(':id',$id,$this->sql_select);
            $query  = $this->pdo->query($sql);
            $row    = $query->fetch(PDO::FETCH_OBJ);
            if($row->status=='INACTIVO') $status='ACTIVO';
            $sql = str_replace(array(':usr_id',':usr_status'),array($id,$status),$this->sql_status);
            $query = $this->pdo->prepare($sql);
            if($query->execute()){
                $return = 'true';
            }
            header('content-type: text/plain');
            echo $return;
        }
    }