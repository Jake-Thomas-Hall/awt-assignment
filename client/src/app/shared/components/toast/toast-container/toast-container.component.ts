import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [
    trigger('triggerChildAnimation', [
      transition(':enter, :leave', [animate('0s'), query('*', [animateChild()])]),
    ]),
    trigger('verticalCollapse', [
      state('*', style({
        height: '*',
      })),
      state('void', style({
        height: '0',
      })),
      transition('* => void', animate('.3s .3s ease')),
    ])
  ]
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  closeToast(index: number) {
    this.toastService.removeToast(index);
  }
}
