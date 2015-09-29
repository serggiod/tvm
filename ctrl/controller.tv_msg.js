angular.module('application').controller('TvMsgCtrl',function($scope,$http,$location,$window,SessionFac){
    
    // Ocultar el formulario.
    $scope.formView  = false;

    // Inicializamos el formulario.
    SessionFac.sessionStatus(function(){
    
        $scope.appname  = 'LAVALLE-TVM';
        $scope.username = SessionFac.getNombre();
        $scope.mensajes = {};
        $scope.formView = true;
        $scope.resetModel();

    });

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
            var color = $('<input class="form-control" style="background-color:'+json.back_color+'" value="'+json.tv_back_color+'" readonly="true"/>');
            var direction = $('<input class="form-control" value="'+json.tv_play_direction+'"/>');
            var time  = $('<input class="form-control" value="'+json.tv_play_time+'"/>');
            
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

                hh = json.tv_play_time.split(':');
                var form      = $('<div class="form"></div>');
                var alert     = $('<div class="alert alert-warning"><strong>Atención:</strong> Con este formulario puede modificar un monitor.</div>');
                var color     = $('<div class="input-group"><input type="text" value="" class="form-control"/><span class="input-group-addon"><i></i></span></div>'); 
                var direction = $('<select class="form-control"><option value="'+json.tv_play_direction+'">'+json.tv_play_direction+'</option><option value="ARRIBA">ARRIBA</option><option value="DERECHA">DERECHA</option><option value="IZQUIERDA">IZQUIERDA</option><option value="ABAJO">ABAJO</option></select>');
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
                        color.colorpicker('setValue',json.tv_back_color);
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
    $scope.mensajesF = function(id){
        if(confirm('¿Esta seguro que desea modificar los mensajes de este monitor?')){
            $location.path('/mensajes/'+id);
        }
    };

    // Función audios.
    $scope.audios = function(id){
        if(confirm('¿Esta seguro que desea modificar la lista de audio de este monitor?')){
            $location.path('/audios/'+id);
        }
    };

    // Función lanzar.
    $scope.lanzar = function(id){
        $location.path('/lanzar/'+id);
    };
    
});