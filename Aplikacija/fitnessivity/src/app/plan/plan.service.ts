import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Plan } from './plan.entity';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private _plansSource: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([]);
  plans$: Observable<Plan[]> = this._plansSource.asObservable();

  constructor(private http: HttpClient) { }
  rootUrl = 'http://10.241.185.86:3000/plans/';

  syncPlans(plans: Plan[]) {
    this._plansSource.next(plans);
  }

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
  
    return this.http.get<Plan[]>(finalUrl).pipe()
  }
    
  showUserPlans(username: string){
    this.http.get<Plan[]>(this.rootUrl + username);
  }

  createPlan(plan: Plan){
    return this.http.post<Plan>(this.rootUrl + "submitplan", plan, {withCredentials: true}).pipe(
      tap(p => p._id)
    );
  }

  addPersonalPlan(planId: string){
    return this.http.post<Plan>(this.rootUrl +"addPlan/" + planId, null, {withCredentials: true}).pipe();
  }

  recommendPlan(planId: string){
    return this.http.put<Plan>(this.rootUrl + "recommendplan/" + planId, null, {withCredentials: true}).pipe();
  }

  getRecommendedPlans(){
    return this.http.get<Plan[]>(this.rootUrl + 'recommended').pipe();
  }

  modifyPlan(){

  }

  deletePlan(){

  }

  getPlan(id: string | null){
    return this.http.get<Plan>(this.rootUrl + "get/" + id);
  }
}
