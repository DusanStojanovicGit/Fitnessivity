import { NgModule } from '@angular/core';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ErrorComponent } from './error/error.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { PlansPageModule } from './plans-page/plans-page.module';
import { ReportsComponent } from './reports/reports.component';
import { adminGuard, loginRegisterGuard } from './auth/guards';
import { PlanViewPageComponent } from './plans-page/plan-view-page/plan-view-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'plans', component: PlansPageComponent },
  { path: 'users/:username', component: ProfilePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [loginRegisterGuard()] },
  { path: 'register', component: RegisterPageComponent, canActivate: [loginRegisterGuard()] },
  { path: 'logout', component: SignOutComponent },
  { path: 'plan/:id', component: PlanViewPageComponent},
  { path: 'reports', component: ReportsComponent, canActivate: [adminGuard()]},
  { path: '**', component: ErrorComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PlansPageModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
