import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  workoutData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.workoutData = this.formBuilder.group({
      name: ['', Validators.required],
      exercises: this.formBuilder.array([]),
    });
    this.addInputs();
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
      sets: [''],
      rest: [''],
      length: [''],
    });
  }

  removeInputs(index: number) {
    this.exercises.removeAt(index);
  }

  submitForm() {
    // Handle form submission
  }
}
