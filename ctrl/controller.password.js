angular.module('application').controller('passwordCtrl',function($scope,PasswordFac){

    /* INICIALIZAR */
    PasswordFac.init($scope);
    
    /* SUBMIT */
    $scope.submit=function(){PasswordFac.submit($scope);};
    
    /* CANCEL */
    $scope.cancel=function(){PasswordFac.cancel($scope);};
    
});