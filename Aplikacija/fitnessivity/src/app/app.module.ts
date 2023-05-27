import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { SearchPlansBarComponent } from './plans-page/search-plans-bar/search-plans-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { InfoPartComponent } from './profile-page/info-part/info-part.component';
import { MainPartComponent } from './profile-page/main-part/main-part.component';
import { FriendsComponentComponent } from './profile-page/main-part/friends-component/friends-component.component';
import { ProgramsComponentComponent } from './profile-page/main-part/programs-component/programs-component.component';
import { TrainingListComponent } from './profile-page/main-part/training-list/training-list.component';
import { PlanComponent } from './plan/plan.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { SubmitFormComponent } from './submit-page/submit-form/submit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    PlansPageComponent,
    SearchPlansBarComponent,
    FooterComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ErrorComponent,
    InfoPartComponent,
    MainPartComponent,
    FriendsComponentComponent,
    ProgramsComponentComponent,
    TrainingListComponent,
    PlanComponent,
    SubmitPageComponent,
    SubmitFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
