angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    // Variables por defecto.
    $scope.formView= true;
    
    // Definir un objeto diapositiva.
    window.slide                = {};
    window.slide.width          = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    window.slide.height         = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    window.slide.base           = {};

    // Definir un objeto audio.
    window.slide.audio          = {};
    window.slide.audio.files    = [];
    window.slide.audio.filesNum = 0;
    window.slide.audio.onPlay   = 0;
    window.slide.audio.tag      = document.getElementById('audio');
    window.slide.audio.next     = function(){
        if(window.slide.audio.onPlay>=window.slide.audio.files.length) window.slide.audio.onPlay = 0;
        window.slide.audio.tag.src  = 'data:'+window.slide.audio.files[window.slide.audio.onPlay].fileMime+';base64,'+window.slide.audio.files[window.slide.audio.onPlay].fileEncode;
        window.slide.audio.tag.type = window.slide.audio.files[window.slide.audio.onPlay].fileType;
        window.slide.console.log('<br/>Reproduciendo >>>>> '+window.slide.audio.files[window.slide.audio.onPlay].fileName,function(){
            window.slide.audio.tag.play();
            window.slide.audio.onPlay++;
        });        
    };

    // Definir un objeto image.
    window.slide.image          = {};
    window.slide.image.files    = [];
    window.slide.image.filesNum = 0;

    // Definir una consola de informe. 
    window.slide.console        = document.getElementById('consola');
    window.slide.console.log    = function(txt,callback=false){
        window.slide.console.innerHTML += txt;
        if(callback) callback();
    }


    // Inicializar el formulario.
    SessionFac.sessionStatus(function(){
        $scope.tvId     = $routeParams.tvId;
        $scope.formView = true;

        // Establecer estilos para la consola.
        window.slide.console.style.color = '#B1FF14';
        window.slide.console.style.backgroundColor = '#333';
        window.slide.console.style.display = 'block';
        window.slide.console.style.width = '500px';
        window.slide.console.style.height = '250px';
        window.slide.console.style.position = 'relative';
        window.slide.console.style.top = '50px';
        window.slide.console.style.padding = '7px';
        window.slide.console.style.left = ((window.slide.width-500)/2).toString()+'px';
        window.slide.console.style.borderLeftStyle = 'solid';
        window.slide.console.style.borderLeftWidth = '10px';
        window.slide.console.style.borderLeftColor = '#B1FF14';
        window.slide.console.style.resize = 'none';
        window.slide.console.style.borderRadius = '10px';
        window.slide.console.style.boxShadow = '0px 0px 10px #999';
        window.slide.console.style.overflowY = 'scroll';

        window.slide.console.log('Iniciando procesos.',function(){

            // Iniciar procesos en consola.
            $scope.init();

        });

    });

    $scope.init = function(){

        // Solicitar datos básicos.
        window.slide.console.log("<br/>Solicitar datos básicos.",function(){
            $http.post('mdl/tvmsg.php',{id:$scope.tvId,m:'select'})
            .success(function(json){
                window.slide.base = json;
                window.slide.console.log('<br/>Datos básicos agregados.',function(){
                    // Solicitar lista de audio.
                    $scope.descargarAudios();
                });
            })
            .error(function(){
                $location.path('/login');
            });            
        });

    };

    // Función para descargar archivos de audio.
    $scope.descargarAudios = function(){
        window.slide.console.log("<br/>Solicitar lista de audios.",function(){
            $http.post('mdl/audios.php',{tvId:$scope.tvId,m:'registers'})
            .success(function(json){
                window.slide.audio.filesNum = json.length;
                window.slide.audio.onPlay=0;
                for(i in json){
                   var fileName = json[i].aud_file;
                    window.slide.console.log('<br/>Iniciando la descarga del archivo '+fileName+'.',function(){
                        $http.post('mdl/audios.php',{fileName:fileName,filePos:i,m:'getFile'})
                        .success(function(json){
                            window.slide.audio.files[json.filePos] = json;
                            window.slide.console.log('<br/>Cargando en la lista el archivo '+json.fileName+'.',function(){
                                if(window.slide.audio.files.length===window.slide.audio.filesNum){
                                    window.slide.audio.next();
                                    $scope.descargarImagenes();
                                }
                            });                            
                        })
                        .error(function(){
                            $location.path('/login');
                        });
                    });
                }
            })
            .error(function(){
                $location.path('/login');
            });            
        });
    };

    //Función para descargar archivos de imagenes.
    $scope.descargarImagenes = function(){
        window.slide.console.log("<br/>Solicitar lista de imágenes.",function(){
            $http.post('mdl/mensajes.php',{tvId:$scope.tvId,m:'registers'})
            .success(function(json){
                window.slide.image.filesNum = json.length;
                for(i in json){
                    fileName = json[i].txt_back_image;
                    $http.post('mdl/mensajes.php',{fileName:fileName,filePos:i,m:'getFile'})
                    .success(function(json){
                        window.slide.image.files[json.filePos] = json;
                        window.slide.console.log('<br/>Cargando en la lista el arhvivo '+json.fileName+'.',function(){
                            if(window.slide.image.files.length===window.slide.image.filesNum){
                                console.log(window.slide);
                            }
                        });
                    })
                    .error(function(){
                        $location.path('/login');
                    });
                }

            })
            .error(function(){
                $location.path('/login');
            });
        });
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
