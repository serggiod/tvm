angular
.module('application')
.controller('mensajesCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    $scope.formView = false;
    $scope.fnt      = {};
    $scope.bck      = {};
    $scope.sizes    = {};

    // Función  inicializar.
    $scope.init=function(){
        SessionFac.sessionStatus(function(){
        
            // Detalles de la interfase.
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.modelo = {
                registros:[],
                formulario:{
                    txt_id: null,
                    tv_id: $routeParams.tvId,
                    txt_msg: 'Ingrese un mensaje...',
                    txt_front_color: '#6fa41f',
                    txt_back_image: 'null',
                    txt_font_family: 'null',
                    txt_font_size: 'null',
                    orden: null,
                    estado: 'ACTIVO'
                }
            };
            $scope.resetModel();
            $scope.formView = true;

            // Recargar fuentes.
            $http
                .post('mdl/mensajes.php',{m:'fnt'})
                .success(function(json){
                    $scope.fnt = json;
                });

            // Recargar imágenes.
            $http
                .post('mdl/mensajes.php',{m:'bck'})
                .success(function(json){
                    $scope.bck = json;
                });

            // Recargar tamaños de fuentes.
            $http
                .get('sizes.json')
                .success(function(json){
                    $scope.sizes = json;
                });

        });
    };

    // Ejecutar función inicializadora.
    $scope.init();

    // Carga los mensajes paraser presentados en una tabla.
    $scope.resetModel=function(){
        $scope.titulo = 'Nuevo';
        $scope.alert  = '';
        $scope.btnNuevo = true;
        $scope.btnVisualizar = false;
        $scope.btnModificar = false;
        $scope.modelo.formulario = {
            txt_id: null,
            tv_id: $routeParams.tvId,
            txt_msg: 'Ingrese un mensaje...',
            txt_front_color: '#ffffff',
            txt_back_image: 'null',
            txt_font_family: 'null',
            txt_font_size: 'null',
            orden: null,
            estado: 'ACTIVO'
        };
        json = {m:'registers',tvId:$scope.modelo.formulario.tv_id};
        $http
            .post('mdl/mensajes.php',json)
            .success(function(json){
                $scope.modelo.registros = json;
            })
            .error(function(){
                $location.path('/login');   
            });
    };

    // Función btnNuevoCancelar.
    $scope.btnNuevoCancelar = function(){
        $scope.resetModel();
    };

    // Función btnNuevoAceptar.
    $scope.btnNuevoAceptar = function(){
        $scope.modelo.formulario.m = 'insert';
        $http
            .post('mdl/mensajes.php',$scope.modelo.formulario)
            .success(function(rta){
                $scope.resetModel();
                if(rta === 'true'){
                    $scope.alert = '<span class="label label-success">';
                    $scope.alert += 'El mensaje se guardo en forma correcta.';
                    $scope.alert = '</span>';
                }
                else{
                    $scope.alert = '<span class="label label-danger">';
                    $scope.alert += 'Ha sucedido un error.';
                    $scope.alert += '</span>'
                }
            })
            .error(function(){ $location.path('/login'); });
    };

    // Function btnVisualizarAceptar.
    $scope.btnVisualizarAceptar = function(){
        $scope.resetModel();
    };

    // Functión btnModifcarCancelar.
    $scope.btnModificarCancelar = function(){
        $scope.resetModel();
    };

    // Función btnModificarAceptar.
    $scope.btnModificarAceptar = function(){
        $scope.modelo.formulario.m = 'update';
        $http
            .post('mdl/mensajes.php',$scope.modelo.formulario)
            .success(function(rta){
                $scope.resetModel();
                if(rta==='true'){
                    $scope.alert = '<span class="label label-success">';
                    $scope.alert += 'El mensaje se modificó en forma correcta.';
                    $scope.alert += '</span>';
                }
                else{
                    $scope.alert = '<span class="label label-danger">';
                    $scope.alert += 'Ha sucedido un error.';
                    $scope.alert += '</span>'
                }
             })
            .error(function(){ $location.path('/login'); });
    };

    // Función volver.
    $scope.volver = function(){
        $location.path('/tv');
    };

    // Función eliminar.
    $scope.eliminar = function(k){
        if(confirm('¿Esta seguro que desea eliminar éste mensaje?')){
            $scope.modelo.formulario = $scope.modelo.registros[k];
            $scope.modelo.formulario.m = 'delete';
            $http.post('mdl/mensajes.php',$scope.modelo.formulario)
            .success(function(rta){
                $scope.resetModel();
                if(rta==='true'){
                    $scope.alert = '<span class="label label-success">';
                    $scope.alert += 'El mensaje se eliminó en forma correscta.';
                    $scope.alert += '</span>'
                }
                else{
                    $scope.alert = '<span class="label label-danger">';
                    $scope.alert += 'Ha sucedido un error.';
                    $scope.alert += '</span>'
                }
            
            })
            .error(function(){
                $location.path('/login');
            });
        }
    };

    // Función visualizar.
    $scope.visualizar = function(k){
        $scope.titulo = 'Visualizar';
        $scope.alert = '';
        $scope.modelo.formulario = $scope.modelo.registros[k];
        $scope.btnNuevo = false;
        $scope.btnVisualizar = true;
        $scope.btnModifcar = true;
    };

    // Función modificar.
    $scope.modificar = function(k){
        if(confirm('¿Esta seguro que desea modificar este mensaje?')){
            $scope.titulo = 'Modificar';
            $scope.alert = '';
            $scope.btnNuevo = false;
            $scope.btnVIsualizar = false;
            $scope.btnModificar = true;
            $scope.modelo.formulario = $scope.modelo.registros[k];
        }
    };

    // Funcion Play.
    $scope.play = function(k){
        
        window.scrollTo(0,0);
        
        var style = document.createElement('style');
        document.head.appendChild(style);
        style.type = 'text/css';
        style.innerHTML  = "@font-face{";
        style.innerHTML += "    font-family: '"+$scope.modelo.registros[k].txt_font_family+"'; ";
        style.innerHTML += "    src: url('fnt/"+$scope.modelo.registros[k].txt_font_family+"'); ";
        style.innerHTML += "} ";
        
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.margin = '0';
        div.style.padding = '0';
        div.style.border = '0';
        div.style.width = window.innerWidth + 'px';
        div.style.height = window.innerHeight + 'px';
        div.style.backgroundColor = $scope.modelo.registros[k].txt_front_color;
        div.style.backgroundImage = 'url(\'bck/' + $scope.modelo.registros[k].txt_back_image + '\')';
        div.style.backgroundSize  = '100% 100%';
        div.style.textAlign = 'center';
        div.style.overflow = 'hidden';

        var txt = document.createElement('font');
        div.appendChild(txt);
        txt.style.display = 'block';
        txt.style.position = 'absolute';
        txt.style.top = '0';
        txt.style.left = '0';
        txt.style.width = '100%';
        txt.style.color = $scope.modelo.registros[k].txt_front_color;
        txt.style.fontFamily = "'" + $scope.modelo.registros[k].txt_font_family + "'";
        txt.style.fontSize = $scope.modelo.registros[k].txt_font_size + 'px';
        txt.innerHTML = $scope.modelo.registros[k].txt_msg;

        var top = parseInt((window.innerHeight - txt.clientHeight) /2).toString();
        txt.style.top = top + 'px';

        div.onclick = function(){ 
            document.head.removeChild(style);
            document.body.removeChild(div);
            delete style;
            delete div;
            delete txt;
            delete top;
         };

    }
});