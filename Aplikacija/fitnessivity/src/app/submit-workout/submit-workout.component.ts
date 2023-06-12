import { Component, Inject } from '@angular/core';
import { User } from '../user/user.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from '../plan/plan.entity';
import { Exercise, Workout } from '../plans-page/create-plan/workout/workout.entity';
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
  selectedIndex: number = 0;
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
    this.workoutService.submitWorkout(this.selectedWorkout, String(this.selectedPlan._id));
  }

  showNextWorkout(){
    this.workoutService.getLastWorkout(String(this.selectedPlan._id)).subscribe(w =>{
      this.selectedWorkout = w;
      this.exercises = w.exercises;
      this.selectedIndex = w.day-1;
    });
  }

  onWorkoutChange(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
    this.selectedWorkout = this.selectedPlan.workouts[this.selectedIndex];
    this.exercises = this.selectedWorkout.exercises;
   console.log(this.selectedWorkout);
  }
}
