import { Component } from '@angular/core';
import { PlanService } from '../plan/plan.service';
import { Plan } from '../plan/plan.entity';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  plans! : Plan[];

  constructor(private planService: PlanService)
  {}

  ngOnInit(){
    this.planService.getRecommendedPlans().subscribe(p => this.plans = p);
  }

}
