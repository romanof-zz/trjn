import {trigger, animate, style, group, query, transition} from '@angular/animations';

const slideTransition = function(left: boolean): any {
  return [
    query(':enter, :leave', style({position:'fixed', width:'100%'}), {optional:true}),
    group([
      query(':enter', [
        style({ transform: "translateX(" + (left ? "100" : "-100") + "%)" }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(' + (left ? '0' : '0') + '%)' }))
        ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(' + (left ? '0' : '0') + '%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(' + (left ? '-100' : '100') + '%)'}))
        ], { optional: true })
    ])
  ]
}

export const routerTransition = trigger('routerTransition', [
  transition('profile => post', slideTransition(true)),
  transition('post => profile', slideTransition(false))
])
