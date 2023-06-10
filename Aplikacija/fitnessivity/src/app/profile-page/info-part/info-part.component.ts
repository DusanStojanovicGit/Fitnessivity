import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/user/user.entity';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-info-part',
  templateUrl: './info-part.component.html',
  styleUrls: ['./info-part.component.css'],
})
export class InfoPartComponent {
  @Input() user!: User;
  @Input() permissions!: Observable<boolean>;
  imgSrc!: string;

  constructor(public dialog: MatDialog){}

  ngOnInit(){
    this.getSrc()
  }

  getSrc(){
    this.imgSrc = "http://localhost:3000/images/" + this.user._id;
  }

  openEditDialog(){
    this.dialog.open(EditDialogComponent, {
      data: { user: this.user, imgSrc: this.imgSrc },
    });
  }

}
