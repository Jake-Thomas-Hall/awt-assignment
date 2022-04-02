import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User, UsersResponse } from 'src/app/models/responses/users.response.model';
import { AccountService } from 'src/app/services/account.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  page = 1;

  constructor(
    private navigationService: NavigationService,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.router.navigate([], { queryParams: { page: this.page } });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.accountService.getAllUsers(params['page']).subscribe(result => {
          this.users = result.data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }

  next() {
    this.page++;
    this.router.navigate([], { queryParams: { page: this.page } });
  }

  prev() {
    this.page--;
    this.router.navigate([], { queryParams: { page: this.page } });
  }
}
