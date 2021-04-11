import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SuperHero } from "../superhero";
import { SuperHeroPower } from "../superheropower";
import { SuperHeroBorderDirective } from "./superhero-border.directive";

@Component({
    template: `
    <p>Test Component</p>
    <div id="test" superheroBorder [superheroColor]="'red'"></div>
    `
})
class TestComponent { }

const mouseEvents = {
    get enter() {
        const mouseenter = document.createEvent('MouseEvent');
        mouseenter.initEvent('mouseenter', true, true);
        return mouseenter;
    },
    get leave() {
        const mouseleave = document.createEvent('MouseEvent');
        mouseleave.initEvent('mouseleave', true, true);
        return mouseleave;
    },
};

describe('SuperHeroBorderDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let container: TestComponent;
    // let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, SuperHeroBorderDirective],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
            ],
        });

        fixture = TestBed.createComponent(TestComponent);
        // fixture.detectChanges(); // initial binding

        container = fixture.componentInstance;
    });

    it('should set border color red', () => {
        let element: HTMLElement = fixture.nativeElement;
        let targetElement = <HTMLDivElement>element.querySelector('#test');

        expect(targetElement.id).toEqual('test');
        expect(targetElement.style.borderColor).toEqual('rgba(0, 0, 0, 0.125)');
        expect(targetElement.style.borderStyle).toEqual('solid');
        expect(targetElement.style.width).toEqual('300px');
        expect(targetElement.style.height).toEqual('200px');
        targetElement.dispatchEvent(mouseEvents.enter);
        expect(targetElement.style.borderStyle).toEqual('solid');
        expect(targetElement.style.borderColor).toEqual('red');
        expect(targetElement.style.width).toEqual('300px');
        expect(targetElement.style.height).toEqual('200px');
        targetElement.dispatchEvent(mouseEvents.leave);
        expect(targetElement.style.borderColor).toEqual('rgba(0, 0, 0, 0.125)');
        expect(targetElement.style.borderStyle).toEqual('initial');
        expect(targetElement.style.width).toEqual('300px');
        expect(targetElement.style.height).toEqual('200px');

        let el = fixture.debugElement.query(By.directive(SuperHeroBorderDirective));
        expect(el).not.toBeNull();

        // expect(el.id).toEqual('test');
    });

});