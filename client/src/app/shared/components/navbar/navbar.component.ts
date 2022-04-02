import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import { slideInOut } from 'src/app/animations/slide-in-out.animation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    slideInOut,
    fadeInOut
  ]
})
export class NavbarComponent implements OnInit {
  expanded = false;
  sideNavExpanded = false;

  constructor(
    public navigationSerivce: NavigationService,
    public authService: AuthenticationService,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  logout() {
    this.expanded = false;
    this.sideNavExpanded = false;
    this.recaptchaV3Service.execute('logout').subscribe(token => {
      this.authService.logout(token).subscribe(response => {
        this.toastService.openToast({ content: response.message, style: 'success'});
        this.authService.setLoginStatus(false);
        this.authService.removeToken();
        this.authService.userId = 0;
        this.router.navigate(['/']);
      });
    });
  }

  close() {
    this.expanded = false;
    this.sideNavExpanded = false;
  }

  expandSidenav() {
    this.sideNavExpanded = !this.sideNavExpanded; 
  }
}
