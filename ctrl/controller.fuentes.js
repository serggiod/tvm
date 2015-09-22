angular
    .module('application')
    .controller('fuentesCtrl',function($scope,$http,$location,SessionFac){

        // Inicializar el formulario.
        SessionFac.sessionStatus(function(){
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
            $scope.fnt      = {};
            $scope.resetModel();
        });

        // Función para recargar el modelo.
        $scope.resetModel = function(){

            $http.post('mdl/mensajes.php',{m:'fnt'})
            .success(function(json){
                $scope.fnt = json;
            })
            .error(function(){
                $location.path('/login');
            });

        };

        // Función volver.
        $scope.volver = function(){
            $location.path('/tv');
        };

        // Función Eliminar.
        $scope.eliminar = function(fileName){
            if(confirm('¿Esta seguro que desea eliminar este archivo de fuente?')){

                json = {
                    fileName:fileName,
                    m:'deleteFont'
                };

                $http.post('mdl/mensajes.php',json)
                .success(function(rta){

                    if(rta==='false'){
                        alert = BootstrapDialog.show({
                            type:BootstrapDialog.TYPE_DANGER,
                            closable:false,
                            title:'ERROR',
                            message:'No se ha podido eliminar el archivo de fuente.',
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
                            message:'El archivo de fuente se ha eliminado enforma correcta.',
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
            var alert = $('<div class="alert alert-warning"><strong>Atención:</strong> Seleccione los archivos para subir al servidor.</div>');
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
                            if(Files[i].type==='font/otf' || Files[i].type==='application/font-otf' || Files[i].type==='application/font' || Files[i].type==='application/otf' || Files[i].type==='application/octet-stream' || Files[i].type==='application/x-font-otf' || Files[i].type==='font/opentype' || Files[i].type==='application/font-sfnt' || Files[i].type==='application/x-font-ttf'){
                                formD.append('fontFiles[]',Files[i]);
                            }
                        }

                         $.ajax({
                            url:'upl/font.file.php',
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