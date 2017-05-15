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

        $scope.eliminar = function(fileName){
            if(confirm('¿Esta seguro que desea eliminar este archivo de audio?')){

                json = {
                    fileName:fileName,
                    m:'deleteAudio'
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

            form  = $('<div class="form"></div>');
            alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Seleccione los archivos para subir al servidor.</div>');
            file  = $('<input type="file" laguage="es" multiple="true" class="form-control"/>');

            form.append(alert);
            form.append(file);

            modal = BootstrapDialog.show({
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
                        
                        for(var i=0;i<Files.length;i++){
                            if(Files[i].type==='audio/mpeg' || Files[i].type==='audio/mpeg3' || Files[i].type==='audio/x-mpeg-3' || Files[i].type==='video/mpeg' || Files[i].type==='video/x-mpeg' || Files[i].type==='audio/mpeg' || Files[i].type==='audio/mp3'){
                                formD.append('audioFiles[]',Files[i]);
                            }
                        }

                         $.ajax({
                            url:'upl/audio.file.php',
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