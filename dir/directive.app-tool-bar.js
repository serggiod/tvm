angular.module('application').directive('appToolBar',function(){
    return {
        restrict:'E',
        template:function(el,at){
            tb  = '';
            tb += '';
            if(at.new==='true') { tb += '';}
            if(at.view==='true'){ tb += '<li><a ng-click="visualizar()"><img src="img/grid/visualizar.png" border="0"/>Visualizar</li>';}
            if(at.edit==='true'){ tb += '<li><a ng-click="modificar()"><img src="img/grid/modificar.png" border="0"/>Modificar</li>';}
            if(at.delete==='true') { tb += '<li><a ng-click="eliminar()"><img src="img/grid/eliminar.png" border="0"/>Eliminar</li>';}
            if(at.status==='true') { tb += '<li><a ng-click="changeStatus()"><img src="img/grid/estado.png" border="0"/>Estado</li>';}
            tb += '</ul>';
            
            if(at.pag==='true'){
                tb += '<ul class="nav navbar-nav">';
                tb += '<li><a ng-click="primero()"><img src="img/grid/primero.png" border="0"/></a></li>';
                tb += '<li><a ng-click="anterior()"><img src="img/grid/anterior.png" border="0"/></a></li>';
                tb += '<li><a>{{position}}</a></li>';
                tb += '<li><a ng-click="siguiente()"><img src="img/grid/siguiente.png" border="0"/></a></li>';
                tb += '<li><a ng-click="ultimo()"><img src="img/grid/ultimo.png" border="0"/></a></li>';
                tb += '</ul>';
            }
            
            if(at.filter==='true'){
                tb += '<ul class="nav navbar-nav">';
                tb += '<li><input ng-model="keyword" type="text" class="form-control" style="width:80px;margin-top:8px;" placeholder="Buscar..."></li>'
                tb += '<li>';
                tb += '<select class="form-control" style="width:80px;margin-top:8px;">';
                tb += '<option value="en">en...</option>';
                tb += '<option ng-repeat="option in options" value="{{option}}">{{option}}</option>';
                tb += '</select>';
                tb += '</li>';
                tb += '<li><a ng-click="filtrar()"><img src="img/grid/filtrar.png" border="0"/>Filtrar</a></li>';
                tb += '<li><a ng-click="nofiltrar()"><img src="img/grid/nofiltrar.png" border="0"/>No Filtrar</a></li>';
                tb += '</ul>';
            }

            tb += '</div>';
            return tb;
        }
    }
});