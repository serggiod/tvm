angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    // Variables por defecto.
    $scope.formView= true;
    $scope.width   = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    $scope.height  = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    window.slide   = {};
    window.audLen  = 0;
    window.onPlay  = 0;
    window.imgLen  = 0;


    // Inicializar el formulario.
    SessionFac.sessionStatus(function(){
        $scope.tvId     = $routeParams.tvId;
        $scope.formView = true;
        $scope.consola  = $('#consola');

        // Establecer estilos para la consola.
        $scope
            .consola
                .css('color','#B1FF14')
                .css('background-color','#333')
                .css('display','block')
                .css('width','500px')
                .css('height','250px')
                .css('position','relative')
                .css('top','50px')
                .css('padding','7px')
                .css('left',(($scope.width-500)/2).toString()+'px')
                .css('border-left-style','solid')
                .css('border-left-width','10px')
                .css('border-left-color','#B1FF14')
                .css('resize','none')
                .css('-moz-border-radius','10px')
                .css('-webkit-border-radius','10px')
                .css('-khtml-border-radius','10px')
                .css('border-radius','10px')
                .css('-moz-box-shadow','0px 0px 10px #999')
                .css('-webkit-box-shadow','0px 0px 10px #999')
                .css('box-shadow','0px 0px 10px #999')
                .focus()
                .append('Iniciando procesos...');

        // Iniciar procesos en consola.
        $scope.init();

    });

    $scope.init = function(){

        // Solicitar datos básicos.
        $http.post('mdl/tvmsg.php',{id:$scope.tvId,m:'select'})
        .success(function(json){
            $scope.slide = json;
            $scope.consola.append("\nSolicitando datos básicos...");

            // Solisitar lista de mensajes.
            $http.post('mdl/mensajes.php',{tvId:$scope.tvId,m:'registers'})
            .success(function(json){
                $scope.slide.messages = json;
                $scope.consola.append("\nSolicitar lista de mensajes...")

                // Solicitar lista de audio.
                $scope.descargarAudios();

            })
            .error(function(){
                $location.path('/login');
            });

        })
        .error(function(){
            $location.path('/login');
        });

    };

    $scope.descargarAudios = function(){
        $scope.consola.append("\nSolicitar lista de audios...");
        $http.post('mdl/audios.php',{tvId:$scope.tvId,m:'registers'})
        .success(function(json){

            window.audLen = json.length;
            window.slide.audios = [];

            for(i in json){

                var fileName = json[i].aud_file;
                $scope.consola.append('\nIniciando la descarga del archivo de audio '+fileName+'...');

                $http.post('mdl/audios.php',{fileName:fileName,filePos:i,m:'getFile'})
                .success(function(json){
                    $scope.consola.append('\nCargando en la lista de reproducción el archivo de audio '+json.fileName+'...');
                    window.slide.audios[json.filePos] = json;

                    // En cada ciclo lanzamos la lista de reproducción.
                    $scope.listaDeReproduccion();
                })
                .error(function(){
                    $location.path('/login');
                });
            }
            
        })
        .error(function(){
            $location.path('/login');
        });

    };

    $scope.listaDeReproduccion = function(){

        if(window.slide.audios.length===window.audLen){
            
            audio = document.getElementById('audioPlay');
            window.onPlay=0;
            window.nextAudio(audio);
            $scope.consola.append('\nLanzando lista de reproducción de audios...');
            $scope.descargarImagenes();

        }

    };

    $scope.descargarImagenes = function(){
        $scope.consola.append('\nIniciando descarga de imágenes.');
        for(i in $scope.slide.messages){
            fileName = $scope.slide.messages[i].txt_back_image;
            $http.post('mdl/mensajes.php',{fileName:fileName,m:'getFile'})
            .success(function(json){
                $scope.consola.append('\nCargando en memoria el arhvivo de imagen '+json.fileName+'...');
                console.log(json);
            })
            .error(function(){
                $location.path('/login');
            });
        }
    };
    /*
    3 Tarea - Imprementar descarga de información sobre
    la estructura de la presentación , e informar por 
    consola..

    4 Tarea - Imprementar descarga de la lsta de audio e
    informar por consola.

    5 Tarea - Implementar descarga de lista de imagenes e
    informar por consola.

    6 Tarea - Implementar lanzar presentación.

    7 Tarea - Implementar barra de controlles para
    manejar la presentación.
    */
});
