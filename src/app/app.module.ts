import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooooComponent } from './booo/booo.component';
import { GneComponent } from './gne/gne.component';
import { SuperHeroService } from './superhero/services/superhero.service';
import { SuperHeroesModule } from './superhero/modules/superhero.module';
import { SuperHeroRoutingModule } from './superhero/modules/superhero-routing.module';
import { PageNotFoundComponent } from './superhero/notfound/page-not-found.component';
import { SuperHeroComponent } from './superhero/superhero.component';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './superhero/in-memory.data';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './gne/modal.component';
import { Modal2Component } from './gne/modal2.component';

@NgModule({
  declarations: [
    AppComponent,
    BooooComponent,
    GneComponent,
    ModalComponent,
    Modal2Component,
    SuperHeroComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
		SuperHeroesModule,
    SuperHeroRoutingModule,
    AppRoutingModule
    
  ],
  providers: [SuperHeroService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
