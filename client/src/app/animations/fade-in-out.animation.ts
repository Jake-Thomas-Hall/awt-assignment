import { animate, animation, style, transition, trigger } from "@angular/animations";

export const fadeInOut = trigger(
    'fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.2s', style({ opacity: 0 }))
    ])
]);