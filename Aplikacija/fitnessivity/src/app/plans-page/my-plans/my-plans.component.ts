import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css'],
})
export class MyPlansComponent {
  plans!: Plan[];
  username$!: BehaviorSubject<string>;
  selectedGenre: string = '';

  constructor(private planService: PlanService,
     private route: ActivatedRoute,
     private authService: AuthService) {
      this.username$ = authService.username$;
    }
    
  ngOnInit() {
    this.username$.subscribe(p => {
      this.planService.showUserPlans(p).subscribe(q => {
        this.plans = q;
      })
    })
  }
}
