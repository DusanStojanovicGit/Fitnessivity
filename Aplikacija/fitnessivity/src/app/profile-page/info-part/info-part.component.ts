import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info-part',
  templateUrl: './info-part.component.html',
  styleUrls: ['./info-part.component.css'],
})
export class InfoPartComponent {
  firstname: string = 'Dusan';
  lastname: string = 'Stojanovic';
  bio: string = 'bio sam nekad fit';


  private fetchAccinfo ()
  {
    // this.http.get()
  }
}
