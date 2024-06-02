import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../guard/auth.guard";
import { HomeComponent } from "./home/home.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stats',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: UserprofileComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }