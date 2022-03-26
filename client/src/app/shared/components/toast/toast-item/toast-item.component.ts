import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastMessage } from 'src/app/models/toast-message.model';

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
  animations: [
    trigger('slideIn', [
      state('*', style({
        transform: 'translateY(0) scale(1) rotateY(0)',
        opacity: 1,
        filter: 'blur(0) saturate(100%)'
      })),
      state('void', style({
        transform: 'translateY(20px) scale(1.1) rotateY(5deg)',
        opacity: 0,
        filter: 'blur(2px) saturate(50%)'
      })),
      transition('void => *',  animate('.3s ease-in-out')),
    ]),
    trigger('slideOut', [
      state('*', style({
        transform: 'translateX(0)  scale(1)',
        opacity: 1,
      })),
      state('void', style({
        transform: 'translateX(100%) scale(.7)',
        opacity: 0,
      })),
      transition('* => void', animate('.2s ease')),
    ])
  ]
})
export class ToastItemComponent implements OnInit {
  @Input() 
  toastMessage!: ToastMessage;

  @Output()
  public closeItem = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, this.toastMessage.timeout)
  }

  close(): void {
    this.closeItem.emit();
  }
}
