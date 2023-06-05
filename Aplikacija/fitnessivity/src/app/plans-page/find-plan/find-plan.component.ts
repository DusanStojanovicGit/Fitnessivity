import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';

@Component({
  selector: 'app-find-plan',
  templateUrl: './find-plan.component.html',
  styleUrls: ['./find-plan.component.css']
})
export class FindPlanComponent {
  plans$! : Observable<Plan[]>;

  constructor(private planService: PlanService) {}

  ngOnInit() {
    this.plans$ = this.planService.plans$;
  }

}
