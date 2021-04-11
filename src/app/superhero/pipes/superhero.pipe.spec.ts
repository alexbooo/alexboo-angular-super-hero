import { SuperHero } from "../superhero";
import { SuperHeroPipe } from "./superhero.pipe";

describe('SuperHeroPipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new SuperHeroPipe();

    it('transforms "superHero" to "name + creation date"', () => {
        let superHero: SuperHero = new SuperHero();
        superHero.name = "superman";
        superHero.creationdate = new Date(2021, 0, 1);
        expect(pipe.transform(superHero)).toBe('superman 01/01/2021');
    });
});