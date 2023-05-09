import { Component, OnInit ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-plans-bar',
  templateUrl: './search-plans-bar.component.html',
  styleUrls: ['./search-plans-bar.component.css']
})
export class SearchPlansBarComponent implements OnInit {

  constructor(){}

  ngOnInit():void{
  }

  enteredSearcheValue:string = '';

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChange(){
    this.searchTextChanged.emit(this.enteredSearcheValue);
  }
}
