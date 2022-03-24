import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.navigationService.setNavViewPreference(true);

    this.resetForm = this.fb.group({
      email: [null, Validators.email],
      token: [null]
    })
  }

  ngOnDestroy(): void {
    this.navigationService.setNavViewPreference(false);
  }
}
