import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../plans-page/create-plan/workout/workout.entity';
import { NotificationsService } from '../notifications.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  rootUrl: string = 'http://10.241.185.86:3000/workouts/';

  constructor(private http: HttpClient,
    private notificationsService: NotificationsService)
    {}
    
  submitWorkout(workout: Workout, planId: string){
    return this.http.post<Workout>(this.rootUrl + 'submit/' + planId, workout, {withCredentials: true}).subscribe(p => {
      this.notificationsService.ShowNotification(`Succesfully submitted workout ${p.name}`);
    });
  }

  getLastWorkout(planId: string){
    return this.http.get<Workout>(this.rootUrl + 'getlastworkout/' + planId);
  }
}
