angular
    .module('application')
    .controller('mp3Ctrl',function($scope,$http,$location,SessionFac){

        // Inicializar el formulario.
        SessionFac.sessionStatus(function(){
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
            $scope.aud      = {};
            $scope.resetModel();
        });

        // Función para recargar el modelo.
        $scope.resetModel = function(){

            $http.post('mdl/audios.php',{m:'aud'})
            .success(function(json){
                $scope.aud = json;
            })
            .error(function(){
                $location.path('/login');
            });

        };

        /*
        // Función volver.
        $scope.volver = function(){
            $location.path('/tv');
        };

        // Función Eliminar.
        $scope.eliminar = function(id){
            if(confirm('¿Esta seguro que desea eliminar este archivo de audio?')){

                json = {
                    audId:id,
                    m:'delete'
                };

                $http.post('mdl/audios.php',json)
                .success(function(rta){

                    if(rta==='false'){
                        alert = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_DANGER,
                            closable:false,
                            title:'ERROR',
                            message:'No se ha podido eliminar el archivo de audio.',
                            buttons:[{
                                label:'Aceptar',
                                cssClass:'btn btn-danger',
                                action:function(){ alert.close(); }
                            }]
                        })
                    }

                    if(rta==='true'){
                        alert = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_SUCCESS,
                            closable:false,
                            title:'CORRECTO',
                            message:'El archivo de audio se ha eliminado enforma correcta.',
                            buttons:[{
                                label:'Aceptar',
                                cssClass:'btn btn-success',
                                action:function(){ $scope.resetModel(); alert.close(); }
                            }]
                        })
                    }

                })
                .error(function(){
                    $location.path('/login');
                })
            }
        }

        // Función Nuevo.
        $scope.nuevo = function(){

            var form  = $('<div class="form"></div>');
            var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Seleccione un archivo de audio para agregar a la lista.</div>');
            var mp3   = $('<select class="form-control"></select>');
            var opt   = '';

            for(i in $scope.aud){
                opt += '<option value="'+$scope.aud[i]+'">'+$scope.aud[i]+'</option>';
            }

            mp3.append(opt);
            form.append(alert);
            form.append(mp3);

            var modal = BootstrapDialog.show({
                type:BootstrapDialog.TYPE_PRIMARY,
                closable:false,
                title:'NUEVO',
                message:form,
                buttons:[{
                    label:'Cancelar',
                    cssClass:'btn btn-danger',
                    action:function(){
                        modal.close();
                        delete form;
                        delete alert;
                        delete mp3;
                        delete opt;
                        delete modal;
                    }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){

                        json = {
                            tvId:$scope.tvId,
                            audFile:mp3.val(),
                            m:'insert'
                        };

                        $http.post('mdl/audios.php',json)
                        .success(function(rta){

                            if(rta==='false'){
                                alert.attr('class','alert alert-danger');
                                alert.html('<strong>Atención:</strong> No se pudo agregar el archivo a la lista de audio.');
                            }

                            if(rta==='true'){
                                alert.attr('class','alert alert-success');
                                alert.html('<strong>Atención:</strong> El archivo de audio se ha agregado a la lsita.');
                                $scope.resetModel();
                                modal.close();
                                delete form;
                                delete alert;
                                delete mp3;
                                delete opt;
                                delete modal;
                            }
                        })
                        .error(function(){
                            $location.path('/login');
                        });

                    }
                }]
            }); 
        };
        */

    });