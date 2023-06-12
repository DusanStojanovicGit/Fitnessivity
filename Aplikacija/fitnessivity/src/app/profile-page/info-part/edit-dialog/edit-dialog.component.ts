import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user/user.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { UserService } from 'src/app/user/user.service';
import { ImagesService } from 'src/app/images/images.service';
import { genres, types } from 'src/app/plan/plan-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  user!: User;
  editUserForm: FormGroup;
  @ViewChild('UploadFileInput') uploadFileInput!: ElementRef;
  myfilename = 'Select File';
  imageSrc! : string;
  maxFileSizeKB = 2200;


  types = types;
  genres = genres;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, imgSrc: string },
    private imageCompress: NgxImageCompressService,
    private userService: UserService,
    private imageService: ImagesService,
    private router: Router
  ) {
    this.user = data.user;
    this.editUserForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.email,
        Validators.required,
        Validators.pattern( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]),
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]),
      bio: new FormControl(this.user.bio),
      type: new FormControl(this.user.type),
      gender: new FormControl(this.user.gender),
      picture: new FormControl(null)
    });
    this.imageSrc = data.imgSrc;


  }

  fileChangeEvent(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editUserForm.controls['picture'].setValue(file);
      this.compressAndShowImage(file);
    }
  }

  async compressAndShowImage(file: File) {
    if (file.size > this.maxFileSizeKB * 1024) {
      alert(
        'File size exceeds the maximum allowed size of ' + this.maxFileSizeKB + 'KB'
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const originalImage = reader.result as string;
      const quality = 70;
      const compressedImage = await this.imageCompress.compressFile(
        originalImage,
        -1,
        quality,
        quality
      );

      const img = new Image();
      img.src = compressedImage;
      img.onload = () => {
        this.imageSrc = compressedImage;
      };
    };
  }

  showErrors(fieldName: string): boolean {
    const field = this.editUserForm.get(fieldName);
    return !!(field && field.dirty && field.touched && field.errors && Object.keys(field.errors).length > 0);
  }

  submitForm() {
    const submitForm = {
      email: String(this.editUserForm.value.email),
      username: String(this.editUserForm.value.username),
      name: String(this.editUserForm.value.name),
      bio: String(this.editUserForm.value.bio),
      type: String(this.editUserForm.value.type),
      gender: String(this.editUserForm.value.gender),
    }

    const imageFileValue = this.editUserForm.controls['picture'].value;
    const user = this.user;

    Object.keys(submitForm).forEach(key => {
      if (user.hasOwnProperty(key)
        && submitForm[key as keyof typeof submitForm] === user[key as keyof User]) {
        delete submitForm[key as keyof typeof submitForm];
      }
    });
    console.log(submitForm);


    if (submitForm || imageFileValue) {
      if (submitForm) {
        this.userService.updateUser(submitForm).subscribe((response) => {
          const newUsername = response.username;

          if (imageFileValue) {
            const formData = new FormData();
            const imageFile = imageFileValue as File;
            formData.append('file', imageFile, this.user._id);
            this.imageService.uploadImage(formData);
          }
          if (newUsername != this.user.username) {
            this.router.navigate(['users', newUsername]);
          } else {
            // location.reload();
          }
        });
      }
    }

  }
}
