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
            body.style.margin = '0';
            body.style.padding = '0';
            body.style.padding = '0';
            body.style.overflow='hidden';

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

            // Contenedor base.
            var stageBase = document.getElementById('stageBase');
            stageBase.style.position = 'relative';
            stageBase.style.top = '0';
            stageBase.style.left = '0';
            stageBase.style.width = tvm.width + 'px';
            stageBase.style.height = tvm.height + 'px';
            stageBase.style.backgroundColor = tvm.model.backgroundColor;
            stageBase.style.border = '0';
            stageBase.style.margin = '0';
            stageBase.style.padding = '0';
            stageBase.style.overflow = 'hidden';

            // Animacion.
            var direction = tvm.model.direction
                .replace('ARRIBA','top')
                .replace('ABAJO','bottom')
                .replace('DERECHA','right')
                .replace('IZQUIERDA','left');

            var iniPosition = '';
            var endPosition = '';
            var timeAnimation = eval('(' + tvm.model.time
                .replace(':',' *60 *60) + (')
                .replace(':',' *60) + '));

            if(direction === 'top'){
                iniPosition = '0';
                endPosition = '-' + (tvm.height * (tvm.model.mensajes.length -1)).toString();
            }
            if(direction === 'bottom'){
                iniPosition = (tvm.height * (tvm.model.mensajes.length -1)).toString();
                endPosition = '0';
            }
            if(direction === 'left'){
                iniPosition = '-' + (tvm.width * (tvm.model.mensajes.length -1).toString());
                endPosition = '0';
            }
            if(direction === 'right'){
                iniPosition = '0';
                endPosition = (tvm.width * (tvm.model.mensajes.length -1)).toString();
            }

            var style = document.createElement('style');
            var css = '';
            css += '@-webkit-keyframes tvmAnimation { \n';
            css += '    0% {' + direction + ': ' + iniPosition + 'px;} \n';
            css += '    100% {' + direction + ': ' + endPosition + 'px;} \n';
            css += '} \n';
            css += '@-moz-keyframes tvmAnimation { \n';
            css += '    0% {' + direction + ': ' + iniPosition + 'px;} \n';
            css += '    100% {' + direction + ': ' + endPosition + 'px;} \n';
            css += '} \n';
            css += '@-ms-keyframes tvmAnimation { \n';
            css += '    0% {' + direction + ': ' + iniPosition + 'px;} \n';
            css += '    100% {' + direction + ': ' + endPosition + 'px;} \n';
            css += '} \n';
            css += '@-o-keyframes tvmAnimation { \n';
            css += '    0% {' + direction + ': ' + iniPosition + 'px;} \n';
            css += '    100% {' + direction + ': ' + endPosition + 'px;} \n';
            css += '} \n';
            css += '@keyframes tvmAnimation { \n';
            css += '    0% {' + direction + ': ' + iniPosition + 'px;} \n';
            css += '    100% {' + direction + ': ' + endPosition + 'px;} \n';
            css += '} \n';
            css += '\n';
            css += '.tvmAnimationRun { \n';
            css += '    -webkit-animation: ' + timeAnimation + 's tvmAnimation infinite; \n';
            css += '    -moz-animation: ' + timeAnimation + 's tvmAnimation infinite; \n';
            css += '    -ms-animation: ' + timeAnimation + 's tvmAnimation infinite; \n';
            css += '    -o-animation: ' + timeAnimation + 's tvmAnimation infinite; \n';
            css += '    animation: ' + timeAnimation + 's tvmAnimation infinite; \n';
            css += '} \n';
            style.innerHTML = css;
            
            // Iniciar deslizador.
            var deslizador = document.createElement('div');
            deslizador.className = 'tvmAnimationRun';
            deslizador.style.position = 'relative';

            if(direction === 'top'  || direction === 'bottom'){
                deslizador.style.width  = tvm.width + 'px';
                deslizador.style.height = tvm.height * tvm.model.mensajes.length + 'px';
            }
            if(direction === 'left' || direction === 'right'){
                deslizador.style.width  = tvm.width * tvm.model.mensajes.length + 'px';
                deslizador.style.heigth = tvm.height + 'px';
            }

            stageBase.appendChild(style);
            stageBase.appendChild(deslizador);        
            
            // Mensajes.
            for(var i = 0; i < tvm.model.mensajes.length; i++){
                var div = document.createElement('div');
                div.style.display = 'table';
                div.style.width = tvm.width + 'px';
                div.style.height = tvm.height + 'px';
                div.style.backgroundColor = tvm.model.mensajes[i].color;
                div.style.backgroundImage = 'url(\'bck/' + tvm.model.mensajes[i].backgroundImage + '\')';
                div.style.backgroundSize  = '100% 100%';
                div.style.textAlign = 'center';
                
                div.style.cssFloat = 'left';
                div.style.overflow = 'hidden';

                var style = document.createElement('style');
                var font = '@font-face{';
                font += 'font-family:\'' + tvm.model.mensajes[i].fontFamily + '\'; ';
                font += 'src: url(\'fnt/' + tvm.model.mensajes[i].fontFamily + '\'); '
                font += '}';
                style.innerHTML = font;
                div.appendChild(style);

                var txt = document.createElement('div');
                div.appendChild(txt);
                txt.style.display = 'table-cell';
                txt.style.width = '100%%';
                txt.style.height = '100%';
                txt.style.color = tvm.model.mensajes[i].color;
                txt.style.fontFamily = "'" + tvm.model.mensajes[i].fontFamily + "'";
                txt.style.fontSize = tvm.model.mensajes[i].fontSize + 'px';
                txt.style.verticalAlign = 'middle';
                txt.innerHTML = tvm.model.mensajes[i].textNode;

                deslizador.appendChild(div);
            }

        }
    };

    tvm.init();

});
