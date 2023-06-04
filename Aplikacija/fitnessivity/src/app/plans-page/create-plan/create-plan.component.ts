import { Component } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css'],
})
export class CreatePlanComponent {
  imageURL!: string;
  maxFileSizeKB = 2200; // Maximum allowed file size in KB
  maxWidth = 1400; // Maximum allowed image width
  maxHeight = 600; // Maximum allowed image height

  inputSets: any[] = [{}]; // Initialize with one empty object for the first set of inputs


  constructor(private imageCompress: NgxImageCompressService) {}


  addInputs() {
    this.inputSets.push({}); // Add a new empty object for each new set of inputs
  }

  removeInputs() {
    this.inputSets.pop(); // Add a new empty object for each new set of inputs
  }

  // collectData() {
  //   console.log(this.inputSets);
  //   // Process the data as needed
  // }

  showPreview(event: any) {
    const file = event.target.files[0];
    if (file) {
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
      const quality = 60; // Compression quality (0-100), lower value means higher compression
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
