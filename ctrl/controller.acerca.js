angular.module('application').controller('acercaCtrl',function($scope,$location,SessionFac){

    // Ocultar el formulario.
    $scope.formView = false;

    // Funcion para inicializar.
    $scope.init = function(){
		SessionFac.sessionStatus(function(){
            $scope.titulo   = 'Acerca de...';
            $scope.subtitulo= '¿Quien hizo ésto?';
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
        });
    };

    // Funcion aceptar.
    $scope.aceptar=function(){
        $location.path('/tv');
    };
    
    // Ejecutar inicializar.
    $scope.init();

});