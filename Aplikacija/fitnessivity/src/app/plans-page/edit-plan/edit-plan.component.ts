import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {
  plan!: Plan;
  constructor(private activatedRoute: ActivatedRoute,
    private planService: PlanService){
      this.planService.getPlan(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(p => {
        this.plan = p;
        console.log(this.plan);
      })
    }

  ngOnInit(){
    
  }
}
