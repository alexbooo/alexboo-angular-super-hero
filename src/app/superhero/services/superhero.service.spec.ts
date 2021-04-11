import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed } from "@angular/core/testing";
import { SuperHero } from "../superhero";
import { SuperHeroPower } from '../superheropower';
import { SuperHeroService } from "./superhero.service";

describe('SuperHeroService', () => {
    let injector: TestBed;
    let service: SuperHeroService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SuperHeroService]
        }).compileComponents();
        injector = getTestBed();
        service = injector.inject(SuperHeroService);
    });

    beforeEach(() => service = TestBed.inject(SuperHeroService));

    beforeEach(() => httpMock = TestBed.inject(HttpTestingController));

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).not.toBeNull();
        expect(service).toBeTruthy();
    });

    it('#getSuperHeroes should return an Observable<SuperHero[]>', fakeAsync(() => {
        const dummySuperHeroes: SuperHero[] = [{
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
        }];

        service.getSuperHeroes().subscribe(superHeroes => {
            expect(superHeroes.length).toBe(2);
            expect(superHeroes).toEqual(dummySuperHeroes);
            // done();
        });

        const req = httpMock.expectOne('api/superHeroes');
        expect(req.request.method).toBe("GET");
        req.flush(dummySuperHeroes);
    }));

    it('#getSuperHero should return an Observable<SuperHero>', fakeAsync(() => {
        const dummySuperHero: SuperHero = {
            id: 1,
            name: "superman",
            nameIrl: "Clark Kent",
            creationdate: new Date(),
            img: "./assets/img/superman.png",
            powers: [{ id: 1, name: "fly" }],
            testRegex: ""
        };

        service.getSuperHero(1).subscribe(superHero => {
            // expect(value).toBe('observable value');
            expect(superHero.name).toBe('superman');
            expect(superHero).toEqual(dummySuperHero);
            // done();
        });

        const req = httpMock.expectOne('api/superHeroes/1');
        expect(req.request.method).toBe("GET");
        req.flush(dummySuperHero);
    }));

    it('#updateSuperHero should return an Observable<SuperHero>', fakeAsync(() => {
        const dummySuperHero: SuperHero = {
            id: 1,
            name: "superman",
            nameIrl: "Clark Kent",
            creationdate: new Date(),
            img: "./assets/img/superman.png",
            powers: [{ id: 1, name: "fly" }],
            testRegex: ""
        };

        service.updateSuperHero(dummySuperHero).subscribe(superHero => {
            expect(superHero.name).toBe('superman');
            expect(superHero).toEqual(dummySuperHero);
            // done();
        });

        const req = httpMock.expectOne('api/superHeroes');
        expect(req.request.method).toBe("PUT");
        req.flush(dummySuperHero);
    }));

    it('#deleteSuperHero should return an Observable<SuperHero>', fakeAsync(() => {
        const dummySuperHero: SuperHero = {
            id: 1,
            name: "superman",
            nameIrl: "Clark Kent",
            creationdate: new Date(),
            img: "./assets/img/superman.png",
            powers: [{ id: 1, name: "fly" }],
            testRegex: ""
        };

        service.deleteSuperHero(dummySuperHero).subscribe(superHero => {
            expect(superHero.name).toBe('superman');
            expect(superHero).toEqual(dummySuperHero);
            // done();
        });

        const req = httpMock.expectOne('api/superHeroes/1');
        expect(req.request.method).toBe("DELETE");
        req.flush(dummySuperHero);
    }));

    it('#searchSuperHeroes should return an Observable<SuperHero[]>', fakeAsync(() => {
        const dummySuperHeroes: SuperHero[] = [{
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
        }];

        service.searchSuperHeroes("super").subscribe(superHeroes => {
            expect(superHeroes.length).toBe(2);
            expect(superHeroes).toEqual(dummySuperHeroes);
            // done();
        });

        const req = httpMock.expectOne('api/superHeroes/?name=super');
        expect(req.request.method).toBe("GET");
        req.flush(dummySuperHeroes);
    }));

    it('#getSuperHeroPowers should return an Array<SuperHeroPower>', () => {
        let powers: Array<SuperHeroPower> = service.getSuperHeroPowers();
        expect(powers.length).toBe(3);
    });
});


