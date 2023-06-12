import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Plan } from 'src/app/plan/plan.entity';
import { Workout } from 'src/app/workout/workout.entity';

@Component({
  selector: 'app-workout-display',
  templateUrl: './workout-display.component.html',
  styleUrls: ['./workout-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkoutDisplayComponent {
  @Input() workout!: Workout;
}