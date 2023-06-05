import { Component, Input } from '@angular/core';
import { Plan } from 'src/app/plan/plan.entity';

@Component({
  selector: 'app-plan-base-display',
  templateUrl: './plan-base-display.component.html',
  styleUrls: ['./plan-base-display.component.css']
})
export class PlanBaseDisplayComponent {
  @Input() plan!: Plan;
}
