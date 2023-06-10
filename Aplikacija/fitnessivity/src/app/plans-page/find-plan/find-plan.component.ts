import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-find-plan',
  templateUrl: './find-plan.component.html',
  styleUrls: ['./find-plan.component.css']
})
export class FindPlanComponent {
  plans$! : Observable<Plan[]>;
  selectedGenre: string = '';

  constructor(
    private planService: PlanService,
    private route: ActivatedRoute,
    
    ) {
      this.route.queryParams.subscribe(params => {
        this.selectedGenre = params['genre'];
      });
    }

  ngOnInit() {
    this.plans$ = this.planService.plans$;
  }

}
