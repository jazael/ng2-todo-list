import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestaurantesListComponent} from "./components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./components/restaurantes-detail.component";
import {RestauranteAddComponent} from "./components/restaurantes-add.component";
import {RestauranteEditComponent} from "./components/restaurantes-edit.component";

@Component({
    selector: "my-app",
    templateUrl: "app/view/home.html",
    directives: [RestaurantesListComponent, RestauranteDetailComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/', name: "Home", component: RestaurantesListComponent, useAsDefault: true},
  {path: '/restaurante/:id', name: "Restaurante", component: RestauranteDetailComponent},
  {path: '/crear-restaurante/', name: "CrearRestaurante", component: RestauranteAddComponent},
  {path: '/restaurante-edit/:id', name: "RestauranteEdit", component: RestauranteEditComponent},
  {path: '/donde-como-hoy/:random', name: "DondeComoHoy", component: RestauranteDetailComponent}
])

export class AppComponent
{
  public titulo:string = "RESTAURANTES DON JAZAELITO";
}
