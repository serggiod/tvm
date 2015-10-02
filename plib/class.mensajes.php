<?php
    class mensajes extends main {

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

        // Elimina un mensaje yu
        // devuelve una cadena de texto.
        private $sql_delete = "delete from tv_msg_txt where txt_id=:txt_id limit 1;";
        private function delete(){
            if($this->checkStatus()){
                $txt_id=$this->sanitizeInt($this->json->txtId);
                $sql=str_replace(':txt_id',$txt_id,$this->sql_delete);
                $query=$this->pdo->prepare($sql);
                $return='false';
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }

        // Selecciona un mensaje y
        // lo devuelve como un objeto json.
        private $sql_select = "select * from tv_msg_txt where txt_id=:txt_id;";
        private function select(){
            if($this->checkStatus()){
                $txt_id=$this->sanitizeInt($this->json->txtId);
                $sql=str_replace(':txt_id',$txt_id,$this->sql_select);
                $query=$this->pdo->query($sql);
                $json=$query->fetch(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }
        }

        // Actualiza un mensaje y
        // devuelve un texto plano.
        private $sql_update = "update tv_msg_txt set txt_msg=':txt_msg',txt_front_color=':txt_front_color',txt_back_image=':txt_back_image',txt_font_family=':txt_font_family',txt_font_size=':txt_font_size' where txt_id=:txt_id limit 1;";
        private function update(){
            if($this->checkStatus()){
                $txt_id=$this->sanitizeInt($this->json->txtId);
                $txt_msg= $this->sanitizeString($this->json->txtMsg);
                $txt_front_color=$this->sanitizeString($this->json->txtFrontColor);
                $txt_back_image=$this->sanitizeString($this->json->txtBackImage);
                $txt_font_family=$this->sanitizeString($this->json->txtFontFamily);
                $txt_font_size=$this->sanitizeString($this->json->txtFontSize);
                $sql=str_replace(
                    array(':txt_id', ':txt_msg', ':txt_front_color', ':txt_back_image', ':txt_font_family', ':txt_font_size'),
                    array($txt_id,   $txt_msg,   $txt_front_color,   $txt_back_image,    $txt_font_family,  $txt_font_size),
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

        // Elimina una fuente y
        // devuelve un texto plano.
        private function deleteFont(){
            if($this->checkStatus()){
                chdir('..');
                $return = 'false';
                $fileName = $this->sanitizeString($this->json->fileName);
                if(unlink('fnt/'.$fileName)) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }

        // Elimina una imagen y
        // devuelve un texto plano.
        private function deleteImage(){
            if($this->checkStatus()){
                chdir('..');
                $return = 'false';
                $fileName = $this->sanitizeString($this->json->fileName);
                if(unlink('bck/'.$fileName)) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }

        // Devuelve el conenido de un
        // archivo de imagen
        private function getFile(){
            if($this->checkStatus()){
                chdir('..');
                $filePos      = $this->sanitizeInt($this->json->filePos);
                $fileName     = $this->sanitizeString($this->json->fileName);
                $fileContents = file_get_contents('bck/'.$fileName);
                $fileMime     = mime_content_type('bck/'.$fileName);
                $fileEncode   = base64_encode($fileContents);
                $fileArray    = array(
                    'fileName'   => $fileName,
                    'fileMime'   => $fileMime,
                    'fileEncode' => $fileEncode,
                    'filePos'    => $filePos
                );
                header('content-type: application/json');
                echo json_encode($fileArray);
            } else {
                $this->notFound404();
            }   
        }
        
    }