angular.module('application').controller('lanzarCtrl',function($scope,$http,$location,$routeParams,SessionFac,Fullscreen){
    
    // Variables por defecto.
    $scope.tvId     = $routeParams.tvId;

    //if(!window.fullScreen) $location.path('/tv');
    
    // Definir un objeto diapositiva.
    var tvm = {
        width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

        model:null,
        init : function(){

            $http
                .post('mdl/mensajes.php',{m:'lanzarModel',tvId:$scope.tvId})
                .error(function(){ $location.path('/login'); })
                .success(function(json){
                    tvm.model = json;
                    tvm.imagesPlay();
                    tvm.audiosPlay();
                    tvm.consola.init();
                });

        },

        consola:{
            init : function(){
                var frontColor = '#a8b110';
                var backColor  = '#242a2a';

                var consola = document.getElementById('consola');
                consola.style.position = 'fixed';
                consola.style.left    = '30px';
                consola.style.right   = '30px';
                consola.style.bottom  = '50px';
                consola.style.height  = '20px';
                consola.style.backgroundColor = backColor;
                consola.style.zIndex  = '100';
                consola.style.borderRadius = '10px';

                var tv = document.createElement('div');
                tv.style.position   = 'absolute';
                tv.style.top        = '0';
                tv.style.left       = '20px';
                tv.style.color      = frontColor;
                tv.style.fontSize   = '10px';
                tv.style.fontWeight = 'bold';
                tv.style.margin     = '5px';
                tv.innerHTML = 'TV ' + tvm.model.monitor
                consola.appendChild(tv);

                stop = document.createElement('div');
                stop.style.position = 'absolute';
                stop.style.top      = '0';
                stop.style.left     = '70px';
                stop.style.width    = '10px';
                stop.style.height   = '10px';
                stop.style.margin   = '5px';
                stop.style.backgroundColor = frontColor;
                stop.onmouseover   = function(){ stop.style.cursor = 'pointer;'};
                stop.onmousedown   = function(){ tvm.stop(); }
                consola.appendChild(stop);

                pause = document.createElement('div');
                pause.style.position = 'absolute';
                pause.style.top      = '0';
                pause.style.left     = '90px';
                pause.style.width    = '10px';
                pause.style.height   = '10px';
                pause.style.margin   = '5px';
                pause.style.borderLeft  = '3px solid ' + frontColor;
                pause.style.borderRight = '3px solid ' + frontColor;
                pause.style.backgroundColor = backColor;
                pause.onmouseover   = function(){ pause.style.cursor = 'pointer;'};
                pause.onmousedown   = function(){ tvm.pause(); }
                consola.appendChild(pause);

                play = document.createElement('div');
                play.style.position = 'absolute';
                play.style.top      = '0';
                play.style.left     = '110px';
                play.style.width    = '0px';
                play.style.height   = '0px';
                play.style.margin   = '5px';
                play.style.borderTop    = '5px solid transparent';
                play.style.borderBottom = '5px solid transparent';
                play.style.borderLeft   = '5px solid ' + frontColor;
                play.onmouseover   = function(){ play.style.cursor = 'pointer;'};
                play.onmousedown   = function(){ tvm.play(); }
                consola.appendChild(play);

            }
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
            stageBase.style.position = 'fixed';
            stageBase.style.top = '0';
            stageBase.style.left = '0';
            stageBase.style.width = tvm.width + 'px';
            stageBase.style.height = tvm.height + 'px';
            stageBase.style.backgroundColor = tvm.model.backgroundColor;
            stageBase.style.border = '0';
            stageBase.style.margin = '0';
            stageBase.style.padding = '0';
            stageBase.style.overflow = 'hidden';
            stageBase.style.zIndex = '100';

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
            deslizador.id = 'deslizador';
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

            deslizador.onanimationiteration = function(){
                    if(!window.fullScreen) $location.path('/tv');
            };

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
                
                tvm.model.mensajes[i].textNode = tvm.model.mensajes[i].textNode.split('#');
                tvm.model.mensajes[i].textNode = tvm.model.mensajes[i].textNode.join('<br/>');
                txt.innerHTML = tvm.model.mensajes[i].textNode;

                deslizador.appendChild(div);
            }

        },

        stop: function(){
            var l = document.location || window.location;
            l.href = '#/tv';
            window.exitFullscreen();
        },
        pause: function(){
            var audio = document.getElementById('audio');
            audio.pause()

            var deslizador = document.getElementById('deslizador');
            deslizador.style.animationPlayState = 'paused';
            deslizador.style.mozAnimationPlayState = 'paused';
            deslizador.style.webkitanimationPlayState = 'paused';
            deslizador.style.msAnimationPlayState = 'paused';
            deslizador.style.oAnimationPlayState = 'paused';
        },
        play: function(){
            var audio = document.getElementById('audio');
            audio.play();

            var deslizador = document.getElementById('deslizador');
            deslizador.style.animationPlayState = 'running';
            deslizador.style.mozAnimationPlayState = 'running';
            deslizador.style.webkitanimationPlayState = 'running';
            deslizador.style.msAnimationPlayState = 'running';
            deslizador.style.oAnimationPlayState = 'running';
        }
    };

    tvm.init();

});
