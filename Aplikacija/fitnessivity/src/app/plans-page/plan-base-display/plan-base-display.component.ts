import { Component, Input } from '@angular/core';
import { Plan } from 'src/app/plan/plan.entity';

@Component({
  selector: 'app-plan-base-display',
  templateUrl: './plan-base-display.component.html',
  styleUrls: ['./plan-base-display.component.css']
})
export class PlanBaseDisplayComponent {
  @Input() plan!: Plan;
  imgSrc: string = 'http://10.241.185.86:3000/images/';
  submissionDays: number = 0;

  constructor(){  }

  ngOnInit(){
    this.imgSrc += this.plan._id;
    this.ageCalculate();
  }

  ageCalculate() {
    const currentDate = new Date(); 
    if (this.plan.submissionDate) {
      const submissionDate = new Date(this.plan.submissionDate);
      const time1 = currentDate.getTime();
      const time2 = submissionDate.getTime();
      const diffInMs = Math.abs(time1 - time2);
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      this.submissionDays = diffInDays;   
  }
}
}
