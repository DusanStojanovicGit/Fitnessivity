import { Component, Inject } from '@angular/core';
import { User } from '../user/user.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from '../plan/plan.entity';
import { Exercise, Workout } from '../workout/workout.entity';
import { WorkoutService } from '../service/workout.service';

@Component({
  selector: 'app-submit-workout',
  templateUrl: './submit-workout.component.html',
  styleUrls: ['./submit-workout.component.css']
})
export class SubmitWorkoutComponent {
  user!: User;
  selectedPlan: Plan;
  selectedWorkout!: Workout;
  exercises!: [Exercise];
  selectedWorkoutIndex: number = 0;
  selectedPlanIndex: number = 0;
  constructor(
    public dialogRef: MatDialogRef<SubmitWorkoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user : User},
    private workoutService: WorkoutService,
  )
  {
    this.user = data.user;
    this.selectedPlan = this.user.personalPlans[0];
    this.showNextWorkout();
  }

  onSubmit(){
    let submitWorkout = this.selectedWorkout;
    if ('_id' in this.selectedWorkout) {
      const { _id, ...rest } = this.selectedWorkout;
      submitWorkout = rest;
    } 
    this.workoutService.submitWorkout(submitWorkout, String(this.selectedPlan._id));
  }

  showNextWorkout(){
    this.workoutService.getLastWorkout(String(this.selectedPlan._id)).subscribe(w =>{
      this.selectedWorkout = w;
      this.exercises = w.exercises;
      this.selectedWorkoutIndex = w.day-1;
    });
  }

  onWorkoutChange(selectedIndex: number) {
    this.selectedWorkoutIndex = selectedIndex;
    this.selectedWorkout = this.selectedPlan.workouts[this.selectedWorkoutIndex];
    this.exercises = this.selectedWorkout.exercises;
   console.log(this.selectedWorkout);
  }

  onPlanChange(selectedIndex: number){
    this.selectedPlanIndex = selectedIndex;
    this.selectedPlan = this.user.personalPlans[this.selectedPlanIndex];
    this.showNextWorkout();
  }
}
