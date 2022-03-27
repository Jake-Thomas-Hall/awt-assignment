import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.authService.loginToken().subscribe(response => {
        this.authService.setLoginStatus(response.data.authStatus);
        this.toastService.openToast({ content: 'Login succesful', style: 'success', timeout: 10000 });
      });
    }
  }
}
