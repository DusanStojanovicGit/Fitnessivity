import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormBuilder, FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { WorkoutComponent } from './workout/workout.component';
import { HttpClient } from '@angular/common/http';



interface FormControls {
  planName: FormControl;
  type: FormControl;
  genre: FormControl;
  description: FormControl;
  picture: FormControl;
}
@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css'],
})
export class CreatePlanComponent  {


  @ViewChild(WorkoutComponent) workoutComponent!: WorkoutComponent;




  formData = new FormGroup<FormControls>({
    planName: new FormControl(''),
    type: new FormControl(''),
    genre: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl(null)
  });


  submitForm() {
    const formData = new FormData();

    Object.entries(this.formData.controls).forEach(([key, controlValue]) => {
      formData.append(key, controlValue.value);
    });

    console.log('Form data:', formData);


    console.log('Workout data:', JSON.stringify(this.workoutComponent.workoutData.value));
   }





          //DEO ZA PROVERU DA LI JE SLIKA ODGOVARAJUCE VELICINE

  imageURL!: string;
  maxFileSizeKB = 2200; // Maximum allowed file size in KB
  maxWidth = 1400; // Maximum allowed image width
  maxHeight = 1000; // Maximum allowed image height

  inputSets: any[] = [{}]; // Initialize with one empty object for the first set of inputs

  constructor(
    private imageCompress: NgxImageCompressService,
    private formBuilder: FormBuilder,private http: HttpClient
  ) {}


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

        if (width > this.maxWidth || height > this.maxHeight) {
          alert(
            'Image resolution exceeds the maximum allowed dimensions of ' +
              this.maxWidth +
              'x' +
              this.maxHeight
          );
          return;
        }

        this.imageURL = compressedImage;
      };
    };
  }



}
