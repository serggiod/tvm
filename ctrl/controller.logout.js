angular.module('application').controller('logoutCtrl',function($scope,LogoutFac){
    
    /* INICIALIZAR */
    LogoutFac.init($scope);
    
    /* SUBMIT */
    $scope.submit=function(){LogoutFac.submit($scope);};
    
    /* CANCEL */
    $scope.cancel=function(){LogoutFac.cancel($scope);};

});