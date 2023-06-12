import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WorkoutComponent } from './workout/workout.component';
import { genres, types } from 'src/app/plan/plan-constants';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { ImagesService } from 'src/app/images/images.service';
import { Workout } from './workout/workout.entity';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css'],
})
export class CreatePlanComponent  {

  @Input() plan?: Plan;
  @ViewChild(WorkoutComponent) workoutComponent!: WorkoutComponent;
  types : string[];
  genres: string[];

  workouts: WorkoutComponent[] = [];

  formData!: FormGroup;

  imageURL!: string;
  maxFileSizeKB = 2200;

  inputSets: any[] = [{}];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private imageCompress: NgxImageCompressService,
    private formBuilder: FormBuilder,
    private imageService: ImagesService,
    private planService: PlanService
  ) {
    this.types = types;
    this.genres = genres;
  }

  ngOnInit(){
    this.createNewWorkout(this.plan?.workouts);
    if (this.plan){
      const p = this.plan;
      this.formData = new FormGroup({
        name: new FormControl(p.name),
        type: new FormControl(p.type),
        genre: new FormControl(p.genre),
        description: new FormControl(p.description),
        picture: new FormControl(null)
      });
      this.imageURL = String('http://10.241.185.86:3000/images/' + this.plan._id);
    }
    else{
      this.formData = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(''),
        genre: new FormControl(''),
        description: new FormControl(''),
        picture: new FormControl(null)
      });
    }
  }

  submitForm() {
    const submitForm = {
      name: String(this.formData.value.name),
      type: String(this.formData.value.type),
      genre: String(this.formData.value.genre),
      description: String(this.formData.value.description)
    }

    const formData = new FormData();
    const imageFileValue = this.formData.controls['picture'].value;

    const plan : Plan = {
      ...submitForm,
      workouts: []
    }

    this.workouts.forEach((p, index) => {
      const workoutDataWithIndex = {
        ...p.workoutData.value,
        day: index + 1,
      };
      plan.workouts.push(workoutDataWithIndex);
    });

    console.log(plan);

    this.planService.createPlan(plan).subscribe(planResponse => {
      const planId = planResponse._id;
      if (imageFileValue) {
        const imageFile = imageFileValue as File;
        formData.append('file', imageFile, planId);
      }
      this.imageService.uploadImage(formData);
    }, error => {

    });
   }


  showPreview(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.controls['picture'].setValue(file);
      this.compressAndShowImage(file);
    }
  }

  private async compressAndShowImage(file: File) {
    if (file.size > this.maxFileSizeKB * 1024) {
      alert(
        'File size exceeds the maximum allowed size of ' +
          this.maxFileSizeKB +
          'KB'
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const originalImage = reader.result as string;
      const quality = 100; 
      const compressedImage = await this.imageCompress.compressFile(
        originalImage,
        -1,
        quality,
        quality
      );

      const img = new Image();
      img.src = compressedImage;
      img.onload = () => {
        this.imageURL = compressedImage;
      };
    };
  }

createNewWorkout(workouts? : Workout[]) {
    let createWorkout = (workout?: Workout) => {
      const newWorkout = new WorkoutComponent(this.formBuilder, this.viewContainerRef);
      newWorkout.ngOnInit(workout);
      console.log('New WorkoutComponent created:', newWorkout);
      newWorkout.workoutRemoved.subscribe(() => {
        this.onWorkoutRemoved(newWorkout);
      });
    this.workouts.push(newWorkout);
    }
    if (workouts){
      workouts.forEach(p => {
        createWorkout(p);
      });
    }
    else {
      createWorkout();
    }
  }

  onWorkoutRemoved(workout: WorkoutComponent) {
    const index = this.workouts.indexOf(workout);
    if (index > -1) {
      this.workouts.splice(index, 1);
    }
  }

}
