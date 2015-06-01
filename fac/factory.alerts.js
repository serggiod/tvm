angular.module('application').factory('AlertsFac',function(){
    return {
        loginInit:function($scope){
            $scope.alert='<div class="alert alert-warning">Ingrese sus datos personales.</div>';
        },
        loginSuccess:function($scope){
            $scope.alert='<div class="alert alert-success">El usuario se ha logueado.</div>';
        },
        loginDanger:function($scope){
            $scope.alert='<div class="alert alert-danger">El usuario no se ha logueado.</div>';
        },
        
        registerInsertWarning:function($scope){
            $scope.alert='<div class="alert alert-warning">Debe completar el formulario para igresar un nuevo registro.</div>';
        },
        registerSelected:function($scope,name){
            $scope.alert='<div class="alert alert-success">Se ha seleccionado el registro <strong>'+name+'</strong>.</div>';  
        },
        registerNotSelected:function($scope){
            $scope.alert='<div class="alert alert-danger">Primero debe seleccionar un registro.</div>';  
        },
        registerInsertSuccess:function($scope){
            $scope.alert='<div class="alert alert-success">El registro se ha insertado en forma correcta.</div>';
        },
        registerInsertWarning:function($scope){
            $scope.alert='<div class="alert alert-warning">Complete el formulario para ingresar un nuevo registro.</div>';
        },
        registerInsertDanger:function($scope){
            $scope.alert='<div class="alert alert-danger">No se pudo insertar el nuevo registro.</div>';
        },
        
        passwordWarning:function($scope){
            $scope.alert='<div class="alert alert-warning">Complete el formulario para cambiar el password.</div>';
        },
        passwordSuccess:function($scope){
            $scope.alert='<div class="alert alert-success">El password se modifico en forma correcta.</div>';
        },
        passwordDanger:function($scope){
            $scope.alert='<div class="alert alert-danger">El password no fue modificado.</div>';
        },
        passwordNotEqual:function($scope){
            $scope.alert='<div class="alert alert-danger">Los campos Password y Re-Password deben ser iguales.</div>';
        },
        
        /* UPDATES */
        updateSuccess:function($scope){
            $scope.alert='<div class="alert alert-success">El registro se ha modificado en forma correcta.</div>';
        },
        updateWarning:function($scope){
            $scope.alert='<div class="alert alert-warning">Complete el formulario para modificar un registro.</div>';
        },
        updateDanger:function($scope){
            $scope.alert='<div class="alert alert-danger">No se pudo modificar el registro.</div>';
        },
        
        /* DELETE */
        deleteSuccess:function($scope){
            $scope.alert='<div class="alert alert-success">El registro se ha eliminado en forma correcta.</div>';
        },
        deleteDanger:function($scope){
            $scope.alert='<div class="alert alert-danger">No se pudo eliminar el registro.</div>';
        }
    }
});