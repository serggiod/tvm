angular.module('application').directive('appGridBarTvmsg',function(){
    return {
        restrict:'E',
        template:function(element,attr){
            gb  = '<table class="table table-bordered table-striped">';
            gb += '<tr>';
            gb += '<td>TV</td>';
            gb += '<td>FONDO</td>';
            gb += '<td>DIRECCION</td>';
            gb += '<td>TIEMPO</td>';
            gb += '<td>ACCIONES</td>';
            gb += '</tr>';
            gb += '<tr ng-repeat="register in registers" ng-click="setId(row.id,row.nombre);">';
            gb += '<td>{{register.tv}}</td>';
            gb += '<td style="background-color:{{register.backcolor}};"> </td>';
            gb += '<td>{{register.playdirection}}</td>';
            gb += '<td>{{register.playtime}}</td>';
            gb += '<td>';
            gb += '<button class="btn btn-info btn-xs" ng-click="visualizar()"><img src="img/grid/visualizar.png"/></button>';
            gb += '<button class="btn btn-info btn-xs" ng-click="modificar()"><img src="img/grid/modificar.png"/></button>';
            gb += '|';
            gb += '<button class="btn btn-danger btn-xs"  ng-click="eliminar()"><img src="img/grid/eliminar.png"/></button>';
            gb += '<button class="btn btn-success btn-xs" ng-click="set(register.id,register.tv)"><img src="img/grid/select.png"/></button>';
            gb += '</td>';
            gb += '</tr>';
            gb += '</table>';
            return gb;
        }
    }
});