import { Renderer2, SimpleChanges, OnChanges, Input, OnDestroy } from '@angular/core';
import {
  Directive,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[moveDivToBody]",
})
export class DivToBodyDirective implements OnChanges, OnDestroy {
  @Input()
  isRemoved: boolean = false;  // useful to call the destroy func

  constructor(private _elemRef: ElementRef, private renderer: Renderer2) { 
    this.renderer.appendChild(document.body, this._elemRef.nativeElement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isRemoved.currentValue) {
      this.ngOnDestroy()
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this._elemRef.nativeElement)
  }
}