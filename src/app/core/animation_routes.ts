
import { animate, style, group, query, trigger, state, transition } from '@angular/animations';


export const fadeInOutAnimation =  trigger('fadeInOut', [
    state('in', style({opacity: 0})),
    transition(':enter', [
      style({opacity: '0'}),
      animate('500ms ease-in-out', style({opacity: '1'}))
    ]),
  ])

export const expandCollapse = trigger('expandCollapse', [
  state('open', style({height: '100%', opacity: 1})),
  state('closed', style({height: 0, opacity: 0})),
  transition('* => *', [animate('1000ms')])
])

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


export const leftTranslation = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
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
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
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
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
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
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateY(-100%)' }), animate('.3s ease-out', style({ transform: 'translateY(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateY(0%)' }), animate('.3s ease-out', style({ transform: 'translateY(100%)' }))], {
          optional: true,
      }),
  ]),
];

