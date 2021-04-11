import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SuperHero } from "./../../superhero";
import { SuperHeroService } from "./../../services/superhero.service";

@Component({
    selector: 'list-superhero',
    templateUrl: './list-superhero.component.html'
})

export class ListSuperHeroComponent implements OnInit {
     title: string = "List of super heroes";
     superHeroes$: SuperHero[];

    private value: string = null;

    constructor(public router: Router, private superHeroService: SuperHeroService) {}

    ngOnInit(): void {
        //this.superHeroes = this.superHeroService.getSuperHeroes();
        this.superHeroService.getSuperHeroes()
        .subscribe(superheroes => this.superHeroes$ = superheroes);
    }

    selectSuperHero(superHero: SuperHero) {
        console.log('cliked on ' + superHero.name);
        let link = [ '/superhero', superHero.id ];
        this.router.navigate(link);
    }

    onClick() {
        console.log('clicked');
    }
}