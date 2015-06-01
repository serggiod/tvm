angular.module('application').controller('usuariosCtrl',function($scope,UsuariosFac){
    
    /* INICIALIZAR */
    UsuariosFac.init($scope);
    
    /* SET */
    $scope.set=function(id,nombre){UsuariosFac.set($scope,id,nombre);};

    /* NUEVO */
    $scope.nuevo=function(){UsuariosFac.nuevo($scope);};
    $scope.nuevoCancel=function(){UsuariosFac.nuevoCancel($scope);};
    $scope.nuevoAcept=function(){UsuariosFac.nuevoAcept($scope);};
    
    
    /* VISUALIZAR */
    $scope.visualizar=function(){UsuariosFac.visualizar($scope);};
    $scope.visualizarAcept=function(){UsuariosFac.visualizarAcept($scope);};
    
    /* PARA MODIFICAR */
    $scope.modificar=function(){UsuariosFac.modificar($scope);};
    $scope.modificarCancel=function(){UsuariosFac.modificarCancel($scope);};
    $scope.modificarAcept=function(){UsuariosFac.modificarAcept($scope);};

    /* PARA ELIMINAR */
    $scope.eliminar=function(){UsuariosFac.eliminar($scope);};
    
    /* PARA STATUS */
    $scope.changeStatus=function(){UsuariosFac.changeStatus($scope);};

});