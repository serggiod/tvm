angular.module('application').factory('SessionFac',function($http,$location,SessionSvc){
    return {
        getId:function(){
            return SessionSvc.id;
        },
        getNombre:function(){
            return SessionSvc.nombre;
        },
        getEstado:function(){
            return SessionSvc.estado;
        },
        getUser:function(){
            return SessionSvc.user;
        },
        getPass:function(){
            return SessionSvc.pass;
        },
        getM:function(){
            return SessionSvc.m;
        },
        setId:function(id){
            SessionSvc.id=id; 
        },
        setNombre:function(nombre){
            SessionSvc.nombre=nombre;
        },
        setEstado:function(estado){
            SessionSvc.estado=estado;
        },
        setUser:function(user){
            SessionSvc.user=user;
        },
        setPass:function(pass){
            SessionSvc.pass=pass;
        },
        setM:function(m){
            SessionSvc.m=m;
        },
        sessionStart:function(usr){
            $this=this;
            $this.setId(usr.usr_id);
            $this.setNombre(usr.usr_nombre);
            $this.setEstado(usr.usr_status);
            $this.setUser(null);
            $this.setPass(null);
            $this.setM(null);
        },
        sessionDestroy:function(){
            $this=this;
            $this.setM('logout');
            $http.post('mdl/login.php',$this.sessionInstance())
            .success(function(rta){
                if(rta==='true'){
                    $this.setId(null);
                    $this.setNombre(null);
                    $this.setEstado(null);
                    $this.setUser(null);
                    $this.setPass(null);
                    $this.setM(null);
                    $location.path('/login');
                }
            });
        },
        sessionStatus:function(promise){
            $this=this;
            $this.setM('userdata');
            $http.post('mdl/login.php',$this.sessionInstance())
            .success(function(json,status){
                if(status===200){
                    $this.setId(json.usr_id);
                    $this.setNombre(json.usr_nombre);
                    $this.setEstado(json.usr_status);
                    $this.setM(null);
                    promise();
                } else {
                    $this.sessionDestroy();
                }
            });
        },
        sessionInstance:function(){
            return SessionSvc;
        }
    }
});