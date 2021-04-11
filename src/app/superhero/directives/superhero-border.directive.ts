import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[superheroBorder]'
})

export class SuperHeroBorderDirective implements OnInit {
    
    private defaultColor: string = 'rgba(0,0,0,.125)';
    private defaultHeight: number = 200;
    private defaultWidth: number = 300;
    private defaultStyle: string = 'solid 1px ';
    

    constructor (private el: ElementRef) {
    }

    ngOnInit(): void {
        console.log("on init");
        this.setBorder(this.defaultStyle + this.defaultColor);
        this.setHeight(this.defaultHeight);
        this.setWidth(this.width || this.defaultWidth);
    }
    
    @Input('superheroColor') borderColor: string; // with alias
    //@Input() superhBorder: string; // without alias
    @Input('superheroWidth') width: number;
    
    @HostListener('mouseenter') onMouseEnter() {
        console.log("enter " + this.borderColor);   
        const style: string = 'solid 4px ';
        this.setBorder(style + this.borderColor || this.defaultStyle + this.defaultColor);
        // this.setWidth(this.width);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBorder(this.defaultColor);
        // this.setWidth(this.defaultWidth);
    }

    private setBorder(style: string) {
        console.log("set border " + style);
        let border = style;
        this.el.nativeElement.style.border = border;
    }

    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }

    private setWidth(width: number) {
        console.log("width: " + width);
        this.el.nativeElement.style.width = width + 'px';
    }
}