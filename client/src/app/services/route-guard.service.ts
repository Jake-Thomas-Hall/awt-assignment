import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router,
    private toastService: ToastService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return new Promise<boolean>((resolve, reject) => {
        if (this.authService.getToken()) {
          this.recaptchaV3Service.execute('routeGuard').subscribe(token => {
            this.authService.loginToken(token).subscribe({
              next: response => {
                resolve(true);
              },
              error: response => {
                this.toastService.openToast({content: 'You do not have access to this route, login first to access admin features.'});
                this.router.navigate(['/', 'admin']);
                resolve(false);
              }
            });
          })
        }
        else {
          this.toastService.openToast({content: 'You do not have access to this route, login first to access admin features.'});
          this.router.navigate(['/', 'admin']);
          resolve(false);
        }
      });
  }
}
