angular.module('application').directive('appFormLogin',function(){
    return {
        restrict:'E',
        template:function(){
            html  = '<div class="panel panel-info">';
            html += '<div class="panel-heading"><h1>{{title}}</h1></div>';
            html += '<div class="panel-body">';
            html += '<div ng-bind-html="alert"></div>';
            html += '<input class="form-control" ng-model="user" type="text" maxlength="10" placeholder="Usuario" required autofocus/><br />';
            html += '<input class="form-control" ng-model="pass" type="password" maxlength="10" placeholder="Password" required/><br />';
            html += '<button class="btn btn-info btn-block" ng-click="login()">Ingresar</button>';
            html += '</div></div>';
            return html;
        }
    }
});
