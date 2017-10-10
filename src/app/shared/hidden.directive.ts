import { Directive, ElementRef, Renderer, Input } from "@angular/core";

@Directive({ selector: '[myHidden]'})

export class HiddenDirective {
    constructor(public el: ElementRef, public render:Renderer) {
    }
    @Input() myHidden: boolean;
    ngOnInit() {
        if(this.myHidden) {
            this.render.setElementStyle(this.el.nativeElement,'display','none');
        }
    }
}