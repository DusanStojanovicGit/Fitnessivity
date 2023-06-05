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
      TrainingName: ['', Validators.required],
      inputSets: this.formBuilder.array([]),

    });
    this.addInputs();
  }

  get inputSets() {
    return this.workoutData.get('inputSets') as FormArray;
  }

  addInputs() {
    this.inputSets.push(this.createInputSet());
  }

  createInputSet() {
    return this.formBuilder.group({
      TrainingName:[''],
      name: [''],
      rep: [''],
      set: [''],
      rest: [''],
      duration: [''],
    });
  }

  removeInputs(index: number) {
    this.inputSets.removeAt(index);
  }

  submitForm() {
    // Handle form submission
  }
}
