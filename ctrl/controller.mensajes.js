angular
.module('application')
.controller('mensajesCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    $scope.formView = true;
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
            console.log(json);
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

    // funcion nuevo.
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
                        frontColor:color.val(),
                        backColor:color.colorpicker('getValue'),
                        backImage:img.val(),
                        fontFamily:font.val(),
                        fontSize:size.val(),
                        m:'insert'
                    };
                    console.log(json);

                    $http.post('mdl/mensajes.php',json)
                    .succeess(function(rta){

                        if(rta==='false'){

                        }

                        if(rta==='true'){
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
                        $location.path('/login');
                    });

                }
            }]
        });
    };    
});