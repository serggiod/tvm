angular.module('application').factory('UsuariosFac',function($http,AlertsFac,SessionFac,UsuariosSvc){
    return {
        init:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                $scope.sessionForm=SessionFac.getEstado();
                $scope.appname='LAVALLES-TVM';
                $scope.username=SessionFac.getNombre();
                $scope.titulo='Administrar Usuarios';
                $scope.subtitulo='Lista de usuarios';
                $scope.registers={};
                $this.resetModel();
                $this.resetForms($scope);
                $this.resetRegisters($scope);    
            });
        },
        resetModel:function(){
            UsuariosSvc.id=null;
            UsuariosSvc.nombre=null;
            UsuariosSvc.login=null;
            UsuariosSvc.pass=null;
            UsuariosSvc.status=null;
            UsuariosSvc.m=null;
        },
        resetForms:function($scope){
            $scope.formGrid=true;
            $scope.formForm=false;
            $scope.readonly=false;
            $scope.disabled=false;
            $scope.alert='';
            $scope.nombre='';
            $scope.login='';
            $scope.pass='';
            $scope.status='ACTIVO';
            $scope.nuevoCancelShow=false;
            $scope.nuevoAceptShow=false;
            $scope.visualizarAceptShow=false;
            $scope.modificarCancelShow=false;
            $scope.modificarAceptShow=false;
        },
        resetRegisters:function($scope){
            var $this=this;
            UsuariosSvc.m='usuarios';
            $http.post('mdl/usuarios.php',UsuariosSvc)
            .success(function(json){
                $scope.registers = json;
            });
        },
        set:function($scope,id,nombre){
            UsuariosSvc.id=id;
            AlertsFac.registerSelected($scope,nombre);
        },
        
        /* NUEVO */
        nuevo:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                $scope.subtitulo='Nuevo usuario';
                $scope.formForm=true;
                $scope.formGrid=false;
                $scope.nuevoCancelShow=true;
                $scope.nuevoAceptShow=true;
            });
        },
        nuevoCancel:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                $this.resetModel();
                $this.resetForms($scope);
                $this.resetRegisters($scope);
            });
        },
        nuevoAcept:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                UsuariosSvc.m='insert',
                UsuariosSvc.nombre=$scope.nombre;
                UsuariosSvc.login=$scope.login;
                UsuariosSvc.pass=CryptoJS.MD5($scope.password).toString();
                UsuariosSvc.status=$scope.status;
                $http.post('mdl/usuarios.php',UsuariosSvc)
                .success(function(rta){
                    if(rta==='true'){
                        $this.resetModel();
                        $this.resetForms($scope);
                        $this.resetRegisters($scope);
                        AlertsFac.registerInsertSuccess($scope);
                    } else {
                        AlertsFac.registerInsertDanger($scope);
                    }
                });            
            });
        },
        
        /* VISUALIZAR */
        visualizar:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                if(UsuariosSvc.id){
                    UsuariosSvc.m='select';
                    $http.post('mdl/usuarios.php',UsuariosSvc).
                    success(function(json){
                        $scope.nombre=json.nombre;
                        $scope.login=json.login;
                        $scope.status=json.status;
                        $scope.subtitulo='Visuzalizando un usuario';
                        $scope.alert='';
                        $scope.visualizarAceptShow=true;
                        $scope.formGrid=false;
                        $scope.formForm=true;
                        $scope.readonly=true;
                        $scope.disabled=true;

                    });
                } else {
                    AlertsFac.registerNotSelected($scope);
                }
            });
        },
        visualizarAcept:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                $this.resetModel();
                $this.resetForms($scope);
                $this.resetRegisters($scope);
            });
        },
        
        /* MODIFICAR */
        modificar:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                if(UsuariosSvc.id){
                    if(confirm('¿Esta seguro que desea moificar este registro?')){
                        UsuariosSvc.m='select';
                        $http.post('mdl/usuarios.php',UsuariosSvc).
                        success(function(json){
                            $scope.nombre=json.nombre;
                            $scope.login=json.login;
                            $scope.status=json.status;
                            $scope.subtitulo='Modificar un usuario';
                            $scope.formGrid=false;
                            $scope.formForm=true;
                            $scope.modificarAceptShow=true;
                            $scope.modificarCancelShow=true;
                            AlertsFac.updateWarning($scope);
                        });
                    }
                } else {
                    AlertsFac.registerNotSelected($scope);
                }
            });
        },
        modificarCancel:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                $this.resetModel();
                $this.resetForms($scope);
                $this.resetRegisters($scope);
            });
        },
        modificarAcept:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                UsuariosSvc.m='update';
                UsuariosSvc.nombre=$scope.nombre;
                UsuariosSvc.login=$scope.login;
                UsuariosSvc.pass='';
                if($scope.pass) UsuariosSvc.pass=CryptoJS.MD5($scope.password).toString();
                UsuariosSvc.status=$scope.status;
                $http.post('mdl/usuarios.php',UsuariosSvc)
                .success(function(rta){
                    if(rta==='true'){
                        $this.resetModel();
                        $this.resetForms($scope);
                        $this.resetRegisters($scope);
                        AlertsFac.updateSuccess($scope);
                    } else {
                        AlertsFac.updateDanger($scope);
                    }
                });            
            });
        },
        
        /* ELIMINAR */
        eliminar:function($scope){
            var $this=this;
            SessionFac.sessionStatus(function(){
                if(UsuariosSvc.id){
                    if(confirm('¿Esta seguro que desea eliminar este registro?')){
                        UsuariosSvc.m='delete';
                        $http.post('mdl/usuarios.php',UsuariosSvc)
                        .success(function(rta){
                            if(rta==='true'){
                                $this.resetModel();
                                $this.resetForms($scope);
                                $this.resetRegisters($scope);
                                AlertsFac.deleteSuccess($scope);
                            } else {
                                AlertsFac.deleteDanger($scope);
                            }
                        });
                    }
                } else {
                    $scope.alert='<div class="alert alert-danger">Primero debe seleccionar un registro.</div>';
                }
            });
        },

        /* ESTADO */
        changeStatus:function($scope){
           var $this=this;
            SessionFac.sessionStatus(function(){
                if(UsuariosSvc.id){
                    if(confirm('¿Esta seguro que desea cambiar el estado de este registro?')){
                        UsuariosSvc.m='changeStatus';
                        $http.post('mdl/usuarios.php',UsuariosSvc)
                        .success(function(rta){
                            if(rta==='true'){
                                $this.resetModel();
                                $this.resetForms($scope);
                                $this.resetRegisters($scope);
                                AlertsFac.updateSuccess($scope);
                            } else {
                                AlertsFac.updateDanger($scope);
                            }
                        });                
                    }
                } else {
                    AlertsFac.registerNotSelected($scope);
                }
            });
        }
    }
});