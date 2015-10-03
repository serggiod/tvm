angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    // Variables por defecto.
    $scope.formView= true;

    body = document.getElementById('body');
    body.style.overflow='hidden';
    
    // Definir un objeto diapositiva.
    window.slide                = new Object;
    window.slide.width          = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    window.slide.height         = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    window.slide.base           = new Object;

    // Definir un objeto audio.
    window.slide.audio          = new Object;
    window.slide.audio.files    = new Array;
    window.slide.audio.filesNum = 0;
    window.slide.audio.filesLen = function(){
        length = 0;
        for(i in window.slide.audio.files){
            if(typeof(window.slide.audio.files[i])==='object') length++;
        }
        return length;
    }
    window.slide.audio.onPlay   = 0;
    window.slide.audio.tag      = document.getElementById('audio');
    window.slide.audio.play     = function(){

        if(window.slide.audio.filesNum>=1){
             if(window.slide.audio.filesLen()===window.slide.audio.filesNum){
                if(window.slide.audio.onPlay>=window.slide.audio.filesNum) window.slide.audio.onPlay = 0;
                window.slide.console.log('<br/>Reproduciendo >>>>> '+window.slide.audio.files[window.slide.audio.onPlay].fileName,function(){
                    window.slide.audio.tag.src  = 'data:'+window.slide.audio.files[window.slide.audio.onPlay].fileMime+';base64,'+window.slide.audio.files[window.slide.audio.onPlay].fileEncode;
                    window.slide.audio.tag.type = window.slide.audio.files[window.slide.audio.onPlay].fileType;
                    window.slide.audio.tag.play();
                    window.slide.audio.onPlay++;
                });
            }
        }

    };

    // Definir un objeto image.
    window.slide.image          = new Object;
    window.slide.image.files    = new Array;
    window.slide.image.filesNum = 0;
    window.slide.image.filesLen = function(){
        length = 0;
        for(i in window.slide.image.files){
            if(typeof(window.slide.image.files[i])==='object') length++;
        }
        return length;
    };
    window.slide.image.tag = document.getElementById('slide');
    window.slide.image.play = function(){
        if(window.slide.image.filesLen()===window.slide.image.filesNum){
            for(i in window.slide.image.files){
                window.slide.image.tag.innerHTML += '<img src="data:'+window.slide.image.files[i].fileType+';base64,'+window.slide.image.files[i].fileEncode+'" width="'+window.slide.width+'" height="'+window.slide.height+'" border="0"/>';
            }

            window.slide.console.style.height = '20px';
            window.slide.console.style.top =(window.slide.height -30).toString()+'px';
            window.slide.console.innerHTML='';
            window.slide.console.log('<br/>Reproduciendo >>>>> '+window.slide.audio.files[window.slide.audio.onPlay].fileName);
        }
    };

    // Definir una consola de informe. 
    window.slide.console        = document.getElementById('consola');
    window.slide.console.log    = function(txt,callback=false){
        window.slide.console.innerHTML += txt;
        window.slide.console.scrollTop = window.slide.console.scrollTop +20;
        if(callback) callback();
    }


    // Inicializar el formulario.
    SessionFac.sessionStatus(function(){
        $scope.tvId     = $routeParams.tvId;
        $scope.formView = true;

        // Establecer estilos para el escenario de las diapositivas.
        window.slide.image.tag.style.backgroundColor='#000';
        window.slide.image.tag.style.width=window.slide.width+'px';
        window.slide.image.tag.style.height=window.slide.height+'px';
        window.slide.image.tag.style.position='fixed';
        window.slide.image.tag.style.top=0;
        window.slide.image.tag.style.left=0;
        window.slide.image.tag.style.zIndex=300;

        // Establecer estilos para la consola.
        window.slide.console.style.color = '#B1FF14';
        window.slide.console.style.backgroundColor = '#333';
        window.slide.console.style.display = 'block';
        window.slide.console.style.width = '500px';
        window.slide.console.style.height = '250px';
        window.slide.console.style.position = 'fixed';
        window.slide.console.style.top = '50px';
        window.slide.console.style.padding = '7px';
        window.slide.console.style.left = ((window.slide.width-500)/2).toString()+'px';
        window.slide.console.style.borderLeftStyle = 'solid';
        window.slide.console.style.borderLeftWidth = '10px';
        window.slide.console.style.borderLeftColor = '#B1FF14';
        window.slide.console.style.resize = 'none';
        window.slide.console.style.borderRadius = '10px';
        window.slide.console.style.boxShadow = '0px 0px 10px #999';
        window.slide.console.style.overflow = 'hidden';
        window.slide.console.style.zIndex=350;

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
                                if(window.slide.audio.filesLen()===window.slide.audio.filesNum){
                                    window.slide.audio.play();
                                    window.timer = setTimeout($scope.descargarImagenes,1000);                                    
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
        if(window.slide.audio.tag.readyState===4){
            window.timer = null;
            delete window.timer;
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
                                    window.slide.image.play();
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
        } 
    };

    /*
    6 Tarea - Implementar lanzar presentación.

    7 Tarea - Implementar barra de controlles para
    manejar la presentación.
    */
});
