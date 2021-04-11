import { Location } from "@angular/common";
import { DebugElement, Type } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./superhero/notfound/page-not-found.component";
import { SuperHeroComponent } from "./superhero/superhero.component";

describe('Router SuperHero', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let location: Location;
    let router: Router;
    let rootElement: DebugElement;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                RouterTestingModule.withRoutes(routes)],
            // providers: [{provide: ActivatedRoute}]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        // fixture = TestBed.createComponent(SuperHeroComponent);
        rootElement = fixture.debugElement;
        router.initialNavigation();

    });

    it('navigates to ', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/superhero/all');
    }));

    it('navigates to page not found',  fakeAsync(() => {
        const expectedRoute = { path: '**', component: PageNotFoundComponent };
        expect(routes).toContain(expectedRoute);

        router.navigate(['booo']);
        expect(router.navigate);
        console.log('---------------------------');
        
        tick();
        fixture.detectChanges();
        tick();

        console.log('----- ' + fixture.debugElement.query(By.css('h1')).nativeElement.textContent);
        console.log('----- ' + fixture.debugElement.query(By.css('page-404')));
        
        console.log('----- ' + fixture.debugElement.query(By.directive(PageNotFoundComponent)));
        
        // expectElementOf(PageNotFoundComponent);
        expect(location.path()).toBe('/booo');

        
        // console.log(fixture.componentInstance.routerOutlet.component);
        // const component: DashboardComponent = getActiveComponent();

    }));

    function expectElementOf(type: Type<any>): any {
        const el = fixture.debugElement.query(By.directive(type));
        console.log(el);
        expect(el).toBeTruthy('expected an element for ' + type.name);
        return el;
      }

    // function getActiveComponent<T>(): T {
    //     return rootComponent.routerOutlet.component as T;
    //   }
});