import { Component, Input } from '@angular/core';
import { Plan } from '../plan.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css']
})
export class PlanCardComponent {
  @Input() plan!: Plan;
  @Input() isOwner :boolean = false;

  constructor(private router: Router){}

  getSrc(){
    if (this.plan.parentPlan){
      return "http://10.241.185.86:3000/images/" + this.plan.parentPlan;
    } else {
      return "http://10.241.185.86:3000/images/" + this.plan._id;
    }
  }

  onOwnerClick(){
    this.router.navigate(['/users/' + this.plan.creator])
  }
  
  onPlanClick(){
    if (this.plan.parentPlan){
      this.router.navigate(['/plan/' + this.plan.parentPlan])
    }
    else {
      this.router.navigate(['/plan/' + this.plan._id])
    }
  }
}
