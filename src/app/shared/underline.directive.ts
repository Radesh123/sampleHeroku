import { Directive, HostListener, ElementRef, Renderer } from "@angular/core";

@Directive({ selector: '[myUnderline]'})

export class UnderlineDirective {
    constructor(private el: ElementRef, private render:Renderer) {
    }
    @HostListener('mouseenter') onMouseEnter() {
        this.hover(true);
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.hover(false);
    }
    hover(shouldUnderline: boolean) {
        if(shouldUnderline) {
            this.render.setElementStyle(this.el.nativeElement,'text-decoration','underline');
        } else {
            this.render.setElementStyle(this.el.nativeElement,'text-decoration','none');
        }
    }
}