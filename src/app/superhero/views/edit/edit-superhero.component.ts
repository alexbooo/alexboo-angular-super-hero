import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SuperHeroService } from "./../../services/superhero.service";
import { SuperHero } from "./../../superhero";

@Component ({
    selector: 'edit-superhero',
    templateUrl: './edit-superhero.component.html'
})

export class EditSuperHeroComponent implements OnInit {
    superHero: SuperHero = null;
    
    constructor(private route: ActivatedRoute, private superHeroService: SuperHeroService) { }

    ngOnInit(): void {
        let id = +this.route.snapshot.params['id'];
        // this.superHero = this.superHeroService.getSuperHero(id);
        this.superHeroService.getSuperHero(id)
        .subscribe(superHero => this.superHero = superHero);
    }
}