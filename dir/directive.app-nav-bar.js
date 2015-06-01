/* DIRECTIVAS */
angular.module('application').directive('appNavBar',function(){
    return {
        restrict:'E',
        template:function(){
            return '<div class="navbar navbar-default navbar-fixed-top">'
            +'<a class="navbar-brand" href="#/tv">WEB APPLICATION | Tv Mensajes</a>'
            +'<ul class="nav navbar-nav">'
            +'<li class="separator"></li>'
            +'<li><a href="#/tv" class="nav-bar">Tv</a></li>'
            +'<li><a href="#/usuarios">Usuarios</a></li>'
            +'</ul>'
            +'</div>';
        }        
    }
});

