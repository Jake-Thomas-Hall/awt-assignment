import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { triggerChildAnimation } from 'src/app/animations/trigger-child.animation';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [
    triggerChildAnimation,
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
  showPadding = false;

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  closeToast(index: number) {
    this.toastService.removeToast(index);
  }
}
