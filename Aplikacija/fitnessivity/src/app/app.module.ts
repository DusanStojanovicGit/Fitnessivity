import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { MaterialModule } from './mat.module';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { InfoPartComponent } from './profile-page/info-part/info-part.component';
import { UserModule } from './user/user.module';
import { MiniNavBarComponent } from './plans-page/mini-nav-bar/mini-nav-bar.component';
import { PlanCardComponent } from './plan/plan-card/plan-card.component';
import { PlansPageModule } from './plans-page/plans-page.module';
import { ReportsComponent } from './reports/reports.component';
import { EditDialogComponent } from './profile-page/info-part/edit-dialog/edit-dialog.component';
import { SubmitWorkoutComponent } from './submit-workout/submit-workout.component';
import { PlanViewPageComponent } from './plans-page/plan-view-page/plan-view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    PlansPageComponent,
    FooterComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ErrorComponent,
    InfoPartComponent,

    RegisterPageComponent,
    MiniNavBarComponent,
    PlanCardComponent,
    ReportsComponent,
    EditDialogComponent,
    SubmitWorkoutComponent,
    PlanViewPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    UserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PlansPageModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
