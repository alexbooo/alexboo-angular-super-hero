import { SuperHero } from "./superhero";

export const SUPERHEROES: SuperHero[] = [
    {
        id: 1,
        name: "superman",
        nameIrl: "Clark Kent",
        creationdate: new Date(),
        img: "./assets/img/superman.png",
        powers: [{ id: 1, name: "fly" }],
        testRegex: ""
    },
    {
        id: 2,
        name: "spiderman",
        nameIrl: "Perter Parker",
        creationdate: new Date(),
        img: "./assets/img/spiderman.png",
        powers: [{ id: 2, name: "wall crawling" }],
        testRegex: ""
    },
    {
        id: 3,
        name: "aquaman",
        nameIrl: "Arthur Curry",
        creationdate: new Date(),
        img: "./assets/img/aquaman.png",
        powers: [{ id: 3, name: "breathe underwater" }],
        testRegex: ""
    }
]