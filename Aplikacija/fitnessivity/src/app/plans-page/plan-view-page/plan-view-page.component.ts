import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { NotificationsService } from 'src/app/notifications.service';
import { User } from 'src/app/user/user.entity';

@Component({
  selector: 'app-plan-view-page',
  templateUrl: './plan-view-page.component.html',
  styleUrls: ['./plan-view-page.component.css']
})
export class PlanViewPageComponent {
  plan!: Plan;
  permissions: boolean = false;
  personalPlan?: Plan;
  username$! : BehaviorSubject<string>;
  user$! : BehaviorSubject<User | null>;
  isAdmin$ : BehaviorSubject<boolean | null>;
  imgSrc: string = '';

  constructor(
    private reportsService: ReportsService,
    private planService: PlanService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService){
      this.username$ = authService.username$;
      this.isAdmin$ = authService.isAdmin$;
      this.user$ = authService.user$;
    };
 
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.planService.getPlan(id).subscribe(p => {
        this.plan = p;
        this.imgSrc = 'http://10.241.185.86:3000/images/' + p._id;
        this.user$.subscribe(p => {
          console.log(p);
          const personalPlan = p?.personalPlans.find(plan => plan.parentPlan === this.plan._id);
          console.log(personalPlan);
          if (personalPlan)
            this.personalPlan = personalPlan;
        })
        this.username$.subscribe(q => {
          if (q === p.creator) {
            this.permissions = true;
          }
        });
      });
    });
  }

  onStarClick(){
    this.planService.recommendPlan(String(this.plan._id)).subscribe(() => this.notificationsService.ShowNotification("Successfully inverted plan recommendation"));
    this.plan.isRecommended = !this.plan.isRecommended;
  }

  reportPlan(){
    const p = {
      planId: String(this.plan._id),
      comment: "testcomment"
    }
    this.reportsService.reportPlan(p).subscribe((response) => {
      console.log('Report submitted successfully', response);
    },
    (error) => {
      console.error('Error submitting report', error);
    }
    );
  }

  addPlan() {
    this.planService.addPersonalPlan(String(this.plan._id)).subscribe(p => {
      this.notificationsService.ShowNotification("Plan added successfully");
      this.personalPlan = p;
      console.log(p);
      this.authService.checkAuth().subscribe(q => {
        this.authService.user$.next(q);
      })
    });
  }

  editPlan(){
    this.router.navigate(['/plans/edit/' + this.plan._id])
  }

  deletePlan(){
    this.planService.deletePlan(String(this.plan._id)).subscribe(()=>{
      this.notificationsService.ShowNotification("Deleted plan");
      this.router.navigate(['/']);
    });
  }

  unfollowPlan(){
    this.planService.removePersonalPlan(String(this.personalPlan!._id)).subscribe(() => this.notificationsService.ShowNotification("Unfollowed plan"));
    this.personalPlan = undefined;
  }
}
