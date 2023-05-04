import { NgModule } from '@angular/core';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'plans', component: PlansPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
