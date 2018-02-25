import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
    selector: "restaurantes-add",
    templateUrl: "app/view/restaurante-add.html",
    providers:[RestauranteService]
})

export class RestauranteEditComponent implements OnInit
{
  public titulo:string = "Editar Restaurante";
  public restaurante: Restaurante;
  public status:string;
  public errorMesagge:string;
  public filesToUpload: Array<File>;
  public resultUpload;
  constructor(private _restauranteService: RestauranteService,private _routerParams: RouteParams, private _router: Router){}

  onSubmit(){
    let id = this._routerParams.get('id');
    this._restauranteService.editRestaurante(id, this.restaurante)
    .subscribe(
      result => {
        this.status = result.status;
        if(this.status !== 'success'){
          alert("Error al editar el registro");
        } else {
          this._router.navigate(["Home"]);
        }
      },
      error => {
        this.errorMesagge = <any>error;
        if(this.errorMesagge !== null){
          console.log(this.errorMesagge);
          alert("Error en la peticion");
        }
      }
    );
  }

  getRestaurantesById(){
      let id = this._routerParams.get('id');
      this._restauranteService.getRestauranteById(id)
      .subscribe(
        result => {
          this.restaurante = result.data;
          this.status = result.status;
          if(this.status !== 'success'){
            this._router.navigate(["Home"]);
          }
        },
        error => {
          this.errorMesagge = <any>error;
          if(this.errorMesagge !== null){
            console.log(this.errorMesagge);
            alert("Error en la peticion");
          }
        }
      );
  }

  ngOnInit(){
    this.restaurante = new Restaurante(
      parseInt(this._routerParams.get('id')),
      this._routerParams.get('nombre'),
      this._routerParams.get('direccion'),
      this._routerParams.get('descripcion'),
      "vacio",
      this._routerParams.get('descripcion')
    );
    this.getRestaurantesById();
  }


  callPrecio(value){
		this.restaurante.precio = value;
	}

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.makeFileRequest("http://localhost/api-rest/restaurantes-api.php/upload-file", [], this.filesToUpload).then((result) => {
				this.resultUpload = result;
				this.restaurante.imagen = this.resultUpload.filename;
		}, (error) =>{
			console.log(error);
		});
	}

  /*Funcion para el envio de archivos*/
  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
				var formData: any = new FormData();
				var xhr = new XMLHttpRequest();
				for(var i = 0; i < files.length; i++){
					formData.append("uploads[]", files[i], files[i].name);
				}
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if(xhr.status == 200){
							resolve(JSON.parse(xhr.response));
						} else {
							reject(xhr.response);
						}
					}
				}
				xhr.open("POST", url, true);
				xhr.send(formData);
			});
	}

}
