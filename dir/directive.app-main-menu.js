angular.module('application').directive('appMainMenu',function(MainMenuSvc){
    return {
        restrict:'E',
        template: function(elm,atr){
            html  = '<div class="navbar navbar-default" role="navigation" bs-navbar>';
            html += '<a class="navbar-brand"> '+atr.appname+' | '+atr.username+' </a>';
            html += '<ul class="nav navbar-nav">';
            
            MainMenuSvc.forEach(function(node){
                html += '<li class="dropdown">';
                html += '<a class="dropdown-toggle" data-toggle="dropdown" bs-dropdown="menuarchivo">'+node.name+' <b class="caret"></b></a>';
                if(node.items.length){
                    html += '<ul class="dropdown-menu">';
                    node.items.forEach(function(item){
                        html += '<li><a href="'+item.href+'">'+item.text+'</a></li>';
                    });
                    html += '</ul>';
                }
                html += '</li>';    
            });

            html += '</ul>';
            html += '</div>';
            return html;
        }
    }
});