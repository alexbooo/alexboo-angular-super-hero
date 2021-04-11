import { Pipe, PipeTransform } from "@angular/core";
import { SuperHeroPower } from "./../superheropower";

@Pipe({ name: 'superHeroPower' })
export class SuperHeroPowerPipe implements PipeTransform {
    transform(power: SuperHeroPower): string {
        let color: string;
        
        switch (power.name) {
            case 'fly':
				color = 'badge badge-pill badge-primary';
				break;
			case 'wall crawling':
				color = 'badge badge-pill badge-success';
				break;
			case 'breathe underwater':
				color = 'badge badge-pill badge-warning';
                break;
        }

        return color;
    }
}