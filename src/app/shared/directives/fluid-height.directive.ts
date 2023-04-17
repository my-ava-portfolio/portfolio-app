import { AfterViewChecked } from '@angular/core';
import {
  Directive,
  ElementRef,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[fluidHeight]",
})
export class FluidHeightDirective implements AfterViewChecked {

  constructor(private _elemRef: ElementRef) { 
    this.setHeight();

  }

  ngAfterViewChecked(): void {
    this.setHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any): void {
    this.setHeight();
  }

  setHeight(): void {
    this._elemRef.nativeElement.style.height = window.innerHeight - this._elemRef.nativeElement.offsetTop + 'px';
  }

}