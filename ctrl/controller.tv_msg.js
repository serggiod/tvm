angular.module('application').controller('TvMsgCtrl',function($scope,$http,$location,$window,SessionFac){
    
    // Ocultar el formulario.
    $scope.formView  = false;
    $scope.formGrid  = false;
    $scope.formNuevo = false;

    // Función  inicializar.
    $scope.init=function(){
        SessionFac.sessionStatus(function(){
        
            // Detalles de la interfase.
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.mensajes = {};
            $scope.formView = true;
            $scope.formGrid = true;
            $scope.resetModel();

            /*
            // Lista de colores.
            $scope.colors = [
                '#468966',
                '#FFF0A5',
                '#FFB03B',
                '#B64926',
                '#8E2800',
                '#e1e1e1'
            ];

            // MANAGE AUDIO LIST.
            $scope.audios=[];
            $scope.audioInList=[];

            // MANAGE IMAGE FILES.
            $scope.imageFilesList=[];

            // MANAGE FONT FILES.
            $scope.fontFilesList=[];

             // MANAGE FONT SIZES.
            $scope.fontSizesList=[
                '32px',
                '44px',
                '52px',
                '66px',
                '72px'
             ];
             $scope.txt_font_size=$scope.fontSizesList[0];

             // MANAGE msgInListLoad.
             $scope.msgInList=[];

            // RESETEAR TODOS LOS DATOS.
            
            $scope.resetForms();
            $scope.resetRegisters();

            // ESPECIALES
            $scope.tv_id='';
           */
        });
    };

    // Ejecutar función inicializadora.
    $scope.init();

    // Carga los mensajes paraser presentados en una tabla.
    $scope.resetModel=function(){
        json={m:'registers'};
        $http.post('mdl/tvmsg.php',json)
        .success(function(json){                
            $scope.mensajes=json; 
        })
        .error(function(){
            $location.path('/login');
        });
    };

    // Función nuevo.
    $scope.nuevo = function(){
        var form      = $('<div class="form"></div>');
        var alert     = $('<div class="alert alert-warning"><strong>Atención: </strong> Complete el siguiente formulario cara cargar un nuevo monitor.</div>');
        var color     = $('<div class="input-group"><input type="text" value="" class="form-control" placeholder="Color de fondo..." /><span class="input-group-addon"><i></i></span></div>'); 
        var direction = $('<select class="form-control"><option value="ARRIBA">ARRIBA</option><option value="DERECHA">DERECHA</option><option value="IZQUIERDA">IZQUIERDA</option><option value="ABAJO">ABAJO</option></select>');
        var hora      = $('<input type="number" min="0" max="23" value="0" class="form-control"/>');
        var minuto    = $('<input type="number" min="0" max="59" value="0" class="form-control"/>');
        var segundo   = $('<input type="number" min="0" max="59" value="0" class="form-control"/>');
        var divisor1   = $('<span class="input-group-addon">:</span>');
        var divisor2   = $('<span class="input-group-addon">:</span>');
        var hhdisplay = $('<div class="input-group"></div>');

        hhdisplay.append(hora);
        hhdisplay.append(divisor1);
        hhdisplay.append(minuto);
        hhdisplay.append(divisor2);
        hhdisplay.append(segundo);

        form.append(alert);
        form.append(color);
        form.append(direction);
        form.append(hhdisplay);
        
        var formNuevo = BootstrapDialog.show({
            type:BootstrapDialog.TYPE_PRIMARY,
            closable:false,
            title:'NUEVO TV-MENSAJE',
            message:form,
            onshown:function(){
                color.colorpicker();
            },
            buttons:[{
                label:'Cancelar',
                cssClass:'btn btn-danger',
                action:function(){
                    formNuevo.close();
                    $scope.resetModel();
                    delete form;
                    delete alert;
                    delete color;
                    delete direction;
                    delete hora;
                    delete minuto;
                    delete segundo;
                    delete divisor1;
                    delete divisor2;
                    delete hhdisplay;
                    delete formNuevo;
                }
            },{
                label:'Aceptar',
                cssClass:'btn btn-success',
                action:function(){
                    json = {
                        back_color:color.colorpicker('getValue'),
                        play_direction:direction.val(),
                        play_time:hora.val()+':'+minuto.val()+':'+segundo.val(),
                        m:'insert'
                    };

                    $http.post('mdl/tvmsg.php',json)
                    .success(function(rta){

                        if(rta==='false'){
                            alert.attr('class','alert alert-danger');
                            alert.html('<strong>Error:</strong> El monitor-tv nose ha ingresado en forma correcta.');
                        }

                        if(rta==='true'){
                            alert.attr('class','alert alert-success');
                            alert.html('<strong>Correcto:</strong> El monitor-tv se ha ingresado en forma correcta.');
                            formNuevo.close();
                            $scope.resetModel();
                            delete form;
                            delete alert;
                            delete color;
                            delete direction;
                            delete hora;
                            delete minuto;
                            delete segundo;
                            delete divisor1;
                            delete divisor2;
                            delete hhdisplay;
                            delete formNuevo;
                        }

                    })
                    .error(function(){
                        formNuevo.close();
                        $location.path('/login');
                    });

                }
            }]
        });
    };


    // Función visualizar.
    $scope.visualizar = function(id){

        json = {
            m:'select',
            id:id
        };

        $http.post('mdl/tvmsg.php',json)
        .success(function(json){

            var form  = $('<div class="form"></div>');
            var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Este formulario es de solo lectura.</div>');
            var color = $('<input class="form-control" style="background-color:'+json.back_color+'" value="'+json.back_color+'" readonly="true"/>');
            var direction = $('<input class="form-control" value="'+json.play_direction+'"/>');
            var time  = $('<input class="form-control" value="'+json.play_time+'"/>');
            
            form.append(alert);
            form.append(color);
            form.append(direction);
            form.append(time);

            var formVisualizar = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'VISUALIZAR',
                message:form,
                buttons:[{
                    label:'Aceptar',
                    cssClass:'btn btn-primary',
                    action:function(){
                        formVisualizar.close();
                        $scope.resetModel();
                        delete form;
                        delete alert;
                        delete color;
                        delete direction;
                        delete time;
                        delete formVisualizar;
                    }
                }]
            });
        })
        .error(function(){
            $location.path('/login');
        });
    };

    // Función modificar.
    $scope.modificar = function(id){

        if(confirm('¿Esta seguro que desea modificar este monitor?')){
 
            json = {
                m:'select',
                id:id
            };

            $http.post('mdl/tvmsg.php',json)
            .success(function(json){

                hh = json.play_time.split(':');
                var form      = $('<div class="form"></div>');
                var alert     = $('<div class="alert alert-warning"><strong>Atención:</strong> Con este formulario puede modificar un monitor.</div>');
                var color     = $('<div class="input-group"><input type="text" value="" class="form-control"/><span class="input-group-addon"><i></i></span></div>'); 
                var direction = $('<select class="form-control"><option value="'+json.play_direction+'">'+json.play_direction+'</option><option value="ARRIBA">ARRIBA</option><option value="DERECHA">DERECHA</option><option value="IZQUIERDA">IZQUIERDA</option><option value="ABAJO">ABAJO</option></select>');
                var hora      = $('<input type="number" min="0" max="23" value="'+hh[0]+'" class="form-control"/>');
                var minuto    = $('<input type="number" min="0" max="59" value="'+hh[1]+'" class="form-control"/>');
                var segundo   = $('<input type="number" min="0" max="59" value="'+hh[2]+'" class="form-control"/>');
                var divisor1  = $('<span class="input-group-addon">:</span>');
                var divisor2  = $('<span class="input-group-addon">:</span>');
                var hhdisplay = $('<div class="input-group"></div>');

                hhdisplay.append(hora);
                hhdisplay.append(divisor1);
                hhdisplay.append(minuto);
                hhdisplay.append(divisor2);
                hhdisplay.append(segundo);

                form.append(alert);
                form.append(color);
                form.append(direction);
                form.append(hhdisplay);
                
                var formModificar = BootstrapDialog.show({
                    type:BootstrapDialog.TYPE_PRIMARY,
                    closable:false,
                    title:'MODIFICAR',
                    message:form,
                    onshown:function(){
                        color.colorpicker();
                        color.colorpicker('setValue',json.back_color);
                    },
                    buttons:[{
                        label:'Cancelar',
                        cssClass:'btn btn-danger',
                        action:function(){
                            formModificar.close();
                            $scope.resetModel();
                            delete form;
                            delete alert;
                            delete color;
                            delete direction;
                            delete hora;
                            delete minuto;
                            delete segundo;
                            delete divisor1;
                            delete divisor2;
                            delete hhdisplay;
                            delete formModificar;
                        }
                    },{
                        label:'Aceptar',
                        cssClass:'btn btn-success',
                        action:function(){

                            json = {
                                id:id,
                                back_color:color.colorpicker('getValue'),
                                play_direction:direction.val(),
                                play_time:hora.val()+':'+minuto.val()+':'+segundo.val(),
                                m:'update'
                            };

                    

                            $http.post('mdl/tvmsg.php',json)
                            .success(function(rta){

                                console.log(rta);
                                if(rta==='false'){
                                    alert.attr('class','alert alert-danger');
                                    alert.html('<strong>Error:</strong> El monitor no se ha modificado en forma correcta.');
                                }

                                if(rta==='true'){
                                    alert.attr('class','alert alert-success');
                                    alert.html('<strong>Correcto:</strong> El monitor se ha modificado en forma correcta.');
                                    formModificar.close();
                                    $scope.resetModel();
                                    delete alert;    
                                    delete form;
                                    delete color;
                                    delete direction;
                                    delete hora;
                                    delete minuto;
                                    delete segundo;
                                    delete divisor1;
                                    delete divisor2;
                                    delete hhdisplay;
                                    delete formModificar;
                                }

                            })
                            .error(function(){
                                formModificar.close();
                                $location.path('/login');
                            });

                        }
                    }]
                });
            })
            .error(function(){
                $location.path('/login');
            });
        }
    };

    // Funcion eliminar.
    $scope.eliminar = function(id){
        if(confirm('¿Esta seguro que desea eliminar este monitor?')){

            json = {
                m:'delete',
                id:id
            };

            $http.post('mdl/tvmsg.php',json)
            .success(function(rta){

                if(rta==='false'){
                    alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_DANGER,
                        closable:false,
                        title:'ERROR',
                        message:'No se pudo eliminar el monitor.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-danger',
                            action:function(){
                                $scope.resetModel();
                                alert.close();
                                delete alert;
                            }
                        }]
                    });
                }

                if(rta==='true'){
                    alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_SUCCESS,
                        closable:false,
                        title:'CORRECTO',
                        message:'El monitor se ha eliminado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-success',
                            action:function(){
                                $scope.resetModel();
                                alert.close();
                                delete alert;
                            }
                        }]
                    });
                }
            })
            .error(function(){
                $location.path('/login')
            });
        }
    };

    // Función mensajes.
    $scope.mensajes = function(){
        alert('Me tienen que rutear a otro controlador');
    };

    // Función audios.
    $scope.audios = function(id){
        alert('Me tienen que rutear as otro controlador');
    };

    // Función lanzar.
    $scope.lanzar = function(id){
        alert('Me tienen que rutear a otro controlador');
    };
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