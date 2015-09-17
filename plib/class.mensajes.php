<?php
    class mensajes extends main {

        private $sql_delete     = "delete from tv_msg_txt where txt_id=:txt_id limit 1;";
        private $sql_estado     = "update tv_msg_txt set estado=':estado' where txt_id=:txt_id;";
        private $sql_reorden    = "update tv_msg_txt set orden=:orden where orden=:reorden and tv_id=':tv_id'; update tv_msg_txt set orden=:reorden where txt_id=:txt_id;";

        public function __construct(){
            $this->init();
        }

        public function execute(){
            $this->json = json_decode(file_get_contents('php://input'));
            $method = $this->sanitizeString($this->json->m);
            if(method_exists($this,$method)){
                $this->$method();
            } else {
                $this->notFound404();
            }
        }

        // Devuelve un objeto json 
        // con la lista de fuentes 
        // disponibles.
        private function fnt(){
            if($this->checkStatus()){
                chdir('..');
                $json = scandir('fnt');
                unset($json[0]);
                unset($json[1]);
                sort($json);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }
        }

        // Devuelve un objeto json
        // con la lista de imágenes
        // disponibles.
        private function bck(){
            if($this->checkStatus()){
                chdir('..');
                $json = scandir('bck');
                unset($json[0]);
                unset($json[1]);
                sort($json);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }   
        }

        // Devuelve un objeto json
        // con la lista de mensajes
        // que pertenecen a un monitor.
        private $sql_registers = "select * from tv_msg_txt where tv_id=:tvId;";
        private function registers(){
            if($this->checkStatus()){
                $tvId=$this->sanitizeInt($this->json->tvId);
                $sql   = str_replace(':tvId',$tvId,$this->sql_registers);
                $query = $this->pdo->query($sql);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }
        }

        // Inserta un mensaje y devuelve
        // una cadena en texto plano,
        private $sql_insert = "insert into tv_msg_txt (tv_id,txt_msg,txt_front_color,txt_back_image,txt_font_family,txt_font_size) values (':tv_id',':txt_msg',':txt_front_color',':txt_back_image',':txt_font_family',':txt_font_size');";
        private function insert(){
            $this->notFound404();
            die();
            if($this->checkStatus()){

                $return          = 'false';
                $tv_id           = $this->sanitizeInt($this->json->tvId);
                $txt_msg         = $this->sanitizeString($this->json->msg);
                $txt_front_color = $this->sanitizeString($this->json->frontColor);
                $txt_back_image  = $this->sanitizeString($this->json->backImage);
                $txt_font_family = $this->sanitizeString($this->json->fontFamily);
                $txt_font_size   = $this->sanitizeString($this->json->fontSize);

                $sql=str_replace(
                    array(':tv_id',':txt_msg',':txt_front_color',':txt_back_image',':txt_font_family',':txt_font_size'),
                    array( $tv_id,  $txt_msg,  $txt_front_color,  $txt_back_image,  $txt_font_family,  $txt_font_size),
                    $this->sql_insert
                );

                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;

            } else {
                $this->notFound404();
            }
        }
        private function select(){
            if($this->checkStatus()){
                $id=$this->sanitizeInt($this->json->id);
                $sql=str_replace(':id',$id,$this->sql_select);
                $query=$this->pdo->query($sql);
                $json=$query->fetch(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }
        }
        private function update(){
            if($this->checkStatus()){
                $id=$this->sanitizeInt($this->json->id);
                $back_color=$this->sanitizeString($this->json->back_color);
                $play_direction=$this->sanitizeString($this->json->play_direction);
                $play_time=$this->sanitizeString($this->json->play_time);
                $sql=str_replace(
                    array(':id',':back_color',':play_direction',':play_time'),
                    array( $id, $back_color,  $play_direction,  $play_time),
                    $this->sql_update
                );
                $query=$this->pdo->prepare($sql);
                $return='false';
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }
        private function delete(){
            if($this->checkStatus()){
                $id=$this->sanitizeInt($this->json->id);
                $sql=str_replace(':id',$id,$this->sql_delete);
                $query=$this->pdo->prepare($sql);
                $return='false';
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }

        
    }