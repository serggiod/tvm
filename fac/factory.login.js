angular.module('application').factory('LoginFac',function($http,$location,AlertsFac,SessionFac){
    return {
        init:function($scope){
            SessionFac.sessionDestroy();
            $scope.titulo   = 'Ingresar Al Sistema';
            $scope.usuario  = '';
            $scope.password = '';
            $scope.status   = true;
            AlertsFac.loginInit($scope);
        },
        login:function($scope){
            SessionFac.setUser($scope.usuario);
            SessionFac.setPass(CryptoJS.MD5($scope.password).toString());
            SessionFac.setM('login');
            $http.post('mdl/login.php',SessionFac.sessionInstance())
            .success(function(rta){
                if(rta==='true'){
                    AlertsFac.loginSuccess($scope);
                    SessionFac.setM('userdata');
                    $http.post('mdl/login.php',SessionFac.sessionInstance())
                    .success(function(json){
                        SessionFac.setId(json.id);
                        SessionFac.setNombre(json.nombre);
                        SessionFac.setEstado(true);
                        SessionFac.setUser(null);
                        SessionFac.setPass(null);
                        SessionFac.setM(null);
                        $location.path('/tv');
                    });
                } else {
                    AlertsFac.loginDanger($scope);
                }
            });
        }
    }
});