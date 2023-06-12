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
import { EditPlanComponent } from './edit-plan/edit-plan.component';

@NgModule({
  declarations: [
    FindPlanComponent,
    MyPlansComponent,
    SearchPlansBarComponent,
    PlanBaseDisplayComponent,
    WorkoutComponent,
    CreatePlanComponent,
    EditPlanComponent,
  ],

  imports: [
    CommonModule,
    PlansPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PlanBaseDisplayComponent
  ]
})
export class PlansPageModule {}
