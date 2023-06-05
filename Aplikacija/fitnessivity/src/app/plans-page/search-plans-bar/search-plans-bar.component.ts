import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { genres, types, filters } from 'src/app/plan/plan-constants';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { PlanService } from 'src/app/plan/plan.service';
import { Plan } from 'src/app/plan/plan.entity';

@Component({
  selector: 'app-search-plans-bar',
  templateUrl: './search-plans-bar.component.html',
  styleUrls: ['./search-plans-bar.component.css']
})
export class SearchPlansBarComponent implements OnInit {
  selectedFilter: string = '';
  selectedTypes: string[] = [];
  selectedGenre: string = '';
  searchControl = new FormControl();

  filters: any;
  genres: string[];
  types: string[];
  private plansSubscription!: Subscription;
  plans$! : Observable<Plan[]>;

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly planService : PlanService){
    this.genres = genres;
    this.types = types;
    this.filters = filters;
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.fetchPlans());
  }

  ngOnInit():void{
    this.fetchPlans();
  }

  toggleGenreSelection(genre : string){
    if (this.selectedGenre == genre){
      this.selectedGenre = '';
    } else{
      this.selectedGenre = genre;
    }
    this.fetchPlans();
  }

  toggleTypeSelection(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.fetchPlans();
  }

  fetchPlans(){
    const searchCriteria: {
      type?: string[],
      genre?: string,
      sortBy?: string,
      search?: string,
    } = {};
    
    if (this.selectedTypes && this.selectedTypes.length > 0) {
      searchCriteria.type = this.selectedTypes;
    }
    
    if (this.selectedGenre && this.selectedGenre !== '') {
      searchCriteria.genre = this.selectedGenre;
    }
    
    if (this.selectedFilter && this.selectedFilter !== '') {
      searchCriteria.sortBy = this.selectedFilter;
    }
    
    if (this.searchControl.value && this.searchControl.value !== '') {
      searchCriteria.search = this.searchControl.value;
    }
    this.plans$ = this.planService.findPlans(searchCriteria);
    this.plansSubscription = this.plans$.subscribe();
  }

  
}
