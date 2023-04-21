import { Renderer2, SimpleChanges, OnChanges, Input, OnDestroy } from '@angular/core';
import {
  Directive,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[moveDiv]",
})
export class MoveDivDirective implements OnChanges, OnDestroy {
  //TODO useless ?!
  @Input()
  targetDivId!: string

  @Input()
  isRemoved: boolean = false;  // useful to call the destroy func

  constructor(private _elemRef: ElementRef, private renderer: Renderer2) { 
    const targetDiv = document.getElementById(this.targetDivId)
    if (targetDiv !== null) {
      this.renderer.appendChild(targetDiv, this._elemRef.nativeElement)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isRemoved.currentValue) {
      this.ngOnDestroy()
    }
  }

  ngOnDestroy(): void {
    // const targetDiv = document.getElementById(this.targetDivId)
    // if (targetDiv !== null) {
    //   this.renderer.removeChild(targetDiv, this._elemRef.nativeElement)
    // }
  }

}