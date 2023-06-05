import { CreatePlanComponent } from './create-plan/create-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansPageRoutingModule } from './plans-page-routing.module';
import { FindPlanComponent } from './find-plan/find-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { WorkoutComponent } from './create-plan/workout/workout.component';


@NgModule({
  declarations: [
    FindPlanComponent,
    MyPlansComponent,
    WorkoutComponent,
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    PlansPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlansPageModule { }
