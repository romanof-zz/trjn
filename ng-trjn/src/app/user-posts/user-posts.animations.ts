import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':leave', [
      stagger(100, [
        animate('1s', style({ opacity: 0 }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('1s', style({ opacity: 1 }))
      ])
    ], { optional: true })
  ])
])
