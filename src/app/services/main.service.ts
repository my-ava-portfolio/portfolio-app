import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  scrollToTopAction(): void {
    window.scrollTo(0, 0)
  }
}
