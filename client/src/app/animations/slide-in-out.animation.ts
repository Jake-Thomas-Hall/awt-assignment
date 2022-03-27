import { animate, animation, style, transition, trigger } from "@angular/animations";

export const slideInOut = trigger(
    'slideInOut', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('.2s', style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('.2s', style({ transform: 'translateY(-100%)', opacity: 0 }))
    ])
]);