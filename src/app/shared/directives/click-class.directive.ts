import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[clickClass]'
})
export class ClickClassDirective {

  constructor(public elementRef:ElementRef) { }

  @Input('clickClass') clickClass: any;


  @HostListener('click') onClick($event: any) {
    if (this.elementRef.nativeElement.classList.contains(this.clickClass)) {
      this.elementRef.nativeElement.classList.remove(this.clickClass);
    } else {
      this.elementRef.nativeElement.classList.add(this.clickClass);
    }
 }

}
