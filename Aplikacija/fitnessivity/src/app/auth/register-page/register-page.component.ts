import { NotificationsService } from 'src/app/notifications.service';
import { MatchPassword } from '../validators/match-password';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RedirectService } from 'src/app/redirect.service';
import { genres } from 'src/app/plan/plan-constants';
import { NgxImageCompressService } from 'ngx-image-compress';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.entity';
import { ImagesService } from 'src/app/images/images.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  errorMessage: string = '';
  types = genres;
  user!: User;
  imageSrc: string = 'assets/profile-picture.webp';
  gender = ["Other", "Male", "Female"];
  showSecondForm: boolean = false;
  secondForm: FormGroup;
  maxFileSizeKB = 2200;
  myfilename = 'Select File';
  regForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]),

      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]),

      email: new FormControl('', [Validators.email, Validators.required, Validators.pattern( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),

      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private authService: AuthService,
    private matchPassword: MatchPassword,
    private redirectService: RedirectService,
    private imageCompress: NgxImageCompressService,
    private userService: UserService,
    private imagesService: ImagesService,
    private NotificationsService:NotificationsService) {
      this.secondForm = new FormGroup({
        bio: new FormControl(''),
        fitnessType: new FormControl(''),
        gender: new FormControl(''),
        picture: new FormControl(null)
      });
    }
  ngOnInit(): void {

  }

  showErrors(fieldName: string): boolean {
    const field = this.regForm.get(fieldName);
    return !!(field && field.dirty && field.touched && field.errors && Object.keys(field.errors).length > 0);
  }

  onAccountCreate() {
    if (this.regForm.valid) {
      const formValue = {
        name : String(this.regForm.value.fullName),
        username : String(this.regForm.value.username),
        email : String(this.regForm.value.email),
        password : String(this.regForm.value.password),
      }
      this.authService.createAccount(formValue).subscribe(
        (res) => {
        this.showSecondForm = true;
        this.user = res;
        this.NotificationsService.ShowNotification("Account created successfully");

        },
        (error) => {
          this.errorMessage = error.error.message;
        });
    }
  }

  onSecondFormSubmit() {
    if (this.secondForm.valid) {
      const formValue = {
        bio: String(this.secondForm.value.bio),
        type: String(this.secondForm.value.fitnessType),
        gender: String(this.secondForm.value.gender),
      }
      const imageFileValue = this.secondForm.controls['picture'].value;

      this.userService.updateUser(formValue).subscribe(
        (res) => {
          this.user = res;
          this.redirectService.loginRegisterRedirect(res);
          if (imageFileValue) {
            const formData = new FormData();
            const imageFile = imageFileValue as File;
            formData.append('file', imageFile, this.user._id);
            this.imagesService.uploadImage(formData);
            this.NotificationsService.ShowNotification("Data updated successfully");

          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  clearErrorMessage(){
    this.errorMessage = '';
  }

  fileChangeEvent(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.secondForm.controls['picture'].setValue(file);
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
}
