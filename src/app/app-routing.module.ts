import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './superhero/notfound/page-not-found.component';

//const routes: Routes = [];
export const routes: Routes = [
	{ path: '', redirectTo: 'superhero/all', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
