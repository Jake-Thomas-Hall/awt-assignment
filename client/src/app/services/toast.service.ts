import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastMessage, ToastOptions } from '../models/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastMessages$: Observable<ToastMessage[]>;
  private items: ToastMessage[] = [];

  constructor() {
    this.toastMessages$ = of(this.items);
  }

  openToast(toastOptions: ToastOptions) {
    const message = new ToastMessage(toastOptions);
    this.items.push(message);
  }

  removeToast(index: number) {
    this.items.splice(index, 1);
  }
}
