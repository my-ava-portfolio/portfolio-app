
import { animate, style, group, query } from '@angular/animations';


export const fadeAnimation = [
  query(':enter, :leave', [style({ position: 'fixed' })]),
  query(':enter', [style({ opacity: 0 })]),
  group([
    query(':leave', [animate('0.3s ease-in-out', style({ opacity: 0 }))], {optional: true}),
    query(':enter', [
      style({ opacity: 0 }),
      animate('0.7s ease-in-out', style({ opacity: 1 })),
    ]),
  ]),
]


export const leftTranslation = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
          optional: true,
      }),
  ]),
];


export const rightTranslation = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
          optional: true,
      }),
  ]),
];

export const topTranslation = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateY(100%)' }), animate('.3s ease-out', style({ transform: 'translateY(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateY(0%)' }), animate('.3s ease-out', style({ transform: 'translateY(-100%)' })), ], {
          optional: true,
      }),
  ]),
];

export const botTranslation = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateY(-100%)' }), animate('.3s ease-out', style({ transform: 'translateY(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateY(0%)' }), animate('.3s ease-out', style({ transform: 'translateY(100%)' }))], {
          optional: true,
      }),
  ]),
];

