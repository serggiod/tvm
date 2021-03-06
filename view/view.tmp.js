<div ng-show="formView">
    <app-main-menu appname="{{appname}}" username="{{username}}"></app-main-menu>
    
    <!-- Formulario: Tabla de mensajes -->
    <div class="panel panel-info" ng-show="formGrid">
        <div class="panel-heading">
            <h4>Administrar Tv-Mensajes <small>Lista de mensajes</small></h4>
        </div>
        <div class="panel-body">
            
            <!-- Boton nuevo. -->
            <button type="button" class="btn btn-primary btn-sm" ng-click="Nuevo()">
                <img src="img/grid/nuevo.png" border="0"/>
                Nuevo
            </button>

            <!-- Tabla de Mensajes -->
            <table class="table table-bordered table-striped" ng-show="formShow">
                <tr>
                    <td>TV</td>
                    <td>FONDO</td>
                    <td>DIRECCION</td>
                    <td>TIEMMPO</td>
                    <td>ACCIONES</td>
                </tr>
                <tr ng-repeat="mensaje in mensajes">
                    <td>{{mensaje.tv}}</td>
                    <td style="background-color:{{mensaje.backcolor}};"></td>
                    <td>{{mensaje.playdirection}}</td>
                    <td>{{mensaje.playtime}}</td>
                    <td>
                        <img src="img/grid/visualizar.png" class="btn btn-info btn-xs" ng-click="visualizar(mensaje.id);">    
                        <img src="img/grid/modificar.png" class="btn btn-info btn-xs" ng-click="modificar(mensaje.id);">    
                        <img src="img/grid/eliminar.png" class="btn btn-danger btn-xs" ng-click="eliminar(mensaje.id);">
                        <img src="img/grid/lanzar.png" class="btn btn-success btn-xs" ng-click="lanzar(mensaje.id);">    
                    </td>
                </tr>
            </table>
        </div>
    </div>            
    
    <!-- Formulario: Nuevo. -->
    <div class="panel panel-info" ng-show="formNuevo">
        <div class="panel-heading">
            <h4>Administrar Tv-Mensajes <small>Nuevo Mensaje </small></h4>
        </div>
        <div class="panel-body">
            <!-- FORMS -->
            <div ng-hide="formShow">
                <!-- Formulario de mensajes -->
                <h4>Lista de Mensajes</h4>
                <div class="form form-inline">
                    <label class="form-control height70">Mensaje:<br/>
                        <input type="text" ng-model="txt_msg" class="form-control" ng-readonly="readonly">
                    </label>
                    <label class="form-control height70">Color del Texto:<br/>
                        <ng-color-picker selected="txt_front_color" ng-disabled="disabled"></ng-color-picker>
                    </label>
                    <label class="form-control height70">Imagen de Fondo:<br/>
                        <select ng-model="txt_back_image" class="form-control" ng-disabled="disabled">
                            <option ng-repeat="image in imageFilesList" value="{{image}}">{{image}}</option>
                        </select>
                        <input type="button" value="-" class="btn btn-default" ng-click="imageFilesDel()" ng-disabled="disabled">
                        <input type="button" value="+" class="btn btn-default" ng-click="imageFilesUp()"  ng-disabled="disabled">
                    </label>
                    <label class="form-control height70">Fuente:<br/>
                        <select ng-model="txt_font_family" class="form-control" ng-disabled="disabled">
                            <option ng-repeat="font in fontFilesList" value="{{font}}">{{font}}</option>
                        </select>
                        <input type="button" value="-" class="btn btn-default" ng-click="fontFilesDel()" ng-disabled="disabled">
                        <input type="button" value="+" class="btn btn-default" ng-click="fontFilesUp()"  ng-disabled="disabled">
                    </label>
                    <label class="form-control height70">Tama&ntilde;o:<br/>
                        <select ng-model="txt_font_size" class="form-control" ng-disabled="disabled">
                            <option ng-repeat="size in fontSizesList" value="{{size}}">{{size}}</option>
                        </select>
                    </label>
                    <label class="form-control height70">Acci&oacute;n:<br/>
                        <input type="button" class="btn btn-success" value="Guardar" ng-click="msgInListInsert()" ng-disabled="disabled"/>
                    </label>
                </div>
                <table class="table table-bordered table-striped">
                    <tr>
                        <td>TEXTO</td>
                        <td>COLOR</td>
                        <td>IMAGEN</td>
                        <td>FUENTE</td>
                        <td>TAMAÑO</td>
                        <td>ESTADO</td>
                        <td>ACCIONES</td>
                    </tr>
                    <tr ng-repeat="msg in msgInList">
                        <td>{{msg.txt_msg}}</td>
                        <td style="background-color:{{msg.txt_front_color}};"></td>
                        <td><img src="bak/{{msg.txt_back_image}}" height="50px"/></td>
                        <td>{{msg.txt_font_family}}</td>
                        <td>{{msg.txt_font_size}}</td>
                        <td>{{msg.estado}}</td>
                        <td>
                            <img src="img/grid/up.png" class="btn btn-info btn-xs" ng-click="msgInListUpOrDown(msg.txt_id,'up',msg.orden);" ng-disabled="disabled">    
                            <img src="img/grid/down.png"  class="btn btn-info btn-xs" ng-click="msgInListUpOrDown(msg.txt_id,'down',msg.orden);" ng-disabled="disabled">    
                            <img src="img/grid/estado.png" class="btn btn-info btn-xs" ng-click="msgInListEstado(msg.txt_id,msg.estado);" ng-disabled="disabled">
                            <img src="img/grid/eliminar.png" class="btn btn-danger btn-xs" ng-click="msgInListDelete(msg.txt_id);" ng-disabled="disabled">
                        </td>
                    </tr>
                </table>

                <hr class="height5"/>
                
                <!-- Formulario de audios -->
                <h4>Lista de Audios</h4>
                <div class="form form-inline">
                    <label class="form-control height70">Audios disponibles:<br/>
                        <select class="form-control" ng-model="aud_file" ng-disabled="disabled">
                            <option ng-repeat="audio in audios" value="{{audio}}">{{audio}}</option>
                        </select>
                        <input type="button" class="btn btn-default" value="-" ng-click="deleteAudioFile()" ng-disabled="disabled">
                        <input type="button" class="btn btn-default" value="+" ng-click="uploadAudioFile()" ng-disabled="disabled">
                    </label>
                    <label class="form-control height70">Acci&oacute;n:<br/>
                        <input type="button" class="btn btn-success" value="Guardar" ng-click="insertAudioInList()" ng-disabled="disabled">
                    </label>
                </div>
                <table class="table table-bordered table-striped">
                    <tr>
                        <td>ARCHIVO</td>
                        <td>ESTADO</td>
                        <td>ACCIONES</td>
                    </tr>
                    <tr ng-repeat="audio in audioInList">
                        <td>{{audio.aud_file}}</td>
                        <td>{{audio.estado}}</td>
                        <td>
                            <img src="img/grid/up.png" class="btn btn-info btn-xs" ng-click="upordownAudioInList(audio.aud_id,'up',audio.orden);" ng-disabled="disabled">    
                            <img src="img/grid/down.png"  class="btn btn-info btn-xs" ng-click="upordownAudioInList(audio.aud_id,'down',audio.orden);" ng-disabled="disabled">    
                            <img src="img/grid/estado.png" class="btn btn-info btn-xs" ng-click="estadoAudioInList(audio.aud_id,audio.estado);" ng-disabled="disabled">
                            <img src="img/grid/eliminar.png" class="btn btn-danger btn-xs" ng-click="eliminarAudioInList(audio.aud_id);" ng-disabled="disabled">
                        </td>
                    </tr>
                </table>
                
                <hr class="height5"/>

                <h4>Datos Finales</h4>
                <!-- Formulario: Tv Mensajes. -->
                <div class="form form-inline">
                    <label class="form-control height70">Color de Fondo:<br/>
                    <ng-color-picker selected="backcolor" ng-disabled="disabled"></ng-color-picker></label>
                    <label class="form-control height70">Duraci&oacute;n:<br/>
                        <div  class="input-group">
                            <input type="number" class="form-control" style="width:60px;" placeholder="0" ng-model="playhours" ng-readonly="readonly" min="0" max="23" step="1"/>
                            <span class="input-group-addon">:</span>
                            <input type="number" class="form-control" style="width:60px;" placeholder="0" ng-model="playmin" ng-readonly="readonly" min="0" max="59" step="1"/>
                            <span class="input-group-addon">:</span>
                            <input type="number" class="form-control" style="width:60px;" placeholder="0" ng-model="playsec" ng-readonly="readonly" min="0" max="59" step="1"/>
                        </div>
                    </label>
                    <label class="form-control height70">Direcci&oacute;n:<br/>
                    <select class="form-control" ng-model="playdirection" ng-disabled="disabled">
                        <option value="ARRIBA">ARRIBA</option>
                        <option value="ABAJO">ABAJO</option>
                        <option value="DERECHA">DERECHA</option>
                        <option value="IZQUIERDA">IZQUIERDA</option>
                    </select></label>
                    <br/><br/>
                    <input type="button" class="btn btn-danger " ng-click="nuevoCancel()"      ng-show="nuevoCancelShow"  value="Cancelar"/>
                    <input type="button" class="btn btn-success" ng-click="nuevoAcept()"       ng-show="nuevoAceptShow"   value="Aceptar"/>
                    <input type="button" class="btn btn-primary" ng-click="visualizarAcept()"  ng-show="visualizarAceptShow"   value="Cerrar"/>
                    <input type="button" class="btn btn-danger " ng-click="modificarCancel()"  ng-show="modificarCancelShow" value="Cancelar"/>
                    <input type="button" class="btn btn-success" ng-click="modificarAcept()"   ng-show="modificarAceptShow"  value="Aceptar"/>
                </div>
            </div>
        </div>
    </div>
</div>