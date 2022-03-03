import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlerService {
  subMenuFeatures: Subject<any> = new Subject<any>();

  constructor() { }


  pullSubMenus(menus: any[]): void {
    this.subMenuFeatures.next(menus);
  }

}
