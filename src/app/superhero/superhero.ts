import { SuperHeroPower } from './superheropower';

export class SuperHero {
    id: number;
    name: string;
    nameIrl: String;
    testRegex: String;
    creationdate: Date;
    img: string;
    powers: SuperHeroPower[];
}