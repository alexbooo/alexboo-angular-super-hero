import { SuperHero } from "../superhero";
import { SuperHeroPower } from "../superheropower";
import { SuperHeroPowerPipe } from "./superheropower.pipe";

describe('SuperHeroPowerPipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new SuperHeroPowerPipe();

    it('transforms "superHero power=fly" to "color"', () => {
        let power: SuperHeroPower = new SuperHeroPower();
        power.id = 1;
        power.name = "fly";
        expect(pipe.transform(power)).toBe('badge badge-pill badge-primary');
    });

    it('transforms "superHero power=wall crawling" to "color"', () => {
        let power: SuperHeroPower = new SuperHeroPower();
        power.id = 1;
        power.name = "wall crawling";
        expect(pipe.transform(power)).toBe('badge badge-pill badge-success');
    });

    it('transforms "superHero power=breathe underwater" to "color"', () => {
        let power: SuperHeroPower = new SuperHeroPower();
        power.id = 1;
        power.name = "breathe underwater";
        expect(pipe.transform(power)).toBe('badge badge-pill badge-warning');
    });

    it('transforms "superHero power" to "color"', () => {
        let power: SuperHeroPower = new SuperHeroPower();
        power.id = 1;
        power.name = "breathe underwater";
        expect(pipe.transform(power)).toContain('badge badge-pill');
        power.name = "wall crawling";
        expect(pipe.transform(power)).toContain('badge badge-pill');
        power.name = "fly";
        expect(pipe.transform(power)).toContain('badge badge-pill');
    });

});