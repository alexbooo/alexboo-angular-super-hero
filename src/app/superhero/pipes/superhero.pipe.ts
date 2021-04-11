import { DatePipe, formatDate } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { SuperHero } from "./../superhero";

@Pipe({ name: 'superHero' })
export class SuperHeroPipe implements PipeTransform {
    transform(superHero: SuperHero): string {
        //return superHero.name + " " + formatDate(superHero.creationdate, "YYYY", 'en-US');
        let datePipe = new DatePipe('en-US');
        return superHero.name + " " + datePipe.transform(superHero.creationdate, 'dd/MM/yyyy');
    }
}