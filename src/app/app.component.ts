import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  template: '<h1>hello {{name}}</h1><app-booo></app-booo><app-gne></app-gne><superhero-app></superhero-app>'
})
export class AppComponent implements OnInit {
  title = 'booo';
  name = 'super hero';

  constructor(private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
