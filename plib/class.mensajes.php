<?php

    use GDText\Box;
    use GDText\Color;

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
        private $sql_registers = "select  txt_id, replace(replace(txt_msg,'^M','<br/>'),'\n','<br/>') txt_msg, txt_front_color, txt_back_image, txt_font_family, txt_font_size from tv_msg_txt where tv_id=:tvId;";
        private function registers(){
            if($this->checkStatus()){
                $tvId=$this->sanitizeInt($this->json->tvId);
                $sql   = str_replace(':tvId',$tvId,$this->sql_registers);
                $query = $this->pdo->query($sql);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                //$json->txt_msg = nl2br($json->txt_msg);
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
                $tv_id           = $this->sanitizeInt($this->json->tv_id);
                $txt_msg         = $this->sanitizeString($this->json->txt_msg);
                $txt_front_color = $this->sanitizeString($this->json->txt_front_color);
                $txt_back_image  = $this->sanitizeString($this->json->txt_back_image);
                $txt_font_family = $this->sanitizeString($this->json->txt_font_family);
                $txt_font_size   = $this->sanitizeString($this->json->txt_font_size);

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
                $txt_id=$this->sanitizeInt($this->json->txt_id);
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
        private $sql_select = "select txt_id, replace(replace(txt_msg,'^M','<br/>'),'\n','<br/>') txt_msg, txt_front_color, txt_back_image, txt_font_family, txt_font_size  from tv_msg_txt where txt_id=:txt_id;";
        private function select(){
            if($this->checkStatus()){
                $txt_id=$this->sanitizeInt($this->json->txt_id);
                $sql=str_replace(':txt_id',$txt_id,$this->sql_select);
                $query=$this->pdo->query($sql);
                $json=$query->fetch(PDO::FETCH_OBJ);
                $json->txt_msg = nl2br($json->txt_msg);
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
                $txt_id=$this->sanitizeInt($this->json->txt_id);
                $txt_msg=$this->sanitizeString($this->json->txt_msg);
                $txt_front_color=$this->sanitizeString($this->json->txt_front_color);
                $txt_back_image=$this->sanitizeString($this->json->txt_back_image);
                $txt_font_family=$this->sanitizeString($this->json->txt_font_family);
                $txt_font_size=$this->sanitizeString($this->json->txt_font_size);
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

        // Devuelve un objeto json
        // con los datos de un monitor y
        // sus respectivos mensajes. 
        private $sql_lanzar_mensajes  = "select tv_id monitor, tv_back_color backgroundColor, tv_play_direction direction, tv_play_time time from tv_msg where tv_id=:tvId;";
        private $sql_lanzar_textos = "select replace(replace(txt_msg,'^M','<br/>'),'\n','<br/>') textNode, txt_front_color color, txt_back_image backgroundImage, txt_font_family fontFamily, txt_font_size fontSize from tv_msg_txt where tv_id=:tvId;";
        private $sql_lanzar_audios = "select aud_file src from tv_msg_audio where tv_id=:tvId;";
        private function lanzarModel(){
            if($this->checkStatus()){
                
                // Entrada.
                $tvId=$this->sanitizeInt($this->json->tvId);
                
                // Mensajes.
                $sql   = str_replace(':tvId',$tvId,$this->sql_lanzar_mensajes);
                $query = $this->pdo->query($sql);
                $json  = $query->fetch(PDO::FETCH_ASSOC);

                // Textos.
                $sql   = str_replace(':tvId',$tvId,$this->sql_lanzar_textos);
                $query = $this->pdo->query($sql);
                $json['mensajes']  = $query->fetchAll(PDO::FETCH_ASSOC);

                // Audios.
                $sql   = str_replace(':tvId',$tvId,$this->sql_lanzar_audios);
                $query = $this->pdo->query($sql);
                $json['audios']  = $query->fetchAll(PDO::FETCH_ASSOC);

                // Salida.
                header('content-type: application/json');
                echo json_encode($json);
                //print_r($json);
            } else {
                $this->notFound404();
            }
        }

        // Devuelve el conenido de un
        // archivo de imagen
        private function getFile(){
            if($this->checkStatus()){
                chdir('..');
                $txtFontFamily= $this->sanitizeString($this->json->txtFontFamily);
                $txtFontSize  = $this->sanitizeString($this->json->txtFontSize);
                $txtFrontColor= $this->hex2rgb($this->sanitizeString($this->json->txtFrontColor));
                $txtMsg       = $this->sanitizeString($this->json->txtMsg);
                $fileWidth    = $this->sanitizeString($this->json->fileWidth);
                $fileHeight   = $this->sanitizeString($this->json->fileHeight);
                $filePos      = $this->sanitizeInt($this->json->filePos);
                $fileName     = $this->sanitizeString($this->json->fileName);
                $fileMime     = 'image/jpeg';
                $fileContents = file_get_contents('bck/'.$fileName);
                error_log($txtMsg);
                // Crear una imagen a partir de archivo.
                $fileImage    = imagecreatefromstring ($fileContents);

                // Dibujar un cuadro de texto en la imagen.
                $box = new Box($fileImage);
                $box->setFontFace('fnt/'.$txtFontFamily);
                $box->setFontColor(new Color($txtFrontColor[0],$txtFrontColor[1],$txtFrontColor[2]));
                $box->setFontSize($txtFontSize);
                $box->setBox(0, 0, imagesx($fileImage),imagesy($fileImage));
                $box->setTextAlign('center', 'center');
                $box->draw($txtMsg);

                // Crear, escribir, leer, codificar y limpiar la imagen en un buffer.
                ob_start();
                imagejpeg($fileImage,null,100);
                $fileEncode   = base64_encode(ob_get_contents());
                ob_end_clean();

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