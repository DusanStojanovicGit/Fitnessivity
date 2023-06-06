import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormBuilder, FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { WorkoutComponent } from './workout/workout.component';
import { HttpClient } from '@angular/common/http';
import { genres, types } from 'src/app/plan/plan-constants';
import { Plan } from 'src/app/plan/plan.entity';
import { PlanService } from 'src/app/plan/plan.service';
import { ImagesService } from 'src/app/images/images.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css'],
})
export class CreatePlanComponent  {


  @ViewChild(WorkoutComponent) workoutComponent!: WorkoutComponent;
  types : string[];
  genres: string[];

  formData = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    genre: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl(null)
  });

  imageURL!: string;
  maxFileSizeKB = 2200; 

  inputSets: any[] = [{}];

  constructor(
    private imageCompress: NgxImageCompressService,
    private formBuilder: FormBuilder,
    private imageService: ImagesService,
    private planService: PlanService
  ) {
    this.types = types;
    this.genres = genres;
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
      workouts: this.workoutComponent.workoutData.value,
    }

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
    console.log('Workout data:', JSON.stringify(this.workoutComponent.workoutData.value));
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
      const quality = 100; // Compression quality (0-100), lower value means higher compression
      const compressedImage = await this.imageCompress.compressFile(
        originalImage,
        -1,
        quality,
        quality
      );

      // Get image dimensions
      const img = new Image();
      img.src = compressedImage;
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // if (width > this.maxWidth || height > this.maxHeight) {
        //   alert(
        //     'Image resolution exceeds the maximum allowed dimensions of ' +
        //       this.maxWidth +
        //       'x' +
        //       this.maxHeight
        //   );
        //   return;
        // }

        this.imageURL = compressedImage;
      };
    };
  }



}
