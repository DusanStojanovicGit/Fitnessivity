import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.css']
})
export class PlansPageComponent implements OnInit {
constructor() {}

ngOnInit(): void {
}
  plans = [
    {id:1 ,tip:'gym',name:'7 Days abs workout',img:'linkslike'},
    {id:2 ,tip:'hym',name:'7 Days arms workout',img:'linkslike'},
    {id:3 ,tip:'gym',name:'7 Days byceps workout',img:'linkslike'},
    {id:4 ,tip:'gym',name:'7 Days legs workout',img:'linkslike'},
    {id:5 ,tip:'hym',name:'7 Days arms workout',img:'linkslike'},
    {id:6 ,tip:'gym',name:'7 Days byceps workout',img:'linkslike'},
    {id:7 ,tip:'gym',name:'7 Days legs workout',img:'linkslike'},
    {id:8 ,tip:'hym',name:'7 Days arms workout',img:'linkslike'},
    {id:9 ,tip:'gym',name:'7 Days byceps workout',img:'linkslike'},
    {id:10 ,tip:'gym',name:'7 Days legs workout',img:'linkslike'},
    {id:2 ,tip:'hym',name:'7 Days arms workout',img:'linkslike'},
    {id:3 ,tip:'gym',name:'7 Days byceps workout',img:'linkslike'},
    {id:4 ,tip:'gym',name:'7 Days legs workout',img:'linkslike'}
  ];
tip = "nesto"
  searchText : string = '';



  onSearchTextEntered(searchValute:string){
    this.searchText = searchValute;
    console.log(this.searchText);
  }
}


