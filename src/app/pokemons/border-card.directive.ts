import { Directive, ElementRef, HostListener, Input } from '@angular/core';
  
@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
    initialColor: string = '#f5f5f5';
    defaultColors: string = '#009688';
    defaultHeight: number = 180;

    constructor(private el: ElementRef) {
        this.setBorder(this.initialColor);
        this.setHeight(this.defaultHeight);
    }

    @Input("pkmnBorderCard") borderColorValue: string;
    @Input("pkmnBorderCardDefault") borderDefaultColorValue: string;

    @HostListener('mouseenter') onMouseEnter(){
        this.setBorder(this.borderColorValue || this.defaultColors);
    }
  
    @HostListener('mouseleave') onMouseLeave(){
        this.setBorder(this.borderDefaultColorValue || this.initialColor);
    }

    private setBorder(color: string) {
        let border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }
  
    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }
}