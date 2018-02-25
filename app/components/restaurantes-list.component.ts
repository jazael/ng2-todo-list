import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {Restaurante} from "../model/restaurante";
import {RestauranteService} from "../services/restaurante.service";


@Component({
    selector: "my-list-restaurant",
    templateUrl: "app/view/restaurantes-list.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [RestauranteService]
})

export class RestaurantesListComponent implements OnInit
{
  public titulo:string = "LISTA DE PLATOS DON JAZAELITO";
  public restaurantes: Restaurante[];
  public status:string;
  public errorMesagge:string;
	public confirmado;

  constructor(private _restauranteService: RestauranteService){
    this._restauranteService.getRestaurante();
  }

  /*Carga de la funcion desde el contralador*/
  ngOnInit(){
    this.getRestaurantes();
    //console.log("Cargado correctamente");
  }

  /*Lista de Restaurantes*/
  getRestaurantes(){
    let box_restaurante = <HTMLElement>document.querySelector("#restaurantes-list .loading");
    box_restaurante.style.visibility = "visible";

    this._restauranteService.getRestaurante()
    .subscribe(
      result => {
        this.restaurantes = result.data;
        this.status = result.status;
        if(this.status !== 'success'){
          alert("Error en el servidor");
        } else {
          box_restaurante.style.display = "none";
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

  onBorrarConfirm(id){
		this.confirmado = id;
	}

	onCancelarConfirm(id){
		this.confirmado = null;
	}

  onBorrarRestaurante(id){
			this._restauranteService.deleteRestaurante(id)
						.subscribe(
							result => {
									this.status = result.status;

									if(this.status !== "success"){
										alert("Error en el servidor");
									}
									this.getRestaurantes();

							},
							error => {
								this.errorMesagge = <any>error;

								if(this.errorMesagge !== null){
									console.log(this.errorMesagge);
									alert("Error en la petición");
								}
							}
						);
	}

}
