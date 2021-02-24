
import { animate, style, group, query } from '@angular/animations';


export const fadeAnimation = [
  query(':enter, :leave', [style({ position: 'fixed', width: '100%' })]),
  query(':enter', [style({ opacity: 0 })]),
  group([
    query(':leave', [animate('0.3s ease-in-out', style({ opacity: 0 }))], {optional: true}),
    query(':enter', [
      style({ opacity: 0 }),
      animate('0.7s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
]


