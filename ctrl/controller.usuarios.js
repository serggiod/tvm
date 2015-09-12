angular.module('application').controller('usuariosCtrl',function($scope,$http,$location,SessionFac){
    
    // Ocultar el formulario.
    $scope.formView=false;

    // Funcion inicializar.
    $scope.init=function(){
        SessionFac.sessionStatus(function(){
            $scope.formView=true;
            $scope.appname='LAVALLES-TVM';
            $scope.username=SessionFac.getNombre();
            $scope.titulo='Administrar Usuarios';
            $scope.subtitulo='Lista de usuarios';
            $scope.usuarios={};
            $scope.resetModel();
        });
    };

    // Ejecutar inicializar.
    $scope.init();;

    // Función cargar datos del modelo.
    $scope.resetModel = function(){
        $http.post('mdl/usuarios.php',{m:'usuarios'})
        .success(function(json){
            $scope.usuarios = json;
        })
        .error(function(){
            $location.path('/login');
        });
    };

    // Función eliminar.
    $scope.eliminar = function(id){
        if(confirm('¿Está seguro que desea eliminar a este usuario?')){
            json = {id:id,m:'eliminar'};
            $http.post('mdl/usuarios.php',json)
            .success(function(rta){
                // Si la respuesta es true.
                if(rta==='true'){
                    Alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_SUCCESS,
                        closable:false,
                        message:'El usuario se ha eliminado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-success',
                            action:function(Alert){
                                delete Alert;
                                Alert.close();
                                $scope.resetModel();
                            }
                        }]
                    });
                }

                // Si la respuesta es false.
                if(rta==='false'){
                    Alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_DANGER,
                        closable:false,
                        message:'El usuario no pudo ser eliminado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-danger',
                            action:function(Alert){
                                delete Alert;
                                Alert.close();
                                $scope.resetModel();
                            }
                        }]
                    });
                }
            })
            .error(function(){
                $location.path('/login');
            });
        }
    };

    // Funcion estado.
    $scope.estado = function(id,estado){
        if(confirm('¿Esta seguro que desea cambiar el estado de este usuario?')){
            json = {
                id:id,
                m:'estado'
            };
            if(estado==='INACTIVO') json.status = 'ACTIVO';
            if(estado==='ACTIVO')   json.status  = 'INACTIVO';

            $http.post('mdl/usuarios.php',json)
            .success(function(rta){
                
                // Si la respuesta es true.
                if(rta==='true'){
                    Alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_SUCCESS,
                        closable:false,
                        message:'Se ha cambiado el estado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-success',
                            action:function(Alert){
                                delete Alert;
                                Alert.close();
                                $scope.resetModel();
                            }
                        }]
                    });
                }

                // Si la respuesta es false.
                if(rta==='false'){
                    Alert = BootstrapDialog.show({
                        type:BootstrapDialog.TYPE_DANGER,
                        closable:false,
                        message:'El estado no pudo ser cambiado en forma correcta.',
                        buttons:[{
                            label:'Aceptar',
                            cssClass:'btn btn-danger',
                            action:function(Alert){
                                delete Alert;
                                Alert.close();
                                $scope.resetModel();
                            }
                        }]
                    });
                }
            })
            .error(function(){
                $location.path('/login');
            });
        }
    };

    // Funcion nuevo.
    $scope.nuevo = function(){
        var nombre   = $('<input type="text"     class="form-control" placeholder="Nombre..."    maxlength="30" required="true"/>');
        var usuario  = $('<input type="text"     class="form-control" placeholder="Usuario..."     maxlength="10" required="true"/>');
        var password = $('<input type="password" class="form-control" placeholder="Password..."  maxlength="10" required="true"/>');
        var form     = $('<div class="form"></div>');
        var alert    = $('<div class="alert alert-warning"><strong>Atención:</strong> Todos los campos son obligatorios.</div>');

        form.append(alert);
        form.append(nombre);
        form.append(usuario);
        form.append(password);

        var formNuevo=BootstrapDialog.show({
            type:BootstrapDialog.TYPE_PRIMARY,
            closable:false,
            title:'NUEVO USUARIO',
            message:form,
            buttons:[{
                label:'Cancelar',
                cssClass:'btn btn-danger',
                action:function(formNuevo){
                    delete nombre;
                    delete usuario;
                    delete password;
                    delete form;
                    delete alert;
                    delete formNuevo;
                    formNuevo.close();
                }
            },{
                label:'Aceptar',
                cssClass:'btn btn-success',
                action:function(formNuevo){

                    regx = new RegExp('[a-zA-Z0-9 ]','g');
                    json = {
                        nombre:nombre.val().toString().match(regx).join('').toString(),
                        login:usuario.val().toString().match(regx).join('').toString(),
                        pass:CryptoJS.MD5(password.val().toString().match(regx).join('').toString()).toString(),
                        status:'INACTIVO',
                        m:'insert'
                    };
                    
                    $http.post('mdl/usuarios.php',json)
                    .success(function(rta){
                        // Si la respuesta del servidor es true.
                        if(rta==='true'){
                            alert.attr('class','alert alert-success');
                            alert.html('<strong>Correcto:</strong> Se ha ingresado un nuevo usuario.');
                            delete nombre;
                            delete usuario;
                            delete password;
                            delete form;
                            delete alert;
                            delete formNuevo;
                            formNuevo.close();
                            $scope.resetModel();    
                        }

                        // Si la respuesta del servidor es false.
                        if(rta==='false'){
                            alert.attr('class','alert alert-danger');
                            alert.html('<strong>Error:</strong> No se ha ingresado el usuario.');
                            password.val('');
                            usuario.val('');
                            nombre.val('');
                            nombre.focus();                            
                        }
                    })
                    .error(function(){
                        delete nombre;
                        delete usuario;
                        delete password;
                        delete form;
                        delete alert;
                        delete formNuevo;
                        formNuevo.close();
                        $location.path('/login');
                    });
                }
            }]
        });

    };

    // Función visualizar.
    $scope.visualizar=function(id){
        json = {id:id,m:'select'};
        $http.post('mdl/usuarios.php',json)
        .success(function(json){
            var nombre  = $('<input type="text" class="form-control" readonly="true" value="'+json.nombre+'"/>');
            var usuario = $('<input type="text" class="form-control" readonly="true" value="'+json.usuario+'"/>');
            var estado  = $('<input type="text" class="form-control" readonly="true" value="'+json.estado+'"/>');
            var alert   = $('<div class="alert alert-info"><strong>Información:</strong> Éste formulario es de solo lectura.</div>');
            var form    = $('<div class="form"></div>');

            form.append(alert);
            form.append(nombre);
            form.append(usuario);
            form.append(estado);

            var formVisualizar = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'VISUALIZANDO UN USUARIO',
                message:form,
                buttons:[{
                    label:'Aceptar',
                    cssClass:'btn btn-primary',
                    action:function(){
                        delete nombre;
                        delete usuario;
                        delete estado;
                        delete alert;
                        delete form;
                        delete formVisualizar;
                        formVisualizar.close();
                    }
                }]
            });
        })
        .error(function(){
            $location.path('/login');
        })
    };
    
    // Función modificar.
    $scope.modificar=function(id){
        if(confirm('¿Esta seguro que desea modificar este usuario?')){
            json = {id:id,m:'select'}
            $http.post('mdl/usuarios.php',json)
            .success(function(json){
                var nombre    = $('<input type="text"     class="form-control" maxlength="30" value="'+json.nombre+'"/>');
                var usuario   = $('<input type="text"     class="form-control" maxlength="10" value="'+json.usuario+'"/>');
                var password  = $('<input type="password" class="form-control" maxlength="10" value="" placeholder="Nuevo password..."/>');
                var alert     = $('<div class="alert alert-warning"><strong>Información:</strong> Éste formulario permite cambiar los datos del usuario.</div>');
                var form      = $('<div class="form"></div>');

                form.append(alert);
                form.append(nombre);
                form.append(usuario);
                form.append(password);

                var formModificar = BootstrapDialog.show({
                    type:BootstrapDialog.TYPE_PRIMARY,
                    closable:false,
                    title:'MODIFICAR UN USUARIO',
                    message:form,
                    buttons:[{
                       label:'Cancelar',
                        cssClass:'btn btn-danger',
                        action:function(){
                            delete nombre;
                            delete usuario;
                            delete password;
                            delete alert;
                            delete form;
                            delete formModificar;
                            formModificar.close();
                        } 
                    },{
                        label:'Aceptar',
                        cssClass:'btn btn-success',
                        action:function(){
                            regx = new RegExp('[a-zA-Z0-9 ]','g');
                            json = {
                                id:id,
                                nombre:nombre.val().toString().match(regx).join('').toString(),
                                login:usuario.val().toString().match(regx).join('').toString(),
                                m:'update'
                            };
                            if(eval(!(password.val()===''))) json.pass = CryptoJS.MD5(password.val().toString().match(regx).join('').toString()).toString();

                            $http.post('mdl/usuarios.php',json)
                            .success(function(rta){
                                if(rta==='true'){
                                    delete nombre;
                                    delete usuario;
                                    delete password;
                                    delete alert;
                                    delete form;
                                    delete formModificar;
                                    $scope.resetModel();
                                    formModificar.close();
                                }

                                if(rta==='false'){
                                    alert.attr('class','alert alert-danger');
                                    alert.html('<strong>Error: </strong> No se pudo modificar el usuario.');
                                    nombre.focus();
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
            })
        }
    };

});