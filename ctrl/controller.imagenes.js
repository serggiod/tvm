angular
    .module('application')
    .controller('imagenesCtrl',function($scope,$http,$location,SessionFac){

        // Inicializar el formulario.
        SessionFac.sessionStatus(function(){
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
            $scope.bck    = {};
            $scope.resetModel();
        });

        // Función para recargar el modelo.
        $scope.resetModel = function(){

            $http.post('mdl/mensajes.php',{m:'bck'})
            .success(function(json){
                $scope.bck = json;
            })
            .error(function(){
                $location.path('/login');
            });

        };

        // Función Eliminar.
        $scope.eliminar = function(fileName){
            if(confirm('¿Esta seguro que desea eliminar este archivo de imagen?')){

                json = {
                    fileName:fileName,
                    m:'deleteImage'
                };

                $http.post('mdl/mensajes.php',json)
                .success(function(rta){

                    if(rta==='false'){
                        alert = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_DANGER,
                            closable:false,
                            title:'ERROR',
                            message:'No se ha podido eliminar el archivo de imagen.',
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
                            message:'El archivo de imagen se ha eliminado enforma correcta.',
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
            var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Seleccione el nuevo archivo de imagen para subir al servidor.</div>');
            var file  = $('<input type="file" laguage="es" multiple="true" class="form-control"/>');

            form.append(alert);
            form.append(file);

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
                        delete file;
                        delete modal;
                    }
                },{
                    label:'Aceptar',
                    cssClass:'btn btn-success',
                    action:function(){

                        formD = new FormData;
                        Files = file[0].files;
                        
                        for(i=0;i<Files.length;i++){
                            if(Files[i].type==='image/jpeg' || Files[i].type==='image/jpg' || Files[i].type==='image/png' || Files[i].type==='image/gif'){
                                formD.append('imageFiles[]',Files[i]);
                            }
                        }

                         $.ajax({
                            url:'upl/image.file.php',
                            data:formD,
                            processData:false,
                            contentType:false,
                            type:'POST',
                            success:function(rta){

                                if(rta==='false'){
                                    alert.attr('class','alert alert-danger');
                                    alert.html('<strong>Atención:</strong> No se pudo guardar los archivos en el servidor.');
                                }

                                if(rta==='true'){
                                    alert.attr('class','alert alert-success');
                                    alert.html('<strong>Atención:</strong> Los archivos se han guardado en el servidor.');
                                    $scope.resetModel();
                                    modal.close();
                                    delete form;
                                    delete alert;
                                    delete file;
                                    delete formD,
                                    delete modal;
                                }
                            }
                        });

                    }
                }]
            }); 
        };

    });