angular.module('application',['ngRoute','ngSanitize','colorpicker.module']);

/* RUTAS */
angular.module('application').config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'view/view.login.html',
        controller:'loginCtrl'
    })
    .when('/login',{
        templateUrl:'view/view.login.html',
        controller:'loginCtrl'
    })
    .when('/logout',{
        templateUrl:'view/view.logout.html',
        controller:'logoutCtrl'
    })
    .when('/password',{
        templateUrl:'view/view.password.html',
        controller:'passwordCtrl'
    })
    .when('/tv',{
        templateUrl:'view/view.tv_msg.html',
        controller:'TvMsgCtrl'
    })
    .when('/mensajes/:tvId',{
        templateUrl:'view/view.mensajes.html',
        controller:'mensajesCtrl'
    })
    .when('/audios/:tvId',{
        templateUrl:'view/view.audios.html',
        controller:'audiosCtrl'
    })
    .when('/lanzar/:tvId',{
        templateUrl:'view/view.lanzar.html',
        controller:'lanzarCtrl'
    })
    .when('/usuarios',{
        templateUrl:'view/view.usuarios.html',
        controller:'usuariosCtrl'
    })
    .when('/acerca',{
        templateUrl:'view/view.acerca.html',
        controller:'acercaCtrl'
    })
    .when('/manual',{
        templateUrl:'view/view.manual.html',
        controller:'manualCtrl'
    })
    .otherwise({redirectTo:'/login'});
});

