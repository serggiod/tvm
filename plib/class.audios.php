<?php
    class audios extends main {

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
        // con todos los registros
        // de audios que pertenecen
        // a un monitor.
        private $sql_registers = "select * from tv_msg_audio where tv_id=:tv_id;";
        private function registers(){
            if($this->checkStatus()){
                $tv_id = $this->sanitizeInt($this->json->tvId);
                $sql   = str_replace(':tv_id',$tv_id,$this->sql_registers);
                $query = $this->pdo->query($sql);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            } else {
                $this->notFound404();
            }
        }

        // Devuelve un objeto json
        // con los nombres de los
        // archivos de audio que existen
        // en el directorio aud.
        private function aud(){
            if($this->checkStatus()){
                chdir('..');
                $mp3 = scandir('aud/');
                unset($mp3[0]);
                unset($mp3[1]);
                sort($mp3);
                header('content-type: application/json');
                echo json_encode($mp3);
            } else {
                $this->notFound404();
            }
        } 

        // Devuelve un objeto de texto
        // plano que informa sobre el
        // estado de la operacion.
        private $sql_insert = "insert into tv_msg_audio (tv_id,aud_file) values (:tv_id,':aud_file');";
        private function insert(){
            if($this->checkStatus()){
                $tv_id    = $this->sanitizeInt($this->json->tvId);
                $aud_file = $this->sanitizeString($this->json->audFile);
                $sql      = str_replace(
                    array(':tv_id',':aud_file'),
                    array( $tv_id,  $aud_file),
                    $this->sql_insert
                );
                $query    = $this->pdo->prepare($sql);
                $return   = 'false';
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }
        }

        // Devuelve un objeto de texto
        // plano que informa sobre el
        // estado de la operacion.
        private $sql_delete = "delete from tv_msg_audio where aud_id=:aud_id;";
        private function delete(){
            if($this->checkStatus()){
                $aud_id = $this->sanitizeInt($this->json->audId);
                $sql    = str_replace(':aud_id',$aud_id,$this->sql_delete);
                $query  = $this->pdo->prepare($sql);
                $return = 'false';
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }   
        }

        // Devuelve un objeto de texto
        // plano que informa sobre el
        // estado de la operacion.
        private function deleteAudio(){
            if($this->checkStatus()){
                chdir('..');
                $return   = 'false';
                $fileName = $this->sanitizeString($this->json->fileName);
                if(unlink('aud/'.$fileName)) $return='true';
                header('content-type: text/plain');
                echo $return;
            } else {
                $this->notFound404();
            }   
        }

        // Devuelve el conenido de un
        // archivo de audio
        private function getFile(){
            if($this->checkStatus()){
                chdir('..');
                $fileName     = $this->sanitizeString($this->json->fileName);
                $fileContents = file_get_contents('aud/'.$fileName);
                $fileEncode   = base64_encode($fileContents);
                $fileArray    = array(
                    'fileName'   => $fileName,
                    'fileEncode' => $fileEncode
                );
                header('content-type: text/plain');
                echo json_encode($fileArray);
            } else {
                $this->notFound404();
            }   
        }
    }