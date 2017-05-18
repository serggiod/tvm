angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac){
    
    // Variables por defecto.
    $scope.formView = true;
    $scope.tvId     = $routeParams.tvId;
    
    // Definir un objeto diapositiva.
    var tvm = {
        width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

        model:null,
        init : function(){
            body = document.getElementById('body');
            body.style.overflow='hidden';
            body.style

            $http
                .post('mdl/mensajes.php',{m:'lanzarModel',tvId:$scope.tvId})
                .error(function(){ $location.path('/login'); })
                .success(function(json){
                    tvm.model = json;
                    tvm.imagesPlay()
                    tvm.audiosPlay()
                });
        },

        audiosPlay : function(){
            var file = tvm.model.audios.shift();
            var audio = document.getElementById('audio');
            audio.src = 'aud/' + file.src;
            audio.onended = function(){ tvm.audiosPlay(); };
            tvm.model.audios.push(file);
        },

        imagesPlay : function(){
            var stageBase = document.getElementById('stageBase');
            stageBase.style.position = 'absolute';
            stageBase.style.top = '0';
            stageBase.style.left = '0';
            stageBase.style.width = tvm.width + 'px';
            stageBase.style.height = tvm.height + 'px';
            stageBase.style.backgroundColor = tvm.model.backgroundColor;
            stageBase.style.border = '0';
            stageBase.style.margin = '0';
            stageBase.style.padding = '0';
            stageBase.style.overflow = 'hidden';

            console.log(tvm);
        }
    };

    tvm.init();

});
