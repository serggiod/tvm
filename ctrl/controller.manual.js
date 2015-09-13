angular.module('application').controller('manualCtrl',function($scope,$location,$window,SessionFac){

    // Ocultar el formulario.
    $scope.formView = false;

    // Funcion para inicializar.
    $scope.init = function(){
		SessionFac.sessionStatus(function(){
            $scope.titulo   = 'Manual de Usuario';
            $scope.subtitulo= '¿Ingresar ahora?';
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
        });
    };

    // Funcion cancelar.
    $scope.cancelar=function(){
        $location.path('/tv');
    };
    
    // Ejecutar inicializar.
    $scope.init();

});