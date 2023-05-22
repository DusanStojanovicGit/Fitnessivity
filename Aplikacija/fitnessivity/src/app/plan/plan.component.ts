import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
    plans = [
      {id:1 ,tip:'gym',name:'7 Days abs workout',img:'linkslike'},
      {id:2 ,tip:'hym',name:'7 Days arms workout',img:'linkslike'},
      {id:3 ,tip:'gym',name:'7 Days byceps workout',img:'linkslike'},
      {id:4 ,tip:'gym',name:'7 Days legs workout',img:'linkslike'}
    ];
    tip = "nesto"

    }
