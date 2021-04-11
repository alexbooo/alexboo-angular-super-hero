import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SuperHero } from "./../../superhero";
import { SuperHeroService } from "./../../services/superhero.service";

@Component({ 
    selector: 'detail-superhero',
    templateUrl: './detail-superhero.component.html'
})

export class DetailSuperHeroComponent implements OnInit {
    
    superHero: SuperHero = null;

    constructor(private route: ActivatedRoute, private router: Router, 
        private superHeroService: SuperHeroService) { }
    
    ngOnInit(): void {
        let id =+ this.route.snapshot.params['id'];
        //this.superHero = this.superHeroService.getSuperHero(id);
        this.superHeroService.getSuperHero(id)
        .subscribe(superHero => {
            this.superHero = superHero;
        });
    }

    goBack(): void {
        this.router.navigate(['/superhero/all'])
    }

    goEdit(): void {
        this.router.navigate(['/superhero/edit', this.superHero.id]);
    }

    goEditReactive(): void {
        this.router.navigate(['/superhero/modify', this.superHero.id]);
    }

    delete(superHero: SuperHero): void {
        this.superHeroService.deleteSuperHero(superHero)
        .subscribe(_ => this.goBack());
    }
    
}