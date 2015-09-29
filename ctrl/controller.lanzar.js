angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    // Variables por defecto.
    $scope.formView= true;
    $scope.width   = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    $scope.height  = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    $scope.slide   = {};

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
                $http.post('mdl/audios.php',{tvId:$scope.tvId,m:'registers'})
                .success(function(json){
                    $scope.slide.audios = json;
                    $scope.consola.append("\nSolicitar lista de audios..."); 
                })
                .error(function(){
                    $location.path('/login');
                });

            })
            .error(function(){
                $location.path('/login');
            });

        })
        .error(function(){
            $location.path('/login');
        });

    };
    /*
    2 Tarea - Incluir librería JS para trabajar con Canvas
    y elementos multimedias.

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
