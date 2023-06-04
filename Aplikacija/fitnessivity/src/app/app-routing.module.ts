import { SubmitPageComponent } from './submit-page/submit-page.component';
import { NgModule } from '@angular/core';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ErrorComponent } from './error/error.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { CreatePlanComponent } from './plans-page/create-plan/create-plan.component';
import { MyPlansComponent } from './plans-page/my-plans/my-plans.component';
import { FindPlanComponent } from './plans-page/find-plan/find-plan.component';
import { PlansPageModule } from './plans-page/plans-page.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'plans', component: PlansPageComponent},
  { path: 'users/:username', component: ProfilePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'logout', component: SignOutComponent},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PlansPageModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
