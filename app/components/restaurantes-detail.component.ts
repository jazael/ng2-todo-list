import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
    selector: "restaurantes-list",
    templateUrl: "app/view/restaurante-detail.html",
    providers:[RestauranteService]
})

export class RestauranteDetailComponent implements OnInit
{
  public parametro;
  public restaurante: Restaurante[];
  public status:string;
  public errorMesagge:string;
  constructor(private _restauranteService: RestauranteService,private _routerParams: RouteParams, private _router: Router){}

  ngOnInit(){
    this.getRestaurantesById();
  }

  getRestaurantesById(){
      let id = this._routerParams.get('id');
      let random = this._routerParams.get('random');
      this._restauranteService.getRestauranteById(id,random)
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

}
