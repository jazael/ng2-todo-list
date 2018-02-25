System.register(["angular2/core", "angular2/router", "../services/restaurante.service", "../model/restaurante"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, restaurante_service_1, restaurante_1;
    var RestauranteEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (restaurante_service_1_1) {
                restaurante_service_1 = restaurante_service_1_1;
            },
            function (restaurante_1_1) {
                restaurante_1 = restaurante_1_1;
            }],
        execute: function() {
            RestauranteEditComponent = (function () {
                function RestauranteEditComponent(_restauranteService, _routerParams, _router) {
                    this._restauranteService = _restauranteService;
                    this._routerParams = _routerParams;
                    this._router = _router;
                    this.titulo = "Editar Restaurante";
                }
                RestauranteEditComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var id = this._routerParams.get('id');
                    this._restauranteService.editRestaurante(id, this.restaurante)
                        .subscribe(function (result) {
                        _this.status = result.status;
                        if (_this.status !== 'success') {
                            alert("Error al editar el registro");
                        }
                        else {
                            _this._router.navigate(["Home"]);
                        }
                    }, function (error) {
                        _this.errorMesagge = error;
                        if (_this.errorMesagge !== null) {
                            console.log(_this.errorMesagge);
                            alert("Error en la peticion");
                        }
                    });
                };
                RestauranteEditComponent.prototype.getRestaurantesById = function () {
                    var _this = this;
                    var id = this._routerParams.get('id');
                    this._restauranteService.getRestauranteById(id)
                        .subscribe(function (result) {
                        _this.restaurante = result.data;
                        _this.status = result.status;
                        if (_this.status !== 'success') {
                            _this._router.navigate(["Home"]);
                        }
                    }, function (error) {
                        _this.errorMesagge = error;
                        if (_this.errorMesagge !== null) {
                            console.log(_this.errorMesagge);
                            alert("Error en la peticion");
                        }
                    });
                };
                RestauranteEditComponent.prototype.ngOnInit = function () {
                    this.restaurante = new restaurante_1.Restaurante(parseInt(this._routerParams.get('id')), this._routerParams.get('nombre'), this._routerParams.get('direccion'), this._routerParams.get('descripcion'), "vacio", this._routerParams.get('descripcion'));
                    this.getRestaurantesById();
                };
                RestauranteEditComponent.prototype.callPrecio = function (value) {
                    this.restaurante.precio = value;
                };
                RestauranteEditComponent.prototype.fileChangeEvent = function (fileInput) {
                    var _this = this;
                    this.filesToUpload = fileInput.target.files;
                    this.makeFileRequest("http://localhost/api-rest/restaurantes-api.php/upload-file", [], this.filesToUpload).then(function (result) {
                        _this.resultUpload = result;
                        _this.restaurante.imagen = _this.resultUpload.filename;
                    }, function (error) {
                        console.log(error);
                    });
                };
                /*Funcion para el envio de archivos*/
                RestauranteEditComponent.prototype.makeFileRequest = function (url, params, files) {
                    return new Promise(function (resolve, reject) {
                        var formData = new FormData();
                        var xhr = new XMLHttpRequest();
                        for (var i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i].name);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.response));
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.open("POST", url, true);
                        xhr.send(formData);
                    });
                };
                RestauranteEditComponent = __decorate([
                    core_1.Component({
                        selector: "restaurantes-add",
                        templateUrl: "app/view/restaurante-add.html",
                        providers: [restaurante_service_1.RestauranteService]
                    }), 
                    __metadata('design:paramtypes', [restaurante_service_1.RestauranteService, router_1.RouteParams, router_1.Router])
                ], RestauranteEditComponent);
                return RestauranteEditComponent;
            }());
            exports_1("RestauranteEditComponent", RestauranteEditComponent);
        }
    }
});
//# sourceMappingURL=restaurantes-edit.component.js.map