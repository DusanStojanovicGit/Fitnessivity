import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  findPlan(){

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
