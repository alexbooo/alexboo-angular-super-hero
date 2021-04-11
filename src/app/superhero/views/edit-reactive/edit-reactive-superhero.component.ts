import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SuperHeroService } from "./../../services/superhero.service";
import { SuperHero } from "./../../superhero";
import { SuperHeroPower } from "./../../superheropower";
import { powerMaxValidator } from '../../validators/power.validator';
import { RegexValidator } from '../../validators/regex.validator';

@Component({
    selector: 'editreactive-superhero',
    templateUrl: './edit-reactive-superhero.component.html'
})
export class EditReactiveSuperHeroComponent implements OnInit {
    superHero: SuperHero = null;
    form: FormGroup;


    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private superHeroService: SuperHeroService) { }
    
    ngOnInit(): void {
        let id = +this.route.snapshot.params['id'];
        console.log(id);    
        // this.superHero = this.superHeroService.getSuperHero(id);
        
        this.form = this.fb.group({
            nameIrl: [ '', Validators.required ],
            powers: new FormArray([], [powerMaxValidator(1,2)]),
            testRegex: [ '', Validators.required ]
            

            // testRegex: ['', Validators.compose([Validators.required, 
            //     Validators.minLength(8),
            //     (testRegex) => RegexValidator.isValid(testRegex as FormControl)])]

            // testRegex: ['', Validators.compose([Validators.required, 
            //     Validators.minLength(8),
            //     (testRegex) => RegexValidator.isValid(testRegex as FormControl)])]
        });
        

        this.superHeroService.getSuperHero(id)
        .subscribe(superHero => {
            this.superHero = superHero;
            console.log(this.superHero.nameIrl);
            
            this.form.value.nameIrl = this.superHero.nameIrl;

            // // this.form.setValue({ nameIrl: this.superHero.nameIrl });

            // // this.form.patchValue( {nameIrl : this.superHero.nameIrl});
            this.form.controls['nameIrl'].setValue(this.superHero.nameIrl);

        
            this.superHeroService.getSuperHeroPowers().forEach(power => this.powersFormArray.push(new FormControl(this.hasPower(power))));
            console.log(this.superHeroService.getSuperHeroPowers());

            console.log(this.form.controls['orders']);

            console.log(this.superHeroService.getSuperHeroPowers()[1].name);
        });
    }

    get ordersFormArray() {
        return this.form.controls.orders as FormArray;
    }
    get powersFormArray() {
        return this.form.controls.powers as FormArray;
    }


    hasPower(power: SuperHeroPower) {
        // console.log("hasPower: " + this.superHero.name + " has power: " + power.name);
        let index = this.indexOfPower(power);
        //let index = this.superHero.powers.indexOf(power);
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
     
    selectPower($event: any): void {
        const selectedPowerIds = this.form.value.powers
        .map((checked: any, i: string | number) => checked ? this.superHeroService.getSuperHeroPowers()[i].id : null)
        .filter((v: any) => v !== null);
        
        for (let selectedPowerId of selectedPowerIds) {
            let power = this.superHeroService.getSuperHeroPowers().find(power => power.id == selectedPowerId);
            if (!this.hasPower(power)) {
                this.superHero.powers.push(power);
            }  
        } 

        const notSelectedPowerIds = this.form.value.powers
        .map((checked: any, i: string | number) => checked ? null : this.superHeroService.getSuperHeroPowers()[i].id)
        .filter((v: any) => v !== null);

        for (let selectedPowerId of notSelectedPowerIds) {
            let power = this.superHeroService.getSuperHeroPowers().find(power => power.id == selectedPowerId);
            let index = this.indexOfPower(power);
            if (~index) {
                this.superHero.powers.splice(index, 1);
                console.log("nb powers: " + this.superHero.powers.length);
            }
        }
    }

    onSubmit(form: FormGroup) {
        console.log('Valid?', form.valid); // true or false
        console.log('nameIrl', form.value.nameIrl);
        console.log('testRegex', form.value.testRegex);

        const selectedPowerIds = this.form.value.powers
        .map((checked: any, i: string | number) => checked ? this.superHeroService.getSuperHeroPowers()[i].id : null)
        .filter((v: any) => v !== null);
        console.log(selectedPowerIds);
        
        console.log("submit form");

        this.superHero.nameIrl = form.value.nameIrl;

        this.superHeroService.updateSuperHero(this.superHero)
        .subscribe(() => {
            let link = ['/superhero', this.superHero.id];
            this.router.navigate(link);
        });
    }
}