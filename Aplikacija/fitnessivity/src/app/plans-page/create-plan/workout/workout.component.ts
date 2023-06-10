import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  @Output() workoutRemoved = new EventEmitter<void>();
  @Input() workoutData!: FormGroup;
  @Input() isModel: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    console.log('WorkoutComponent ngOnInit called.');
    if (!this.workoutData) {
      this.workoutData = this.formBuilder.group({
        name: ['', Validators.required],
        exercises: this.formBuilder.array([]),
      });
      this.addInputs();
    }
    console.log('workoutData after ngOnInit:', this.workoutData);
  }

  get exercises() {
    return this.workoutData.get('exercises') as FormArray;
  }

  addInputs() {
    this.exercises.push(this.createInputSet());
  }

  createInputSet() {
    return this.formBuilder.group({
      name: [''],
      reps: [''],
      weight: [''],
      sets: [''],
      rest: [''],
      length: [''],
    });
  }

  removeInputs(index: number) {
    this.exercises.removeAt(index);
  }

  destroyComponent() {
    this.workoutRemoved.emit();
  }

  submitForm() {
    // Handle form submission
  }
}
