import { Component, ComponentFactoryResolver, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SuperHeroService } from "./services/superhero.service";
import { SuperHero } from "./superhero";
import { SuperHeroPower } from "./superheropower";

@Component({
    selector: 'superhero-form',
    templateUrl: './superhero-form.component.html'
})
export class SuperHeroFormComponent implements OnInit {
    model: any = {};

    @Input() superHero: SuperHero;
    powers: Array<SuperHeroPower>;

    //selectedItems: [];
    countSelectedItems = 0;
    
    constructor(private router: Router, private superHeroService: SuperHeroService) { }

    ngOnInit(): void {
        this.powers = this.superHeroService.getSuperHeroPowers();
    }

    hasPower(power: SuperHeroPower) {
        let index = this.indexOfPower(power);
        if (~index) return true;
        return false;
    }

    indexOfPower(power: SuperHeroPower) {
        //console.log(this.superHero.name + " has " + this.superHero.powers.length + " power");
        for (let i = 0; i < this.superHero.powers.length; i++) {
            if (power.id == this.superHero.powers[i].id) {
                return i;
            }
        }
        return -1;
    }

    selectPower($event: any, power: SuperHeroPower): void {
        console.log("nb powers: " + this.superHero.powers.length);
        let checked = $event.target.checked;
        if (checked) {
            console.log("checked");
            this.countSelectedItems++;
            this.superHero.powers.push(power);
        } else {
            console.log("not checked");
            let index = this.indexOfPower(power);
            console.log("index: "  + index);
            if (~index) {
                this.superHero.powers.splice(index, 1);
                this.countSelectedItems--;
                console.log("nb powers: " + this.superHero.powers.length);

            }
        }
        console.log("count: " + this.countSelectedItems);
    }

    isPowerValid(power: SuperHeroPower): boolean {
        if (this.superHero.powers.length === 1 && this.hasPower(power)) {
			return false;
		}
        if (this.superHero.powers.length >= 2 && !this.hasPower(power)) {
            console.log(power.name + " not valid");
            return false;
        }
        return true;
    }

    public isAtleastOneItemSelected() {
        //const selectedItems = this.powers.filter((item) => item.isSelected);
        //const selectedItems = this.selectedItems.filter(Boolean).length;
        if (this.countSelectedItems > 0) {
            return true;
        } else {
            return false;
        }
    }

    onSubmit(): void {
        console.log("submit form");
        
        this.superHeroService.updateSuperHero(this.superHero)
        .subscribe(() => {
            let link = ['/superhero', this.superHero.id];
            this.router.navigate(link);
        });
    }
}