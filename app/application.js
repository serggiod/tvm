angular.module('application',['ngRoute','ngSanitize','ngColorPicker','ngMask']);

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
    .when('/usuarios',{
        templateUrl:'view/view.usuarios.html',
        controller:'usuariosCtrl'
    })
    .otherwise({redirectTo:'/login'});
});

