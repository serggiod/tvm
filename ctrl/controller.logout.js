angular.module('application').controller('logoutCtrl',function($scope,$location,SessionFac){
    
    // Funcion para inicializar.
    $scope.init = function(){
		SessionFac.sessionStatus(function(){
            $scope.titulo   = 'Salir del Sistema';
            $scope.subtitulo= '¿Esta seguro?';
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.status   = true;
        });
    };

    // Funcion aceptar.
    $scope.aceptar=function(){
        if(confirm('¿Esta seguro que desea salir del sistema?')){
            SessionFac.sessionDestroy();
        }
    };
    
    // Funcion cancelar.
    $scope.cancelar=function(){
        $location.path('/tv');
    };

    // Ejecutar inicializar.
    $scope.init();

});