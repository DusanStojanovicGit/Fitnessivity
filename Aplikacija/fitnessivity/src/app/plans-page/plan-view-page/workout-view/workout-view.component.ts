import { Component, Input } from '@angular/core';
import { Workout } from '../../create-plan/workout/workout.entity';

@Component({
  selector: 'app-workout-view',
  templateUrl: './workout-view.component.html',
  styleUrls: ['./workout-view.component.css']
})
export class WorkoutViewComponent {
  @Input() workout!: Workout;
}
