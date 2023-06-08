import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-plan-view-page',
  templateUrl: './plan-view-page.component.html',
  styleUrls: ['./plan-view-page.component.css']
})
export class PlanViewPageComponent {
  plan!: Plan;
  permissions: boolean = false;
  username$! : BehaviorSubject<string>;
  imgSrc: string = '';

  constructor(
    private planService: PlanService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService){
      this.username$ = authService.username$;
    };
 
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.planService.getPlan(id).subscribe(p => {
        this.plan = p;
        this.imgSrc = 'http://10.241.185.86:3000/images/' + p._id;
        this.username$.subscribe(q => {
          if (q === p.creator) {
            this.permissions = true;
          }
        });
      });
    });
  }
}
