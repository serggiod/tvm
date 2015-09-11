angular.module('application')
.controller('loginCtrl',function($scope,$http,$location,SessionFac){
    
    // Session.
    SessionFac.sessionStart({
    	id:null,
    	nombre:null,
    	estado:null,
    });

    // Campos.
	var user = $('<input id="user" class="form-control" type="text" maxlength="10" placeholder="Usuario" required autofocus/>');
	var pass = $('<input id="pass" class="form-control" type="password" maxlength="10" placeholder="Password" required/>');
	
	var form = $('<div class="form-inline"></div>');
	form.append(user);
	form.append(pass);
    
    // Formulario.
    var formLogin = BootstrapDialog.show({
    	type:BootstrapDialog.TYPE_PRIMARY,
    	closable:false,
    	size:BootstrapDialog.SIZE_NORMAL,
    	title:'LOGIN',
    	message:form,
    	buttons:[{
    		id:'btnSubmit',
    		cssClass:'btn btn-success',
    		label:'Ingresar',
    		action:function(formLogin){

    			// Si los campos user y pass estan vacios.
    			if(user.val()==='' || pass.val()==='')
    			{
    				var alertEmpty = BootstrapDialog.show({
    					type:BootstrapDialog.TYPE_DANGER,
    					closable:false,
    					message:'Todos los campos son obligatorios.',
    					buttons:[{
    						label:'Aceptar',
    						cssClass:'btn btn-danger',
    						action:function(alertEmpty){ alertEmpty.close(); }
    					}]
    				});
    			}

    			// Si los campos user y pass contienen cadenas.
    			else
    			{

    				regx = new RegExp('[a-zA-Z0-9]','g');
	    			User = user.val().toString().match(regx).join('').toString();
	    			Pass = pass.val().toString().match(regx).join('').toString();
	    			
	    			user.val('');
		            pass.val('');
	    			
	    			SessionFac.setUser(User);
		            SessionFac.setPass(CryptoJS.MD5(Pass).toString());
		            SessionFac.setM('login');

		            $http.post('mdl/login.php',SessionFac.sessionInstance())
		            .success(function(json){

			            // Si la respuesta es un objeto.
			            if(typeof(json)==='object')
			            {

			                // Si el susuario existe inicio la session.
			                if(json.usr_id)
			                {
			                	SessionFac.sessionStart(json);
			                	$location.path('/tv');
			                	formLogin.close();
			                }

			                // Si el usuario no existe envio un mensaje de error.
			                else
			                {
			                    var alertError = BootstrapDialog.show({
			                    	type:BootstrapDialog.TYPE_DANGER,
			                    	closable:false,
			                    	message:'Los datos que envió no corresponden a un usuario.',
			                    	buttons:[{
			                    		label:'Aceptar',
			                    		cssClass:'btn btn-danger',
			                    		action:function(alertError){ alertError.close(); }
			                    	}]
			                    });
			                }
				        }

			            // Si la reswpuesta no es un objeto.
			            else
			            {
			            	var alertNObj = BootstrapDialog.show({
		                    	type:BootstrapDialog.TYPE_DANGER,
		                    	closable:false,
		                    	message:'Tipo de respuesta no esperado.',
		                    	buttons:[{
		                    		label:'Aceptar',
		                    		cssClass:'btn btn-danger',
		                    		action:function(alertNObj){ alertNObj.close(); }
		                    	}]
		                    });
			            }

		            });			

    			} 
    		}


	    }]
    });

});