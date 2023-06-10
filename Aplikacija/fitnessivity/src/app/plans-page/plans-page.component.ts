import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.css']
})
export class PlansPageComponent implements OnInit {
constructor() {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


