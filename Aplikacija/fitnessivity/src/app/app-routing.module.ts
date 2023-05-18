import { NgModule } from '@angular/core';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'plans', component: PlansPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  {path: '**', component: ErrorComponent} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
