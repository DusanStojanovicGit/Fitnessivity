import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  submitForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      fields: this.fb.array([])
    });
  }

  addField(): void {
    const fieldsArray = this.submitForm.get('fields') as FormArray;
    fieldsArray.push(this.fb.control(''));
  }

  getFieldsControls() {
    return (this.submitForm.get('fields') as FormArray).controls;
  }
  OnSubmitForm() {
    const inputValues = this.getFieldsControls().map(control => control.value);
    this.http.post('http://localhost:4000/api/submit-inputs', inputValues).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
