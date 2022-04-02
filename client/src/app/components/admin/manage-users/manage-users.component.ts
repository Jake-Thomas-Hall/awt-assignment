import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User, UsersResponse } from 'src/app/models/responses/users.response.model';
import { AccountService } from 'src/app/services/account.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { LoadChildDirective } from 'src/app/shared/directives/load-child.directive';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  page = 1;
  @ViewChild(LoadChildDirective, { static: true}) dynamicChild!: LoadChildDirective;
  deleteRef!: ComponentRef<DeleteUserComponent>;
  updateRef!: ComponentRef<UpdateUserComponent>;

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

  refreshData() {
    this.accountService.getAllUsers(this.page).subscribe(result => {
      this.users = result.data;
    });
  }

  deleteUser(user: User) {
    this.dynamicChild.viewContainerRef.clear();
    this.deleteRef = this.dynamicChild.viewContainerRef.createComponent(DeleteUserComponent);
    this.deleteRef.instance.user = user;
    this.deleteRef.instance.refresh.subscribe(() => {
      this.refreshData();
    });
  }

  updateUser(user: User) {
    this.dynamicChild.viewContainerRef.clear();
    this.updateRef = this.dynamicChild.viewContainerRef.createComponent(UpdateUserComponent);
    this.updateRef.instance.user = user;
    this.updateRef.instance.refresh.subscribe(() => {
      this.refreshData();
    });
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
