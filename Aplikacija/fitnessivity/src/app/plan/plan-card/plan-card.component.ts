import { Component, Input } from '@angular/core';
import { Plan } from '../plan.entity';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css']
})
export class PlanCardComponent {
  @Input() plan!: Plan;
  @Input() isOwner :boolean = false;

  getSrc(){
    if (this.plan.parentPlan){
      return "http://10.241.185.86:3000/images/" + this.plan.parentPlan;
    } else {
      return "http://10.241.185.86:3000/images/" + this.plan._id;
    }
  }
}
