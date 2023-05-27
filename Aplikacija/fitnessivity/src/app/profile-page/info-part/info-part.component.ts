import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-part',
  templateUrl: './info-part.component.html',
  styleUrls: ['./info-part.component.css'],
})
export class InfoPartComponent {
  @Input() fullname: string = '';
  @Input() bio: string = '';


  private fetchAccinfo ()
  {
    // this.http.get()
  }
}
