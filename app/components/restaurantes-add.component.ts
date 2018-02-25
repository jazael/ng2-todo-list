import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
    selector: "restaurantes-add",
    templateUrl: "app/view/restaurante-add.html",
    providers:[RestauranteService]
})

export class RestauranteAddComponent implements OnInit
{
  public titulo:string = "Añadir Restaurante";
  public restaurante: Restaurante;
  public status:string;
  public errorMesagge:string;
  public filesToUpload: Array<File>;
  public resultUpload;
  constructor(private _restauranteService: RestauranteService,private _routerParams: RouteParams, private _router: Router){}

  onSubmit(){
    this._restauranteService.addRestaurante(this.restaurante)
        .subscribe(
          response => {
            this.status = response.status;
            if(this.status !== 'success'){
                alert("Error al insertar la pelicula");
            } else {
              this._router.navigate(["Home"]);
            }
          },
          error => {
            this.errorMesagge = <any>error;
            if(this.errorMesagge !== null){
              console.log(this.errorMesagge);
              alert("Error al insertar la pelicula");
            }
            }
        );

  }

  ngOnInit(){
    this.restaurante = new Restaurante(
      0,
      this._routerParams.get('nombre'),
      this._routerParams.get('direccion'),
      this._routerParams.get('descripcion'),
      null,
      "bajo"
    );
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
