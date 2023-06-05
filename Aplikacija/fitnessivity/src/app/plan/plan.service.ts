import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable, tap } from 'rxjs';
import { Plan } from './plan.entity';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }
  private rootUrl = 'http://localhost:3000/plans/';

  findPlans(searchCriteria: {
    type?: string[],
    genre?: string,
    sortBy?: string,
    search?: string
  }): Observable<Plan[]> {
    let params = new HttpParams();
  
    for (const key in searchCriteria) {
      const value = searchCriteria[key as keyof typeof searchCriteria];
      if (value !== undefined) {
        if (key === "type" && Array.isArray(value)) {
          params = params.set(key, value.join(','));
        } else {
          if (typeof value === 'string') {
            params = params.set(key, value);
          }
        }
      }
    }
    const url = this.rootUrl + 'search';
    const finalUrl = `${url}?${params.toString()}`;
    console.log('Final URL:', finalUrl);
  
    return this.http.get<Plan[]>('http://localhost:3000/plans/search?').pipe(
      tap(plans => {
        console.log('Received plans:', plans);
        plans.forEach((plan, index) => {
          console.log(`Plan ${index} name:`, plan.name);
          console.log(`Plan ${index} genre:`, plan.genre);
          // Add more properties to log as needed
        });
      })
    );
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
