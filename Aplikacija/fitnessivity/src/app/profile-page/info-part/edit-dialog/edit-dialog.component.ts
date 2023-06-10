import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user/user.entity';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.user = data.user;
    this.editUserForm = new FormGroup({
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username),
      name: new FormControl(this.user.name),
      bio: new FormControl(this.user.bio),
      type: new FormControl(this.user.type),
      gender: new FormControl(this.user.gender),
    });
  }

  fileChangeEvent(fileInput: any) {
    // Handle file change event here
  }

  submitForm() {
    
  }
}