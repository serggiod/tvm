angular.module('application').directive('appGridBar',function(){
    return {
        restrict:'E',
        template:function(element,attr){
            headers=attr.headers.split(',');
            registers=attr.registers.split(',');
            header='';
            register='';
            headers.forEach(function(head){
                header += '<td>'+head+'</td>';
            });
            registers.forEach(function(reg){
                register  += '<td>{{register.'+reg+'}}</td>';
            });  
            gb  = '<table class="table table-bordered table-striped">';
            gb += '<tr>';
            gb += header;
            gb += '</tr>';
            gb += '';
            gb += register;
            gb += '</tr>';
            gb += '</table>';
            return gb;
        }
    }
});