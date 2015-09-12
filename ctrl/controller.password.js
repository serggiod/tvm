angular.module('application').controller('passwordCtrl',function($scope,$http,$location,SessionFac){

	// Ocultar el formulario.
	$scope.formViiew = false;
    // Funcion inicializar.
    $scope.init = function(){
   		SessionFac.sessionStatus(function(){
            $scope.titulo   = 'Cambiar Password';
            $scope.subtitulo= '¿Esta seguro?';
            $scope.appname  = 'LAVALLE-TVM';
            $scope.username = SessionFac.getNombre();
            $scope.formView = true;
        });
    };

	// Ejecutar inicializar.
    $scope.init();

    // Funcion cancelar.
    $scope.cancelar=function(){
        $location.path('/tv');
    };

    // Función aceptar.
    $scope.aceptar=function(){

		// Si uno de los dos campos estan vacios.        	
    	if((typeof($scope.password)==='undefined') || (typeof($scope.repassword)==='undefined'))
    	{
    		var fAlert = BootstrapDialog.show({
            	type:BootstrapDialog.TYPE_DANGER,
            	closable:false,
            	message:'Todos los campos son obligatorios.',
            	buttons:[{
            		label:'Aceptar',
            		cssClass:'btn btn-danger',
            		action:function(fAlert){fAlert.close();}
            	}]
            });
    	}

    	// Si los dos campos estan definidos.
    	else
    	{

    		// Si ambos campos son idénticos.
    		if($scope.password===$scope.repassword)
    		{
    			SessionFac.setPass(CryptoJS.MD5($scope.password).toString());
	            SessionFac.setM('password');

	            $http.post('mdl/login.php',SessionFac.sessionInstance())
	            .success(function(rta){
	                if(rta==='true'){
	           			var fAlert = BootstrapDialog.show({
			            	type:BootstrapDialog.TYPE_SUCCESS,
			            	closable:false,
			            	message:'EL password se ha modificado en forma correcta.',
			            	buttons:[{
			            		label:'Aceptar',
			            		cssClass:'btn btn-success',
			            		action:function(fAlert){
			            			fAlert.close();
				                    SessionFac.setPass(null);
				                    $location.path('/tv');
			            		}
			            	}]
		            	});
	                } else {
	           			var fAlert = BootstrapDialog.show({
			            	type:BootstrapDialog.TYPE_DANGER,
			            	closable:false,
			            	message:'El password no se ha modificado en forma correcta.',
			            	buttons:[{
			            		label:'Aceptar',
			            		cssClass:'btn btn-danger',
			            		action:function(fAlert){
				                    fAlert.close();
				                    SessionFac.setPass(null);
				                    $scope.password='';
				                    $scope.repassword='';
			            		}
			            	}]
		            	});		                
	           		}
	            })
				.error(function(){
           			$location.path('/login');
				});
    		}

    		// Si no son idénticos.
    		else
    		{
    			var fAlert = BootstrapDialog.show({
	            	type:BootstrapDialog.TYPE_DANGER,
	            	closable:false,
	            	message:'Los campos deben ser iguales.',
	            	buttons:[{
	            		label:'Aceptar',
	            		cssClass:'btn btn-danger',
	            		action:function(fAlert){fAlert.close();}
	            	}]
            	});
    		}

    	}
    };
    
});