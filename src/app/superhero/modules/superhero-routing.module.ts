import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailSuperHeroComponent } from '../views/detail/detail-superhero.component';
import { EditReactiveSuperHeroComponent } from "../views/edit-reactive/edit-reactive-superhero.component";
import { EditSuperHeroComponent } from "./../views/edit/edit-superhero.component";
import { ListSuperHeroComponent } from "../views/list/list-superhero.component";
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
    { 
        path: 'superhero',
        canActivate: [ AuthGuard ],
        children : [
            { path: 'all', component: ListSuperHeroComponent },
            // { path: 'superhero/modify/:id', component: EditReactiveSuperHeroComponent, canActivate: [AuthGuard] },
            { path: 'edit/:id', component: EditSuperHeroComponent, canActivate: [AuthGuard] },
            { path: ':id', component: DetailSuperHeroComponent }        
        ]
    },
    { path: 'superheroes', component: ListSuperHeroComponent },
    { path: 'superhero/modify/:id', component: EditReactiveSuperHeroComponent, canActivate: [AuthGuard] }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuperHeroRoutingModule { }