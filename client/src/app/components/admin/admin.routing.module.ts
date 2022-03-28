import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ResetConfirmComponent } from "./reset-confirm/reset-confirm.component";
import { ResetComponent } from "./reset/reset.component";

const routes: Routes = [{
    path: 'admin',
    children: [
        {
            path: '', redirectTo: 'login', pathMatch: 'full'
        },
        {
            path: 'login', component: LoginComponent,
        },
        {
            path: 'login/reset', component: ResetComponent
        },
        {
            path: 'login/reset-confirm', component: ResetConfirmComponent
        },
        {
            path: 'users', component: ResetConfirmComponent
        }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }