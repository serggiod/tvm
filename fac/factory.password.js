angular.module('application').factory('PasswordFac',function($http,$location,AlertsFac,SessionFac){
    return {
        init:function($scope){
            SessionFac.sessionStatus(function(){
                $scope.titulo   = 'Cambiar Password';
                $scope.subtitulo= '¿Esta seguro?';
                $scope.appname  = 'LAVALLE-TVM';
                $scope.username = SessionFac.getNombre();
                $scope.status   = SessionFac.getEstado();
                AlertsFac.passwordWarning($scope);
            });
        },
        submit:function($scope){
            SessionFac.sessionStatus(function(){
                if($scope.password===$scope.repassword){
                    SessionFac.setPass(CryptoJS.MD5($scope.password).toString());
                    SessionFac.setM('password');
                    $http.post('mdl/login.php',SessionFac.sessionInstance())
                    .success(function(rta){
                        if(rta==='true'){
                            SessionFac.setPass(null);
                            AlertsFac.passwordSuccess($scope);
                            $location.path('/tv');
                        } else {
                            AlertsFac.passwordDanger($scope);
                        }
                    });
                } else {
                    $scope.password=null;
                    $scope.repassword=null;
                    AlertsFac.passwordNotEqual($scope);
                }
            });
        },
        cancel:function($scope){
            SessionFac.sessionStatus(function(){
                $location.path('/tv');
            });
        }
    };
});