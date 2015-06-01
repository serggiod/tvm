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
            $this.setId(usr.id);
            $this.setNombre(usr.nombre);
            $this.setEstado(usr.estado);
            $this.setUser(null);
            $this.setPass(null);
            $this.setM(null);
        },
        sessionDestroy:function(){
            $this=this;
            $http.post('mdl/login.php',{m:'logout'})
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
            if($this.getEstado()){
                promise();
            } else {
                $http.post('mdl/login.php',{m:'status'})
                .success(function(rta){
                    if(rta==='true'){
                        $http.post('mdl/login.php',{m:'userdata'})
                        .success(function(json){
                            $this.setId(json.id);
                            $this.setNombre(json.nombre);
                            $this.setEstado(true);
                            $this.setUser(null);
                            $this.setPass(null);
                            $this.setM(null);
                            promise();
                        });
                    } else {
                        $this.sessionDestroy();
                    }
                });
            }
        },
        sessionInstance:function(){
            return SessionSvc;
        }
    }
});