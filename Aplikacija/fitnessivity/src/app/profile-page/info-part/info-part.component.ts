import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.entity';

@Component({
  selector: 'app-info-part',
  templateUrl: './info-part.component.html',
  styleUrls: ['./info-part.component.css'],
})
export class InfoPartComponent {
  @Input() user!: User;

  getSrc(){
    return "http://localhost:3000/images/" + this.user._id;
  }

  private fetchAccinfo ()
  {
    // this.http.get()
  }
}
