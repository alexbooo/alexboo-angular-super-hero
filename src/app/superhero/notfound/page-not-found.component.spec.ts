import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { PageNotFoundComponent } from "./page-not-found.component";

describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;
    let rootElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PageNotFoundComponent],
            imports: [RouterTestingModule]
        });
        fixture = TestBed.createComponent(PageNotFoundComponent);
        component = fixture.componentInstance; // BannerComponent test instance
        // component = new PageNotFoundComponent();
    });

    it('should set instance correctly', () => {
        expect(component).not.toBeNull();
    });

    it('should display original page not found', () => {
        let h1: HTMLElement = fixture.nativeElement.querySelector('h1');
        expect(h1.textContent).toContain('Page not found');
    });

    it('should link to /superHero/all', () => {
        let element: HTMLElement = fixture.nativeElement.querySelector('a');
        console.log("element");
        console.log(element);
        console.log(element.getAttribute('href'));
        console.log(element.getAttribute('routerLink'));
        expect(element.getAttribute('routerLink')).toContain('/superhero/all');
        
        const linkDebugEl = fixture.debugElement.query(By.css('a'));
        const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
        expect(routerLinkInstance['commands']).toEqual(['/superhero/all']);
        // expect(routerLinkInstance['href']).toEqual('/login');

        // console.log(href);
        // expect(href).toEqual('/login');
        // expect(element.).toContain('Page not found');

    });
});