angular.module('application').controller('loginCtrl',function($scope,LoginFac){
    
    /* INICIALIZAR */
    LoginFac.init($scope);
    
    /* LOGIN */
    $scope.login=function(){LoginFac.login($scope);};

});