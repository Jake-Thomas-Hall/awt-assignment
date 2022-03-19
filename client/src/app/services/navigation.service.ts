import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isDark$ = new BehaviorSubject(false);

  constructor() { }

  subscribeToNavViewPreference(): Observable<boolean> {
    return this.isDark$.asObservable();
  }

  setNavViewPreference(viewPreference: boolean) {
    this.isDark$.next(viewPreference);
  }
}
