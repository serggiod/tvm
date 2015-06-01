angular.module('application').factory('LogoutFac',function($http,$location,SessionFac){
    return {
        init:function($scope){
            SessionFac.sessionStatus(function(){
                $scope.titulo   = 'Salir del Sistema';
                $scope.subtitulo= '¿Esta seguro?';
                $scope.appname  = 'LAVALLE-TVM';
                $scope.username = SessionFac.getNombre();
                $scope.status   = SessionFac.getEstado();
            });
        },
        submit:function($scope){
            if(confirm('¿Esta seguro que desea salir del sistema?')){
                SessionFac.sessionDestroy();
            } else {
                $location.path('/tv');
            }
        },
        cancel:function($scope){
            SessionFac.sessionStatus(function(){
                $location.path('/tv');
            });
        }
    }
});