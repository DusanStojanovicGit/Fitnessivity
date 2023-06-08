import { CreatePlanComponent } from './create-plan/create-plan.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../mat.module';
import { PlansPageRoutingModule } from './plans-page-routing.module';
import { FindPlanComponent } from './find-plan/find-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { SearchPlansBarComponent } from './search-plans-bar/search-plans-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanBaseDisplayComponent } from './plan-base-display/plan-base-display.component';
import { WorkoutComponent } from './create-plan/workout/workout.component';
import { PlanViewPageComponent } from './plan-view-page/plan-view-page.component';
import { WorkoutViewComponent } from './plan-view-page/workout-view/workout-view.component';

@NgModule({
  declarations: [
    FindPlanComponent,
    MyPlansComponent,
    SearchPlansBarComponent,
    PlanBaseDisplayComponent,
    WorkoutComponent,
    CreatePlanComponent,
    PlanViewPageComponent,
    WorkoutViewComponent,
  ],

  imports: [
    CommonModule,
    PlansPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PlansPageModule {}
