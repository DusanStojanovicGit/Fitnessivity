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
    return "http://localhost:3000/images/" + this.plan._id;
  }
}
