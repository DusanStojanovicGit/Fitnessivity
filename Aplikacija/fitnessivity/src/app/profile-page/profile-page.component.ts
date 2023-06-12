import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../user/user.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SubmitWorkoutComponent } from '../submit-workout/submit-workout.component';
import { Plan } from '../plan/plan.entity';
import { PlanService } from '../plan/plan.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private planService: PlanService){
    };
  user$!: Observable<User>;
  userExists$ = new BehaviorSubject(false);
  permissions!: Observable<boolean>;
  createdPlans?: Plan[];

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username');
      this.planService.showUserPlans(String(username)).subscribe(p => {
        this.createdPlans = p;
      })
      this.user$ = this.userService.getUserByUsername(username);
      this.permissions = this.authService.isAdmin$.pipe(
        map((isAdmin) =>
          isAdmin || this.authService.userPermissions(String(username))
        )
      );
    }
  );   
  }
  openSubmitWorkoutDialog() {
    this.user$.subscribe((user: User) => {
      this.dialog.open(SubmitWorkoutComponent, {
        data: { user: user }
      });
    });
  }
}


