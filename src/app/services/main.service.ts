import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  scrollToTop: Subject<boolean> = new Subject<boolean>();

  constructor() { }


  scrollToTopAction(): void {
    this.scrollToTop.next(true);
  }
}
