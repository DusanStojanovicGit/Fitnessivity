import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snacBar:MatSnackBar) { }

  ShowNotification(message:string){
    this.snacBar.open(message,"",{
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'top',
    })
  }
}
