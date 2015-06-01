angular.module('application').directive('appGridBarUsuarios',function(){
    return {
        restrict:'E',
        template:function(element,attr){
            gb  = '<table class="table table-bordered table-striped">';
            gb += '<tr>';
            gb += '<td>NOMBRE</td>';
            gb += '<td>LOGIN</td>';
            gb += '<td>ESTADO</td>';
            gb += '<td>ACCIONES</td>';
            gb += '</tr>';
            gb += '<tr ng-repeat="register in registers" ng-click="setId(row.id,row.nombre);">';
            gb += '<td>{{register.nombre}}</td>';
            gb += '<td>{{register.login}}</td>';
            gb += '<td>{{register.estado}}</td>';
            gb += '<td>';
            gb += '<button class="btn btn-info btn-xs" ng-click="visualizar()"><img src="img/grid/visualizar.png"/></button>';
            gb += '<button class="btn btn-info btn-xs" ng-click="modificar()"><img src="img/grid/modificar.png"/></button>';
            gb += '<button class="btn btn-info btn-xs" ng-click="changeStatus()"><img src="img/grid/estado.png"/></button>';
            gb += '|';
            gb += '<button class="btn btn-danger btn-xs"  ng-click="eliminar()"><img src="img/grid/eliminar.png"/></button>';
            gb += '<button class="btn btn-success btn-xs" ng-click="set(register.id,register.nombre)"><img src="img/grid/select.png"/></button>';
            gb += '</td>';
            gb += '</tr>';
            gb += '</table>';
            return gb;
        }
    }
});