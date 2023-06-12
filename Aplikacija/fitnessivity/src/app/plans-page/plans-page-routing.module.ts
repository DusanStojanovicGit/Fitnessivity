import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPlanComponent } from './find-plan/find-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { PlansPageComponent } from './plans-page.component';
import { ErrorComponent } from '../error/error.component';
import { loggedInGuard, ownerGuard } from '../auth/guards';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

const routes: Routes = [
  {
    path: 'plans',
    component: PlansPageComponent,
    children: [
      { path: '', component: FindPlanComponent },
      { path: 'myPlans', component: MyPlansComponent },
      { path: 'create', component: CreatePlanComponent, canActivate: [loggedInGuard('/plans/create')] },
      { path: 'edit/:id', component: EditPlanComponent, canActivate:[loggedInGuard(''), ownerGuard()]},
      { path: '**', component: ErrorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansPageRoutingModule {}
