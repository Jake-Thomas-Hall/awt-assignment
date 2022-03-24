import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isDark$ = new BehaviorSubject(false);
  private history: string[] = [];

  constructor(
    private router: Router,
    private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    }
    else {
      this.router.navigateByUrl('/');
    }
  }

  subscribeToNavViewPreference(): Observable<boolean> {
    return this.isDark$.asObservable();
  }

  setNavViewPreference(viewPreference: boolean) {
    this.isDark$.next(viewPreference);
  }
}
