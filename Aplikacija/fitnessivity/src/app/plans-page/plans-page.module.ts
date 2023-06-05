import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../mat.module';
import { PlansPageRoutingModule } from './plans-page-routing.module';
import { FindPlanComponent } from './find-plan/find-plan.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { SearchPlansBarComponent } from './search-plans-bar/search-plans-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FindPlanComponent,
    MyPlansComponent,
    SearchPlansBarComponent
  ],
  imports: [
    CommonModule,
    PlansPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlansPageModule { }
