import { Component, Inject } from '@angular/core';
import { User } from '../user/user.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from '../plan/plan.entity';
import { Exercise, Workout } from '../plans-page/create-plan/workout/workout.entity';

@Component({
  selector: 'app-submit-workout',
  templateUrl: './submit-workout.component.html',
  styleUrls: ['./submit-workout.component.css']
})
export class SubmitWorkoutComponent {
  user!: User;
  selectedPlan: Plan;
  selectedWorkout: Workout;
  exercises: [Exercise];

  constructor(
    public dialogRef: MatDialogRef<SubmitWorkoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user : User},
  )
  {
    this.user = data.user;
    this.selectedPlan = this.user.personalPlans[0];
    this.selectedWorkout = this.selectedPlan.workouts[0];
    this.exercises = this.selectedWorkout.exercises;
    console.log(this.exercises);
  }
}
