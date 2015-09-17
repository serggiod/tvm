angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routerProvider,SessionFac){
    
    $scope.formView = true;
    /*
    $scope.resetForms=function(){
        // FORMULARIOS POR DEFECTO
        $scope.subtitulo='Lista de tv-msg';
        $scope.formShow=true;
        $scope.alert='';
        $scope.readonly=false;
        $scope.disabled=false;
        $scope.registers='';
        $scope.aud_file='';
        $scope.tv_id='';
        $scope.imageFilesList=[];
        $scope.fontFilesList=[];
        $scope.msgInList=[];
        $scope.audioInList=[];

        // BOTONES POR DEFECTO
        $scope.nuevoCancelShow=false;
        $scope.nuevoAceptShow=false;
        $scope.visualizarAceptShow=false;
        $scope.modificarCancelShow=false;
        $scope.modificarAceptShow=false;

        // VALORES POR DEFECTO DEL FORMULARIO
        $scope.backcolor = $scope.colors[0];
        $scope.playdirection='ARRIBA';
        $scope.playhours=0;
        $scope.playmin=0;
        $scope.playsec=0;
    };

        
    // SET
    $scope.set=function($scope,id,nombre){
        TvMsgSvc.id=id;
        AlertsFac.registerSelected($scope,nombre);
    };

    // NUEVO
    $scope.nuevo=function(){
        SessionFac.sessionStatus(function(){
            $scope.tv_id='user'+SessionFac.getId();
            $scope.subtitulo='Nuevo tv-msg';
            $scope.formShow=false;
            $scope.nuevoCancelShow=true;
            $scope.nuevoAceptShow=true;
            $scope.loadAudioFile();
            $scope.selectAudioInList();
            $scope.imageFilesLoad();
            $scope.fontFilesLoad();
            $scope.msgInListLoad();
        });
    };
    $scope.nuevoCancel=function(){
        SessionFac.sessionStatus(function(){
            $scope.resetModel();
            $scope.resetForms();
            $scope.resetRegisters();
        });
    };
    $scope.nuevoAcept=function(){
        SessionFac.sessionStatus(function(){
            TvMsgSvc.m='insert';
            TvMsgSvc.tv_id=$scope.tv_id;
            TvMsgSvc.back_color=$scope.backcolor;
            TvMsgSvc.play_direction=$scope.playdirection;
            TvMsgSvc.play_time=$scope.playhours+':'+$scope.playmin+':'+$scope.playsec;
            $http.post('mdl/tvmsg.php',TvMsgSvc)
            .success(function(rta){
                if(rta==='true'){
                    $scope.resetModel();
                    $scope.resetForms();
                    $scope.resetRegisters();
                    AlertsFac.registerInsertSuccess($scope);
                } else {
                    AlertsFac.registerInsertDanger($scope);
                }
            });
        });
    };
        
    // VISUALIZAR
    $scope.visualizar=function(id){
        SessionFac.sessionStatus(function(){
            $scope.tv_id=id;
            TvMsgSvc.id=id;
            TvMsgSvc.m='select';
            $http.post('mdl/tvmsg.php',TvMsgSvc)
            .success(function(json){
                $scope.subtitulo='Visualizando tv-msg';
                $scope.backcolor=json.back_color;
                $scope.playdirection=json.play_direction;
                time=json.play_time.split(':');
                $scope.playhours=parseInt(time[0]);
                $scope.playmin=parseInt(time[1]);
                $scope.playsec=parseInt(time[2]);
                $scope.formShow=false;
                $scope.readonly=true;
                $scope.disabled=true;
                $scope.visualizarAceptShow=true;
                $scope.selectAudioInList();
                $scope.msgInListLoad();
            });
        });
    };
    $scope.visualizarAcept=function(){
        SessionFac.sessionStatus(function(){
            $scope.resetModel();
            $scope.resetForms();
            $scope.resetRegisters();
        });
    };
        
    // MODIFICAR
    $scope.modificar=function(id){
        $scope.tv_id=id;
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea modificar este registro?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action: function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        TvMsgSvc.id=id;
                        TvMsgSvc.m='select';
                        $http.post('mdl/tvmsg.php',TvMsgSvc)
                        .success(function(json){
                            dialogConfirm.close();
                            $scope.subtitulo='Modificando tv-msg';
                            $scope.backcolor=json.back_color;
                            $scope.playdirection=json.play_direction;
                            time=json.play_time.split(':');
                            $scope.playhours=parseInt(time[0]);
                            $scope.playmin=parseInt(time[1]);
                            $scope.playsec=parseInt(time[2]);
                            $scope.formShow=false;
                            $scope.modificarCancelShow=true;
                            $scope.modificarAceptShow=true;
                            $scope.loadAudioFile();
                            $scope.selectAudioInList();
                            $scope.imageFilesLoad();
                            $scope.fontFilesLoad();
                            $scope.msgInListLoad();
                            AlertsFac.updateWarning($scope);
                        });                     
                    }
                }]
            });
        });
    };
    $scope.modificarCancel=function(){
        SessionFac.sessionStatus(function(){
            $scope.resetModel();
            $scope.resetForms();
            $scope.resetRegisters();
        });
    };
    $scope.modificarAcept=function(){
        SessionFac.sessionStatus(function(){
            TvMsgSvc.m='update';
            TvMsgSvc.back_color=$scope.backcolor;
            TvMsgSvc.play_direction=$scope.playdirection;
            TvMsgSvc.play_time=$scope.playhours+':'+$scope.playmin+':'+$scope.playsec;
            $http.post('mdl/tvmsg.php',TvMsgSvc)
            .success(function(rta){
                if(rta==='true'){
                    $scope.resetModel();
                    $scope.resetForms();
                    $scope.resetRegisters();
                    AlertsFac.updateSuccess($scope);
                } else {
                    AlertsFac.updateDanger($scope);
                }
            });
        });
    };
        
    // ELIMINAR
    $scope.eliminar=function(id){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/>¿Esta seguro que desea eliminar este registro?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        TvMsgSvc.id=id;
                        TvMsgSvc.m='delete';
                        $http.post('mdl/tvmsg.php',TvMsgSvc)
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                $scope.resetModel();
                                $scope.resetForms();
                                $scope.resetRegisters();
                                AlertsFac.deleteSuccess($scope);
                            } else {
                                AlertsFac.deleteDanger($scope);
                            }
                        });
                    }
                }]
            });

        });
    };

    // MANAGE AUDIO LIST
    $scope.loadAudioFile=function(){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'loadAudioFile'})
            .success(function(json){
                $scope.audios=json;
                $scope.aud_file=$scope.audios[0];
            });
        });
    }

    $scope.deleteAudioFile=function(){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/>¿Esta seguro que desea eliminar este archivo?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        $http.post('mdl/tvmsg.php',{m:'deleteAudioFile',aud_file:$scope.aud_file})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                dialogTrue = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_SUCCESS,
                                    closable:false,
                                    title:'OK',
                                    message:'<center><img src="img/success_icon.png" width="40"/>  El archivo se ha eliminado en forma correcta.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'btn btn-success',
                                        action:function(){
                                            $scope.loadAudioFile();
                                            dialogTrue.close();
                                        }
                                    }]
                                })
                            } else {
                                dialogFalse = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_DANGER,
                                    closable:false,
                                    title:'ERROR',
                                    message:'<center><img src="img/danger_icon.png" width="40"/>  El archivo no pudo ser eliminado.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'btn btn-danger',
                                        action:function(){ dialogFalse.close(); }
                                    }]
                                });
                            }
                        });
                    }
                }]
            });
        });
    };

    $scope.uploadAudioFile=function(){
        SessionFac.sessionStatus(function(){
            var formAudioFile = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'SUBIR ARCHIVOS',
                message: '<center><input id="fileAudio" name="fileAudio" type="file" class="btn btn-success" multiple /></center>',
                buttons:[{
                    label:'Cerrar',
                    cssClass:'btn btn-primary',
                    action:function(){ formAudioFile.close();}
                }],
                onshown:function(){
                    
                    $('#fileAudio').on('change',function(){

                        formAudioFile.enableButtons(false);
                        formAudioFile.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');                        

                        formData = new FormData();
                        for(i=0; i<this.files.length; i++){
                            file = this.files[i];
                            if(file.type.match(/audio.)){
                                formData.append('audioFiles[]',file);    
                            }                            
                        }

                        $.ajax({
                            url:'upl/audio.file.php',
                            type:'POST',
                            data:formData,
                            processData:false, 
                            contentType:false, 
                            success:function(rta){
                                formAudioFile.close();
                                if(rta==='true'){
                                    $scope.loadAudioFile();
                                    dialogTrue = BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_SUCCESS,
                                        closable:false,
                                        title:'OK',
                                        message:'<center><img src="img/success_icon.png" width="40"/>  Los archivos se han cargado en forma correcta.<br></center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-success',
                                            action:function(){ dialogTrue.close(); }
                                        }]
                                    });
                                } else {
                                    dialogFalse = BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_DANGER,
                                        closable:false,
                                        title:'ERROR',
                                        message:'<center><img src="img/danger_icon.png" width="40"/>  Los archivos no se han cargado.</center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-success',
                                            action:function(){ dialogFalse.close(); }
                                        }]
                                    });
                                }
                            }

                        });

                    });

                }
            });
        });
    };

    $scope.insertAudioInList=function(){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'insertAudioInList',tv_id:$scope.tv_id,aud_file:$scope.aud_file})
            .success(function(rta){
                if(rta==='true'){
                    $scope.selectAudioInList();
                }
            });
        });
    };

    $scope.selectAudioInList=function(){
        $http.post('mdl/tvmsg.php',{m:'selectAudioInList',tv_id:$scope.tv_id})
        .success(function(json){
            $scope.audioInList=json;
        });
    };

    $scope.upordownAudioInList=function(aud_id,c,orden){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'upordownAudioInList',aud_id:aud_id,c:c,orden:orden,tv_id:$scope.tv_id})
            .success(function(rta){
                if(rta==='true'){
                    $scope.selectAudioInList();
                }
            });
        });
    };

    $scope.estadoAudioInList=function(aud_id,estado){
        SessionFac.sessionStatus(function(){
            dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea cambiar el estado de este registro?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        if(estado==='ACTIVO'){ estado='INACTIVO'; }
                        else { estado='ACTIVO'; }
                        $http.post('mdl/tvmsg.php',{m:'estadoAudioInList',aud_id:aud_id,estado:estado})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                $scope.selectAudioInList();
                            }
                        });
                    }
                }]
            });
        });
    };

    $scope.eliminarAudioInList=function(aud_id){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png">¿Esta seguro que esea eliminar este registro?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        $http.post('mdl/tvmsg.php',{m:'eliminarAudioInList',aud_id:aud_id})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                $scope.selectAudioInList();
                            }
                        });
                    }
                }]
            });
        });
    };

    // MANAGE IMAGE FILES

    $scope.imageFilesLoad=function(){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'imageFilesLoad'})
            .success(function(json){
                $scope.imageFilesList=json;
                $scope.txt_back_image=$scope.imageFilesList[0];
            });
        });
    };

    $scope.imageFilesDel=function(){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/>  ¿Esta seguro que desea eliminar la imagen '+$scope.txt_back_image+'?</center>',
                buttons:[
                    {
                        label:'Cancelar',
                        cssClass:'btn btn-danger',
                        action:function(){ dialogConfirm.close(); }
                    },{
                        label:'Aceptar',
                        cssClass:'btn btn-success',
                        action:function(){
                            this.spin();
                            dialogConfirm.enableButtons(false);
                            dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                            $http.post('mdl/tvmsg.php',{m:'imageFilesDel',file:$scope.txt_back_image})
                            .success(function(rta){
                                dialogConfirm.close();
                                if(rta==='true'){
                                    ok = BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_SUCCESS,
                                        closable:false,
                                        title:'OK',
                                        message:'<center><img src="img/success_icon.png"/>  El archivo fue eliminado en forma correcta.</center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-success',
                                            action:function(){
                                                $scope.imageFilesLoad();
                                                ok.close();
                                            }
                                        }]
                                    });
                                } else {
                                    fail = BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_DANGER,
                                        closable:false,
                                        title:'ERROR',
                                        message:'<center><img src="img/danger_icon.png"/>  El archvo no fue eliminado en forma correcta.</center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-danger',
                                            action:function(){
                                                fail.close();
                                            }
                                        }]
                                    });
                                }
                            });
                        }
                    }
                ]
            });
        });
    };
    $scope.imageFilesUp=function(){
        var dialogUpload = BootstrapDialog.show({
            type:BootstrapDialog.TYPE_PRIMARY,
            closable:false,
            title:'SUBIR ARCHIVOS',
            message:'<center><div id="imageFilesDiv"><input type="file" id="imageFiles" name="imageFiles" class="btn btn-success" multiple/></div></center>',
            buttons:[{
                label:'Cerrar',
                cssClass:'btn btn-primary',
                action:function(){ dialogUpload.close(); }
            }],
            onshown:function(){
                var imageFiles = $('#imageFiles');
                var formData   = new FormData();
                imageFiles.on('change',function(){

                    dialogUpload.enableButtons(false);
                    dialogUpload.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                    
                    for(i=0;i<this.files.length;i++){
                        file = this.files[i];
                        if(file.type.match('image/')){
                            formData.append('imageFiles[]',file);
                        }
                    }
                    $.ajax({
                        url:'upl/image.file.php',
                        type:'POST',
                        data:formData,
                        processData:false, 
                        contentType:false,
                        success:function(rta){
                            dialogUpload.close();
                            if(rta==='true'){
                                dialogSucc = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_SUCCESS,
                                    closable:false,
                                    title:'CORRECTO',
                                    message:'<center><img src="img/success_icon.png"/>  El archivo se ha cargado en forma correcta.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'btn btn-success',
                                        action:function(dialogSucc){
                                            $scope.imageFilesLoad();
                                            dialogSucc.close();
                                        }
                                    }]
                                });
                            } else {
                                dialogErr = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_DANGER,
                                    closable:false,
                                    title:'ERROR',
                                    message:'<center><img src="img/danger_icon.png"/>  El archivo no se ha cargado en forma correcta.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'btn btn-danger',
                                        action:function(dialogErr){ dialodErr.close(); }
                                    }]
                                });
                            }
                        }
                    });
                });

            }
        }); 
    };


    // MANAGE FONT FILES

    $scope.fontFilesLoad=function(){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'fontFilesLoad'})
            .success(function(json){
                $scope.fontFilesList=json;
                $scope.txt_font_family=$scope.fontFilesList[0];
            });
        });
    };

    $scope.fontFilesDel=function(){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png" />  ¿Esta seguro que desea eliminar el archivo '+$scope.txt_font_family+'?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){
                        dialogConfirm.close();
                    }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        this.spin();
                        $http.post('mdl/tvmsg.php',{m:'fontFilesDel',file:$scope.txt_font_family})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                dialogTrue  = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_SUCCESS,
                                    closable:false,
                                    title:'CORRECTO',
                                    message:'<center><img src="img/success_icon.png"/> El archivo se ha eliminado en forma correcta.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'btn btn-success',
                                        action:function(){
                                            $scope.fontFilesLoad();
                                            dialogTrue.close();
                                        }
                                    }]
                                });
                            } else {
                                dialogFalse = BootstrapDialog.show({
                                    type:BootstrapDialog.TYPE_DANGER,
                                    closable:false,
                                    title:'ERROR',
                                    message:'<center><img src="img/danger_icon.png"/> El archivo no se ha eliminado en forma correcta.</center>',
                                    buttons:[{
                                        label:'Aceptar',
                                        cssClass:'bt btn-danger',
                                        action:function(){ dialogFalse.close(); }
                                    }]
                                });
                            }
                        });
                    }
                }]
            });
        });
    };

    $scope.fontFilesUp=function(){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'SUBIR ARCHIVOS',
                message:'<center><input type="file" id="fontFiles" class="btn btn-success" multiple/></center>',
                buttons:[{
                    label:'Cerrar',
                    cssClass:'btn btn-primary',
                    action:function(){ dialogConfirm.close(); }
                }],
                onshown:function(){
                    $('#fontFiles').on('change',function(){
                        
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        
                        formData = new FormData();
                        for(i=0;i<this.files.length;i++){
                            file = this.files[i];
                            if(file.type.match('x-font-')){
                                formData.append('fontFiles[]',file);
                            }
                        }

                        $.ajax({
                            url:'upl/font.file.php',
                            type:'POST',
                            data:formData,
                            processData:false, 
                            contentType:false,
                            success:function(rta){
                                dialogConfirm.close();
                                if(rta==='true'){
                                    dialogTrue=BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_SUCCESS,
                                        closable:false,
                                        message:'<center><img src="img/success_icon.png"/> El archivo se ha subido en forma correcta.</center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-success',
                                            action:function(){
                                                $scope.fontFilesLoad();
                                                dialogTrue.close();
                                            }
                                        }]
                                    });
                                } else {
                                    dialogFalse=BootstrapDialog.show({
                                        type:BootstrapDialog.TYPE_DANGER,
                                        closable:false,
                                        title:'ERROR',
                                        message:'<center><img src="img/danger_icon.png"/> El archivo no se ha subido en forma correcta.</center>',
                                        buttons:[{
                                            label:'Aceptar',
                                            cssClass:'btn btn-danger',
                                            action:function(){ dialogFalse.close(); }
                                        }]
                                    });
                                }
                            }
                        });
                    })
                }
            });
        });
    };

    // MANAGE MSG

    $scope.msgInListLoad = function(){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'msgInListLoad',tv_id:$scope.tv_id})
            .success(function(json){
                $scope.msgInList=json;
            });
        })
    };

    $scope.msgInListInsert = function(){
        SessionFac.sessionStatus(function(){
            obj ={
                m:'msgInListInsert',
                tv_id:$scope.tv_id,
                txt_msg:$scope.txt_msg,
                txt_front_color:$scope.txt_front_color,
                txt_back_image:$scope.txt_back_image,
                txt_font_family:$scope.txt_font_family,
                txt_font_size:$scope.txt_font_size
            };
            $http.post('mdl/tvmsg.php',obj)
            .success(function(rta){
                if(rta==='true'){
                    $scope.msgInListLoad();
                }
            });
        })
    }

    $scope.msgInListUpOrDown = function(txt_id,c,orden){
        SessionFac.sessionStatus(function(){
            $http.post('mdl/tvmsg.php',{m:'msgInListUpOrDown',txt_id:txt_id,c:c,orden:orden,tv_id:$scope.tv_id})
            .success(function(rta){
                if(rta==='true'){
                    $scope.msgInListLoad();
                }
            });
        });
    };

    $scope.msgInListEstado = function(txt_id,estado){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea cambiar el estado de este mensaje?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){ dialogConfirm.close(); }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        if(estado==='ACTIVO') { estado='INACTIVO'; }
                        else { estado='ACTIVO'; }
                        $http.post('mdl/tvmsg.php',{m:'msgInListEstado',txt_id:txt_id,estado:estado})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                $scope.msgInListLoad();
                            }
                        });
                    }
                }]
            });
        });
    }

    $scope.msgInListDelete = function(txt_id){
        SessionFac.sessionStatus(function(){
            var dialogConfirm = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_WARNING,
                closable:false,
                title:'CONFIRMAR',
                message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea eliminar este mensaje?</center>',
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){
                        dialogConfirm.close();
                    }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){
                        this.spin();
                        dialogConfirm.enableButtons(false);
                        dialogConfirm.setMessage('<center><img src="img/spinner.gif" width="40"/><br>Enviando datos. Espere unos segundos...</center>');
                        $http.post('mdl/tvmsg.php',{m:'msgInListDelete',txt_id:txt_id})
                        .success(function(rta){
                            dialogConfirm.close();
                            if(rta==='true'){
                                $scope.msgInListLoad();
                            }
                        });                        
                    }
                }]
            });          
        });
    }

    // MANAGE LANZAR

    // LANZAR
    $scope.lanzar=function(tv_id){
        SessionFac.sessionStatus(function(){
            var tvMsg = $('<div id="msgBase"></div>');
            var sideBar = $('<div id="sideBar"></div>');
            var imgPowerOff = $('<img src="img/poweroff.png"/>');
            var imgReLoad = $('<img src="img/reload.png"/>');
            var imgStop = $('<img src="img/stop.png"/>');
            var imgFirst = $('<img src="img/first.png"/>');
            var imgPrev = $('<img src="img/prev.png"/>');
            var imgNext = $('<img src="img/next.png"/>');
            var imgLast = $('<img src="img/last.png"/>');
            var selectTvId = $('<select id="selectTvId"></select>');
            var optionTvId = '';
            var loadingBanner = $('<div id="loadingBanner">Espere unos segundos. Se estan preparando las diapositivas...<img src="img/progress.gif" width="300" height="15"/></div>');

            $http.post('mdl/tvmsg.php',{m:'tvMsgGetIds'})
            .success(function(json){
                json.forEach(function(option){
                    if(option.tv_id===tv_id){
                        optionTvId += '<option value="'+option.tv_id+'" selected>Mostrar el TV '+option.tv_id+'</option>';    
                    } else {
                        optionTvId += '<option value="'+option.tv_id+'">Mostrar el TV '+option.tv_id+'</option>';
                    }
                });
                selectTvId.append(optionTvId);
            }); 

            $http.post('mdl/tvmsg.php',{m:'tvMsg',tv_id:tv_id})
            .success(function(json){
                tvMsg
                    .css('position','fixed')
                    .css('top',0)
                    .css('left',0)
                    .css('z-index',600)
                    .css('width','100%')
                    .css('height','100%')
                    .css('background-color',json.tv_back_color);

                sideBar
                    .css('position','fixed')
                    .css('top','-48px')
                    .css('left',0)
                    .css('z-index',700)
                    .css('width','100%')
                    .css('height','50px')
                    .css('color','#fff')
                    .css('text-align','center')
                    .css('background-color','#2f2f30')
                    .attr('class','form form-inline')
                    .hover(function(){ sideBar.css('top',0); },
                           function(){ sideBar.css('top','-48px'); });
                
                imgPowerOff
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        var dialogConfirm = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_WARNING,
                            closable:false,
                            title:'CONFIRMAR',
                            message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea salir de esta aplicación?</center>',
                            buttons:[{
                                label:'Cancelar',
                                cssClass:'btn btn-danger',
                                action:function(){ dialogConfirm.close(); }
                            },{
                                label:'Aceptar',
                                cssClass:'btn btn-success',
                                action: function(){
                                    dialogConfirm.close();
                                    window.close();opener.window.focus()
                                }
                            }]
                        });
                    });

                imgStop                   .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        dialogConfirm = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_WARNING,
                            closable:false,
                            title:'CONFIRMAR',
                            message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea detener las diapositivas?</center>',
                            buttons:[{
                                label:'Cancelar',
                                cssClass:'btn btn-danger',
                                action:function(){ dialogConfirm.close(); }
                            },{
                                label:'Aceptar',
                                cssClass:'btn btn-success',
                                action:function(){
                                    dialogConfirm.close();
                                    tvMsg.remove();
                                    sideBar.remove();
                                }
                            }]
                        });
                    });

                imgReLoad
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        dialogConfirm = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_WARNING,
                            closable:false,
                            title:'CONFIRMAR',
                            message:'<center><img src="img/warning_icon.png"/> ¿Esta seguro que desea recargar las diapositivas?</center>',
                            buttons:[{
                                label:'Cancelar',
                                cssClass:'btn btn-danger',
                                action: function(){ dialogConfirm.close(); }
                            },{
                                label:'Aceptar',
                                cssClass:'btn btn-success',
                                action:function(){
                                    dialogConfirm.close();
                                    tvMsg.remove();
                                    sideBar.remove();
                                    $scope.lanzar(json.tv_id);
                                }
                            }]
                        });
                    });

                imgFirst
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        new_tv_id = $('#selectTvId option:first').val();
                        tvMsg.remove();
                        sideBar.remove();
                        $scope.lanzar(new_tv_id);
                    });

                imgLast
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        new_tv_id = $('#selectTvId option:last').val();
                        tvMsg.remove();
                        sideBar.remove();
                        $scope.lanzar(new_tv_id);
                    });

                imgPrev
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        position  = selectTvId[0].selectedIndex;
                        if(position<=0) position=$('#selectTvId option').length;
                        new_tv_id = $('#selectTvId option:nth-child('+position+')').val();
                        tvMsg.remove();
                        sideBar.remove();
                        $scope.lanzar(new_tv_id);
                    });

                imgNext
                    .css('height','60%')
                    .css('margin','10px')
                    .css('cursor','pointer')
                    .on('click',function(){
                        position  = (selectTvId[0].selectedIndex) +2;
                        if(position>$('#selectTvId option').length) position=1;
                        new_tv_id = $('#selectTvId option:nth-child('+position+')').val();
                        tvMsg.remove();
                        sideBar.remove();
                        $scope.lanzar(new_tv_id); 
                    });

                selectTvId
                    .css('cursor','pointer')
                    .attr('class','form-control input-sm btn btn-info')
                    .on('change',function(){
                        new_tv_id = selectTvId.val();
                        console.log(new_tv_id);
                        tvMsg.remove();
                        sideBar.remove();
                        $scope.lanzar(new_tv_id);
                    });

                loadingBanner
                    .css('width','500px')
                    .css('height','200px')
                    .css('text-align','center')
                    .css('background-color','#191B16')
                    .css('border-radius','20px')
                    .css('position','relative')
                    .css('top','100px')
                    .css('margin','auto')
                    .css('padding','50px')
                    .css('color','#67B4C6')
                    .css('font-size','26px')
                    .css('box-shadow','6px 6px 3px #131411')
                    .css('overflow','hidden')
                    .on('ready',function(){
                        $http.post('mdl/tvmsg.php',{m:'tvMSgTxt',tv_id:tv_id})
                        .success(function(json){
                            var tvMsgTxt=json;
                        });
                    });


                $('body').append(tvMsg);
                $('body').append(sideBar);

                sideBar.append(imgPowerOff);
                sideBar.append(imgStop);
                sideBar.append(imgReLoad);
                sideBar.append(imgFirst);
                sideBar.append(imgPrev);
                sideBar.append(selectTvId);
                sideBar.append(imgNext);
                sideBar.append(imgLast);

                tvMsg.html(loadingBanner);

            });
        });
    };
    */
    
});