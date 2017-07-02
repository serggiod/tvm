<?php
    class tvmsg extends main {
        private $json          = null;    
        private $sql_registers = "select tv_id id, concat('Monitor-Tv ',tv_id) tv,tv_back_color backcolor, tv_play_direction playdirection, tv_play_time playtime, tv_interval playinterval from tv_msg order by tv_id;";
        private $sql_insert    = "insert into tv_msg (tv_back_color,tv_play_direction,tv_play_time,tv_interval) values (':back_color',':play_direction',':play_time',':play_interval'); update tv_msg_txt set tv_id=last_insert_id() where tv_id=':tv_id';"; 
        
        private $sql_update    = "update tv_msg set tv_back_color=':back_color',tv_play_direction=':play_direction',tv_play_time=':play_time',tv_interval=':play_interval' where tv_id=:id;";
        private $sql_delete    = "delete from tv_msg where tv_id=:id;";

        private $sql_select_audio  = "select * from tv_msg_audio where tv_id=':tv_id' order by orden;";
        private $sql_count_audio   = "select count(*) as orden from tv_msg_audio where tv_id=':tv_id';";
        private $sql_insert_audio  = "insert into tv_msg_audio values (null,':tv_id',':aud_file',:orden,'ACTIVO');";
        private $sql_delete_audio  = "delete from tv_msg_audio where aud_id=:aud_id limit 1;";
        private $sql_estado_audio  = "update tv_msg_audio set estado=':estado' where aud_id=:aud_id limit 1;";
        private $sql_reorden_audio = "update tv_msg_audio set orden=:orden where orden=:reorden and tv_id=':tv_id'; update tv_msg_audio set orden=:reorden where aud_id=:aud_id;";

        private $sql_msg_orden   = "select count(*) as orden from tv_msg_txt where tv_id=':tv_id';";
        private $sql_msg_select  = "select * from tv_msg_txt where tv_id=':tv_id' order by orden;";         
        private $sql_msg_insert  = "insert into tv_msg_txt values(null,':tv_id',':txt_msg',':txt_front_color',':txt_back_image',':txt_font_family',':txt_font_size',':orden','ACTIVO');";
        private $sql_msg_delete  = "delete from tv_msg_txt where txt_id=:txt_id limit 1;";
        private $sql_msg_estado  = "update tv_msg_txt set estado=':estado' where txt_id=:txt_id;";
        private $sql_msg_reorden = "update tv_msg_txt set orden=:orden where orden=:reorden and tv_id=':tv_id'; update tv_msg_txt set orden=:reorden where txt_id=:txt_id;";

        private $sql_tvmsg_select = "select * from tv_msg where tv_id=:tv_id;";
        private $sql_tvmsg_getids = "select tv_id from tv_msg;";

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
        private function registers(){
            if($_SESSION['app_status']){
                $query = $this->pdo->query($this->sql_registers);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }            
        }
        private function insert(){
            if($this->checkStatus()){
                $return='false';
                $back_color=$this->sanitizeString($this->json->back_color);
                $play_direction=$this->sanitizeString($this->json->play_direction);
                $play_time=$this->sanitizeString($this->json->play_time);
                $play_interval=$this->sanitizeString($this->json->play_interval);
                $sql=str_replace(
                    array(':back_color',':play_direction',':play_time',':play_interval'),
                    array( $back_color,  $play_direction,  $play_time,  $play_interval),
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

        private $sql_select = "select * from tv_msg where tv_id=:id;";
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
                $play_interval=$this->sanitizeString($this->json->play_interval);
                $sql=str_replace(
                    array(':id',':back_color',':play_direction',':play_time',':play_interval'),
                    array( $id, $back_color,  $play_direction,  $play_time,   $play_interval),
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

        /* MANAGE AUDIO LIST*/
        private function ordenAudioInList($tv_id){
            $sql   = str_replace(':tv_id',$tv_id,$this->sql_count_audio);
            $query = $this->pdo->query($sql);
            $orden = $query->fetch(PDO::FETCH_OBJ);
            return $orden->orden +1;
        }
        private function loadAudioFile(){
            if($_SESSION['app_status']){
                $json = scandir($this->path.'/aud');
                unset($json[0]);
                unset($json[1]);
                sort($json);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }

        private function deleteAudioFile(){
            if($_SESSION['app_status']){
                $return   = 'false';
                $aud_file = $this->sanitizeString($this->json->aud_file);
                if(unlink($this->path.'/aud/'.$aud_file)) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function insertAudioInList(){
            if($_SESSION['app_status']){
                $return   = 'false';
                $tv_id    = $this->sanitizeString($this->json->tv_id);
                $aud_file = $this->sanitizeString($this->json->aud_file);
                $orden    = $this->ordenAudioInList($tv_id);
                $sql      = str_replace(
                    array(':tv_id',':aud_file',':orden'),
                    array( $tv_id,  $aud_file,  $orden),
                    $this->sql_insert_audio
                );
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function selectAudioInList(){
            if($_SESSION['app_status']){
                $tv_id = $this->sanitizeString($this->json->tv_id);
                $sql=str_replace(':tv_id',$tv_id,$this->sql_select_audio);
                $query=$this->pdo->query($sql);
                $json=$query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);

            }
        }

        private function upordownAudioInList(){
            if($_SESSION['app_status']){
                $return  = 'false';
                $aud_id  = $this->sanitizeInt($this->json->aud_id);
                $tv_id   = $this->sanitizeString($this->json->tv_id);
                $case    = $this->sanitizeString($this->json->c);
                $orden   = $this->sanitizeInt($this->json->orden);
                $reorden = $orden;
                if($case=='up')   $reorden--;
                if($case=='down') $reorden++;
                if($reorden<=0) $reorden=1;
                $sql = str_replace(
                    array(':aud_id',':orden',':reorden',':tv_id'),
                    array( $aud_id,  $orden,  $reorden,  $tv_id),
                    $this->sql_reorden_audio
                );
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return='true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function estadoAudioInList(){
            if($_SESSION['app_status']){
                $return   = 'false';
                $aud_id   = $this->sanitizeInt($this->json->aud_id);
                $estado   = $this->sanitizeString($this->json->estado);
                $sql      = str_replace(
                    array(':aud_id',':estado'),
                    array( $aud_id,  $estado),
                    $this->sql_estado_audio
                );
                error_log($sql);
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function eliminarAudioInList(){
            if($_SESSION['app_status']){
                $return   = 'false';
                $aud_id   = $this->sanitizeInt($this->json->aud_id);
                $sql      = str_replace(':aud_id',$aud_id,$this->sql_delete_audio);
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        
        /* MANAGE IMAGE FILES */

        private function imageFilesLoad(){
            if($_SESSION['app_status']){
                $json = scandir($this->path.'/bak');
                unset($json[0]);
                unset($json[1]);
                sort($json);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }

        private function imageFilesDel(){
            if($_SESSION['app_status']){
                $return = 'false';
                $file   = $this->sanitizeString($this->json->file);
                if(unlink($this->path.'/bak/'.$file)) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        /* MANAGE FONT FILES */

        private function fontFilesLoad(){
            if($_SESSION['app_status']){
                $json = scandir($this->path.'/font');
                unset($json[0]);
                unset($json[1]);
                sort($json);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }

        private function fontFilesDel(){
            if($_SESSION['app_status']){
                $return = 'false';
                $file   = $this->sanitizeString($this->json->file);
                if(unlink($this->path.'/font/'.$file)) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        /* MANAGE MSG */

        private function msgNextOrden($tv_id){
            $sql   = str_replace(':tv_id',$tv_id,$this->sql_msg_orden);
            $query = $this->pdo->query($sql);
            $orden = $query->fetch(PDO::FETCH_OBJ);
            return $orden->orden +1;
        }

        private function msgInListLoad(){
            if($_SESSION['app_status']){
                $tv_id = $this->sanitizeString($this->json->tv_id);
                $sql   = str_replace(':tv_id',$tv_id,$this->sql_msg_select);
                $query = $this->pdo->query($sql);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }

        private function msgInListInsert(){
            if($_SESSION['app_status']){
                $return  = 'false';
                $tv_id   = $this->sanitizeString($this->json->tv_id);
                $txt_msg = $this->sanitizeString($this->json->txt_msg);
                $txt_front_color = $this->sanitizeString($this->json->txt_front_color);
                $txt_back_image  = $this->sanitizeString($this->json->txt_back_image);
                $txt_font_family = $this->sanitizeString($this->json->txt_font_family);
                $txt_font_size   = $this->sanitizeString($this->json->txt_font_size);
                $orden = $this->msgNextOrden($tv_id);
                $sql = str_replace(
                    array(':tv_id',':txt_msg',':txt_front_color',':txt_back_image',':txt_font_family',':txt_font_size',':orden'),
                    array( $tv_id,  $txt_msg,  $txt_front_color,  $txt_back_image,  $txt_font_family,  $txt_font_size,  $orden),
                    $this->sql_msg_insert
                );
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function msgInListUpOrDown(){
            if($_SESSION['app_status']){
                $return = 'true';
                $txt_id = $this->sanitizeInt($this->json->txt_id);
                $case   = $this->sanitizeString($this->json->c);
                $orden  = $this->sanitizeInt($this->json->orden);
                $tv_id  = $this->sanitizeString($this->json->tv_id);
                $reorden= $orden;
                if($case=='up') $reorden--;
                if($case=='down') $reorden++;
                if($reorden<=0) $reorden=1;
                $sql    = str_replace(
                    array(':txt_id',':orden',':reorden',':tv_id'),
                    array( $txt_id,  $orden,  $reorden,  $tv_id),
                    $this->sql_msg_reorden
                );
                $query = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function msgInListEstado(){
            if($_SESSION['app_status']){
                $return = 'false';
                $txt_id = $this->sanitizeInt($this->json->txt_id);
                $estado = $this->sanitizeString($this->json->estado);
                $sql    = str_replace(
                    array(':txt_id',':estado'),
                    array( $txt_id,  $estado),
                    $this->sql_msg_estado
                );
                $query  = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }

        private function msgInListDelete(){
            if($_SESSION['app_status']){
                $return = 'false';
                $txt_id = $this->sanitizeInt($this->json->txt_id);
                $sql    = str_replace(':txt_id',$txt_id,$this->sql_msg_delete);
                $query  = $this->pdo->prepare($sql);
                if($query->execute()) $return = 'true';
                header('content-type: text/plain');
                echo $return;
            }
        }   


        /* MANAGE LANZAR */
        private function tvMsg(){
            if($_SESSION['app_status']){
                $tv_id = $this->sanitizeInt($this->json->tv_id);
                $sql   = str_replace(':tv_id',$tv_id,$this->sql_tvmsg_select);
                $query = $this->pdo->query($sql);
                $json  = $query->fetch(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }

        private function tvMsgTxt(){
            if($_SESSION['app_status']){
                $tv_id = $this->sanitizeInt($this->json->tv_id);
                $sql   = str_replace(':tv_id',$tv_id,$this->sql_tvmsg_select);
                $query = $this->pdo->query($sql);
                $json  = $query->fetch(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }
        private function tvMsgGetIds(){
            if($_SESSION['app_status']){
                $query = $this->pdo->query($this->sql_tvmsg_getids);
                $json  = $query->fetchAll(PDO::FETCH_OBJ);
                header('content-type: application/json');
                echo json_encode($json);
            }
        }                    
        
    }