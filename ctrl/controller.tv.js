angular.module('application')
.controller('tvCtrl',function($scope,$http,SessionFac,MainMenuSvc){
    
    $scope.init = function($scope){
        SessionFac.sessionStatus(function($scope){
            $scope.status=true;
            $scope.titulo='Administrar Msg';
            $scope.subtitulo='Lista de msg';
            $scope.appname='LAVALLE-TVM';
            $scope.username=SessionFac.getNombre();
            $scope.newCancelShow=false;
            $scope.newAceptShow=false;
            $scope.viewAceptShow=false;
            $scope.editCancelShow=false;
            $scope.editAceptShow=false;
            $scope.registers=null;
           
            /* FORMS */
            $scope.formGrid=true;
            $scope.formForm=false;
        });
    };
    
    $scope.buttonsReset=function(){
        $scope.newCancelShow=false;
        $scope.newAceptShow=false;
        $scope.viewAceptShow=false;
        $scope.editCancelShow=false;
        $scope.editAceptShow=false;
    };
    
    /* NEW */
    $scope.new=function(){
        $scope.formGrid=false;
        $scope.formForm=true;
    };

    $scope.newCancel=function(){ alert('newCancel');};
    $scope.newAcept=function(){ alert('newAcept');};
    
    /* VIEW */
    $scope.view=function(){alert('view');};
    $scope.viewAcept=function(){alert('viewAcept');};
    
    /* EDIT */
    $scope.edit=function(){alert('edit');};
    $scope.editCancel=function(){alert('editCancel');};
    $scope.editAcept=function(){alert('editAcept');};
    
    /* DELETE */
    $scope.delete=function(){alert('delete');};
    
    /* STATUS */
    //$scope.status=function(){alert('status');};

    $scope.init($scope);
});