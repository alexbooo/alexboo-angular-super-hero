import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailSuperHeroComponent } from "../views/detail/detail-superhero.component";
import { ListSuperHeroComponent } from "../views/list/list-superhero.component";
import { SuperHeroBorderDirective } from "../directives/superhero-border.directive";
import { SuperHeroPipe } from "../pipes/superhero.pipe";
import { SuperHeroPowerPipe } from "../pipes/superheropower.pipe";
import { SuperHeroRoutingModule } from "./superhero-routing.module";
import { SuperHeroService } from "../services/superhero.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { SuperHeroFormComponent } from "../superhero-form.component";
import { EditSuperHeroComponent } from "../views/edit/edit-superhero.component";
import { EditReactiveSuperHeroComponent } from "../views/edit-reactive/edit-reactive-superhero.component";
import { SearchSuperHeroComponent } from '../views/search-superhero.component';
import { AuthGuard } from '../../auth-guard.service';
import { RegexValidator } from '../validators/regex.validator';
// import { BoooComponent } from "../booo/booo.component";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SuperHeroRoutingModule
    ],
    declarations: [
        ListSuperHeroComponent, 
        DetailSuperHeroComponent, 
        EditSuperHeroComponent,
        SuperHeroFormComponent,
        EditReactiveSuperHeroComponent,
        SearchSuperHeroComponent,

        // BoooComponent,
        SuperHeroBorderDirective,
        SuperHeroPipe,
        SuperHeroPowerPipe
        
    ],
	providers: [ SuperHeroService, AuthGuard ]
})
export class SuperHeroesModule { }