import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { Plan } from './plan.entity';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }
  private rootUrl = 'http://localhost:3000/plans/';

  findPlans(searchCriteria: {
    type?: string,
    genre?: string,
    sortBy?: string,
    search?: string
  }): Observable<Plan[]> {
    let params = new HttpParams();
    
    for (const key in searchCriteria) {
      const value = searchCriteria[key as keyof typeof searchCriteria];
      if (value !== undefined) {
        params = params.set(key, value);
      }
    }

    return this.http.get<Plan[]>(this.rootUrl + 'search', { params });
  }

  showUserPlans(){
    
  }

  createPlan(){
    
  }

  addPersonalPlan(){

  }

  modifyPlan(){

  }

  deletePlan(){

  }
}
