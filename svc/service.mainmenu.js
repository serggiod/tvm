angular.module('application').service('MainMenuSvc',function(){
    return [
        {
            name:'Archivo',
            items:[
                {text:'Cambiar el password',href:'#/password'},
                {text:'Salir del sistema',href:'#/logout'}
            ]
        },
        {
            name:'Herramientas',
            items:[
                {text:'Administrar Tv',href:'#/tv'},
                {text:'Administrar Usuarios',href:'#/usuarios'}
            ]
        },
        {
            name:'Acerca de ...',
            items:[
                {text:'Acerca de ...',href:'#/acerca'},
                {text:'Manual de Usuario',href:'#/manual'}
            ]
        }
    ]
});