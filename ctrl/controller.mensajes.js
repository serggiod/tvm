angular
.module('application')
.controller('mensajesCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    $scope.formView = false;
    $scope.tvId     = $routeParams.tvId;
    $scope.fnt      = {};
    $scope.bck      = {};
    $scope.sizes    = {};

    // Función  inicializar.
    $scope.init=function(){
        SessionFac.sessionStatus(function(){
        
            // Detalles de la interfase.
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.model    = {};
            $scope.formView = true;
            $scope.resetModel();

            // Recargar fuentes.
            $http.post('mdl/mensajes.php',{m:'fnt'})
            .success(function(json){
                $scope.fnt = json;
            });

            // Recargar imágenes.
            $http.post('mdl/mensajes.php',{m:'bck'})
            .success(function(json){
                $scope.bck = json;
            });

            // Recargar tamaños de fuentes.
            $http.get('sizes.json')
            .success(function(json){
                $scope.sizes = json;
            })

        });
    };

    // Ejecutar función inicializadora.
    $scope.init();

    // Carga los mensajes paraser presentados en una tabla.
    $scope.resetModel=function(){

        json = {
            m:'registers',
            tvId:$scope.tvId
        };

        $http.post('mdl/mensajes.php',json)
        .success(function(json){
            $scope.model = json;
        })
        .error(function(){
            $location.path('/login');   
        })
    };

    // Función volver.
    $scope.volver = function(){
        $location.path('/tv');
    };

    // Función eliminar.
    $scope.eliminar = function(txtId){
        if(confirm('¿Esta seguro que desea eliminar éste mensaje?')){

            json = {txtId:txtId,m:'delete'};
            $http.post('mdl/mensajes.php',json)
            .success(function(rta){

                if(rta==='false'){
                    alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_DANGER,
                        closable:false,
                        title:'ERROR',
                        message:'No se ha podido eliminar este mensaje.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-danger',
                            action:function(){ alert.close(); }
                        }]
                    });
                }

                if(rta==='true'){
                    alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_SUCCESS,
                        closable:false,
                        title:'CORRECTO',
                        message:'El mensaje se ha eliminado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-success',
                            action:function(){ $scope.resetModel(); alert.close(); }
                        }]
                    });
                }

            })
            .error(function(){
                $location.path('/login');
            });
        }
    };

    // Función visualizar.
    $scope.visualizar = function(txtId){

        json = {txtId:txtId,m:'select'};

        $http.post('mdl/mensajes.php',json)
        .success(function(json){

            var form  = $('<div class="form"></div>');
            var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Este formulario es de solo lectura.</div>');
            var msg   = $('<input type="text" class="form-control" maxlength="250" value="'+json.txt_msg+'" disabled="true"/>');
            var color = $('<div class="input-group"><input type="text" class="form-control"/><span class="input-group-addon"><i></i></span></div>'); 
            var img   = $('<select class="form-control" disabled="true"><option value="'+json.txt_back_image+'">'+json.txt_back_image+'</option></select>');
            var font  = $('<select class="form-control" disabled="true"><option value="'+json.txt_font_family+'">'+json.txt_font_family+'</option</select>');
            var size  = $('<select class="form-control" disabled="true"><option value="'+json.txt_font_size+'">'+json.txt_font_size+'</option></select>');

            form
                .append(alert)
                .append(msg)
                .append(color)
                .append(img)
                .append(font)
                .append(size);

            var modal = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'VISUALIZANDO',
                message:form,
                onshown:function(){
                    color.colorpicker();
                    color.colorpicker('setValue','#6fa41f');
                    color.colorpicker('disable');
                },
                buttons:[{
                    label:'Aceptar',
                    cssClass:'btn btn-primary',
                    action:function(){
                        $scope.resetModel();
                        modal.close();
                        delete form;
                        delete alert;
                        delete msg;
                        delete color;
                        delete img;
                        delete font;
                        delete size;
                    }
                }]
            });
        })
        .error(function(){
            $location.path('/login;')
        });
    };

    // Función nuevo.
    $scope.nuevo = function(){
  
        var form  = $('<div class="form"></div>');
        var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Complete los datos para ingresar un nuevo mensaje.</div>');
        var msg   = $('<input type="text" class="form-control" maxlength="250" placeholder="Ingrese el mensaje..."/>');
        var color = $('<div class="input-group"><input type="text" value="" class="form-control" placeholder="Color de la fuente..." /><span class="input-group-addon"><i></i></span></div>'); 
        var img   = $('<select class="form-control" placeholder="Imagen de fondo..."></select>');
        var font  = $('<select class="form-control" placeholder="Nombre de la fuente..."></select>');
        var size  = $('<select class="form-control" placeholder="Tamaño de la fuente..."></select>');
        
        var optF  = '';
        for(i in $scope.fnt) {
            optF += '<option value="'+$scope.fnt[i]+'">'+$scope.fnt[i]+'</option>';
        }

        var optI = '';
        for(i in $scope.bck) {
            optI += '<option value="'+$scope.bck[i]+'">'+$scope.bck[i]+'</option>';
        }

        var optZ = '';
        for(i in $scope.sizes) {
            optZ += '<option value="'+$scope.sizes[i]+'">'+$scope.sizes[i]+'</option>';
        }

        font.append(optF);
        img.append(optI);
        size.append(optZ);

        form.append(alert);
        form.append(msg);
        form.append(color);
        form.append(img);
        form.append(font);
        form.append(size);

        var modal = BootstrapDialog.show({
            type:BootstrapDialog.TYPE_PRIMARY,
            closable:false,
            title:'NUEVO',
            message:form,
            onshown:function(){
                color.colorpicker();
                color.colorpicker('setValue','#6fa41f');
            },
            buttons:[{
                label:'Cancelar',
                cssClass:'btn btn-danger',
                action:function(){
                    modal.close();
                    delete form;
                    delete alert;
                    delete msg;
                    delete color;
                    delete img;
                    delete font;
                    delete size;
                    delete optF;
                    delete optI;
                    delete optZ;
                    delete modal;
                }
            },{
                label:'Aceptar',
                cssClass:'btn btn-success',
                action:function(){
                    json = {
                        tvId:$scope.tvId,
                        msg:msg.val(),
                        frontColor:color.colorpicker('getValue'),
                        backImage:img.val(),
                        fontFamily:font.val(),
                        fontSize:size.val(),
                        m:'insert'
                    };

                    $http.post('mdl/mensajes.php',json)
                    .success(function(rta){

                        if(rta==='false'){
                            alert.attr('class','alert alert-danger');
                            alert.html('<strong>Atención:</strong> No se pudo insertar el mensaje.');
                        }

                        if(rta==='true'){
                            alert.attr('class','alert alert-success');
                            alert.html('<strong>Atención:</strong> EL mensaje se insertó en forma correcta.')
                            $scope.resetModel();
                            modal.close();
                            delete form;
                            delete alert;
                            delete msg;
                            delete color;
                            delete img;
                            delete font;
                            delete size;
                            delete optF;
                            delete optI;
                            delete optZ;
                            delete modal;
                        }

                    })
                    .error(function(){
                        modal.close();
                        $location.path('/login');
                    });

                }
            }]
        });
    };

    // Función modificar.
    $scope.modificar = function(txtId){
        if(confirm('¿Esta seguro que desea modificar este mensaje?')){

            json = {txtId:txtId,m:'select'};

            $http.post('mdl/mensajes.php',json)
            .success(function(json){

                var form  = $('<div class="form"></div>');
                var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Este formulario le permite modificar el mensaje.</div>');
                var msg   = $('<input type="text" class="form-control" maxlength="250" value="'+json.txt_msg+'"/>');
                var color = $('<div class="input-group"><input type="text" class="form-control"/><span class="input-group-addon"><i></i></span></div>'); 
                var img   = $('<select class="form-control"></select>');
                var font  = $('<select class="form-control"></select>');
                var size  = $('<select class="form-control"></select>');

                var optF  = '<option value="'+json.txt_font_family+'" selected="true">'+json.txt_font_family+'</option>';
                for(i in $scope.fnt) {
                    optF += '<option value="'+$scope.fnt[i]+'">'+$scope.fnt[i]+'</option>';
                }

                var optI = '<option value="'+json.txt_back_image+'" selected="true">'+json.txt_back_image+'</option>';
                for(i in $scope.bck) {
                    optI += '<option value="'+$scope.bck[i]+'">'+$scope.bck[i]+'</option>';
                }

                var optZ = '<option value="'+json.txt_font_size+'" selected="true">'+json.txt_font_size+'</option>';
                for(i in $scope.sizes) {
                    optZ += '<option value="'+$scope.sizes[i]+'">'+$scope.sizes[i]+'</option>';
                }

                font.append(optF);
                img.append(optI);
                size.append(optZ);

                form
                    .append(alert)
                    .append(msg)
                    .append(color)
                    .append(img)
                    .append(font)
                    .append(size);

                var modal = BootstrapDialog.show({
                    type:BootstrapDialog.TYPE_PRIMARY,
                    closable:false,
                    title:'VISUALIZANDO',
                    message:form,
                    onshown:function(){
                        color.colorpicker();
                        color.colorpicker('setValue',json.txt_front_color);
                    },
                    buttons:[{
                        label:'Cancelar',
                        cssClass:'btn btn-danger',
                        action:function(){
                            modal.close();
                            delete form;
                            delete alert;
                            delete msg;
                            delete color;
                            delete img;
                            delete font;
                            delete size;
                            delete optF;
                            delete optI;
                            delete optZ;
                        }

                    },{
                        label:'Aceptar',
                        cssClass:'btn btn-success',
                        action:function(){

                            json = {
                                txtId:txtId,
                                txtMsg:msg.val(),
                                txtFrontColor:color.colorpicker('getValue'),
                                txtBackImage:img.val(),
                                txtFontFamily:font.val(),
                                txtFontSize:size.val(),
                                m:'update'
                            };

                            $http.post('mdl/mensajes.php',json)
                                .success(function(rta){

                                    if(rta==='false'){
                                        alert.attr('class','alert alert-danger');
                                        alert.html('<strong>Atención:</strong> No se pudo modificar el mensaje.');
                                    }

                                    if(rta=='true'){
                                        alert.attr('class','alert alert-success');
                                        alert.html('<strong>Atención:</strong> El mensaje se ha modificado en forma correcta.');
                                        $scope.resetModel();
                                        modal.close();
                                        delete form;
                                        delete alert;
                                        delete msg;
                                        delete color;
                                        delete img;
                                        delete font;
                                        delete size;
                                        delete optF;
                                        delete optI;
                                        delete optZ;                                       
                                    }

                                })
                                .error(function(){
                                    modal.close();
                                    $location.path('/login');
                                });

                        }
                    }]
                });
            })
            .error(function(){
                $location.path('/login;')
            });
        }
    };

    // Funcion Play.
    $scope.play = function(txt_font_family,txt_font_size,txt_front_color,txt_msg,txt_back_image){
        file = {
            txtFontFamily:txt_font_family,
            txtFontSize:txt_font_size,
            txtFrontColor:txt_front_color,
            txtMsg:txt_msg,
            fileName:txt_back_image,
            filePos:0,
            m:'getFile'
        };
        $http.post('mdl/mensajes.php',file)
        .success(function(json){
            
            var image = '<img'
            image += ' src="data:'+json.fileType+';base64,'+json.fileEncode+'"';
            image += ' width="100%"';
            image += ' border="0"';
            image += '/>';

            var alert = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'VISTA PREVIA',
                message:image,
                buttons:[{
                    label:'Aceptar',
                    cssClass:'btn btn-primary',
                    action:function(){
                        alert.close();
                    }
                }]
            });
        })
        .error(function(){
            $location.path('/login');
        });
    }
});