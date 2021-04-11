import { Component } from '@angular/core';

@Component({
	selector: 'page-404',
	template: `
    <div class='center'>
      <h1>Hey, Page not found !</h1>
      <a routerLink="/superhero/all">
        Back to where we know
      </a>
    </div>
  `
})
export class PageNotFoundComponent { }
