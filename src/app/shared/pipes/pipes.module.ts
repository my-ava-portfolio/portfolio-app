import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrl implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){
  }
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: Array<any>, sep = ', '): string {
    return input.join(sep);
  }
}


@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    return value.slice().reverse();
  }
}

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  // https://angular.io/api/common/DatePipe
  transform(value: any, args?: any): any {
     return super.transform(value, "y-M-d H:mm:ss");
  }
}


@NgModule({
  declarations: [
    SafeUrl,
    JoinPipe,
    ReversePipe
  ],
  exports: [
    SafeUrl,
    JoinPipe,
    ReversePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
