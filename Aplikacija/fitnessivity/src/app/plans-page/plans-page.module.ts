import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansPageRoutingModule } from './plans-page-routing.module';
import { FindPlanComponent } from './find-plan/find-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';


@NgModule({
  declarations: [
    FindPlanComponent,
    MyPlansComponent
  ],
  imports: [
    CommonModule,
    PlansPageRoutingModule,
  ]
})
export class PlansPageModule { }
