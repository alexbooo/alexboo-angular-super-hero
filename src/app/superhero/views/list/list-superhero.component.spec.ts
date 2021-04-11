import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { SuperHeroService } from "../../services/superhero.service";
import { SuperHero } from "../../superhero";
import { of } from "rxjs";
import { ListSuperHeroComponent } from "./list-superhero.component";
import { SuperHeroPipe } from "../../pipes/superhero.pipe";
import { SuperHeroPowerPipe } from "../../pipes/superheropower.pipe";
import { By } from "@angular/platform-browser";
import { SuperHeroComponent } from "../../superhero.component";
import { Router } from "@angular/router";

describe('ListSuperHeroComponent', () => {
    let fixture: ComponentFixture<ListSuperHeroComponent>;
    let component: ListSuperHeroComponent;
    let rootElement: DebugElement;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListSuperHeroComponent, SuperHeroPipe, SuperHeroPowerPipe],
            imports: [FormsModule, 
                RouterTestingModule.withRoutes([
                    { path: 'superhero/:id', component: SuperHeroComponent }
                ])],
            providers: [{provide: SuperHeroService, useValue: SuperHeroServiceStub}]
        }).compileComponents();

        fixture = TestBed.createComponent(ListSuperHeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
        expect(component).toBeTruthy();
    });


    it('should display list of super heroes', fakeAsync(() => {
        expect(component.superHeroes$.length).toBeGreaterThan(0);
        expect(component.superHeroes$[0].name).toBe("superman");

        const name: DebugElement = rootElement.query(By.css('h5'));
        expect(name.nativeElement.textContent).toContain('superman');
    }));

    it('should select one super hero', fakeAsync(() => {
        const dummySuperHero: SuperHero = {
            id: 1,
            name: "superman",
            nameIrl: "Clark Kent",
            creationdate: new Date(),
            img: "./assets/img/superman.png",
            powers: [{ id: 1, name: "fly" }],
            testRegex: ""
        };
        let navigateSpy = spyOn(component.router, 'navigate');
        
        component.selectSuperHero(dummySuperHero);
        expect(navigateSpy).toHaveBeenCalledWith(['/superhero', dummySuperHero.id]);
    }));

    const SuperHeroServiceStub = {
        getSuperHeroes: function () {
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
    
            return of(dummySuperHeroes);
        },
        getSuperHero: async function(id: number) {
            const dummySuperHero: SuperHero = {
                id: 1,
                name: "superman",
                nameIrl: "Clark Kent",
                creationdate: new Date(),
                img: "./assets/img/superman.png",
                powers: [{ id: 1, name: "fly" }],
                testRegex: ""
            };
            return of(dummySuperHero);
        },
        updateSuperHero: async function(superHero: SuperHero) {
            const dummySuperHero: SuperHero = {
                id: 1,
                name: "superman",
                nameIrl: "Clark Kente",
                creationdate: new Date(),
                img: "./assets/img/superman.png",
                powers: [{ id: 1, name: "fly" }],
                testRegex: ""
            };
            return of(dummySuperHero);
        },
        deleteSuperHero: async function (superHero: SuperHero | number) {
            const dummySuperHero: SuperHero = {
                id: 1,
                name: "superman",
                nameIrl: "Clark Kente",
                creationdate: new Date(),
                img: "./assets/img/superman.png",
                powers: [{ id: 1, name: "fly" }],
                testRegex: ""
            };
            return of(dummySuperHero);
        }
    };    
});




