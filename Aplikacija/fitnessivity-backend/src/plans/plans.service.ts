import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './plans.entity';
import { Model } from 'mongoose';
import { SubmitPlanDto } from './dtos/submit-plan.dto';
import { UserService } from 'src/user/user.service';
import { Mode } from 'fs';
import { PersonalPlan } from './plans.entity';
import { WorkoutService } from 'src/workouts/workout.service';
import { stringify } from 'querystring';
import { UpdatePlanDto } from './dtos/update-plan.dto';

@Injectable()
export class PlansService {
    constructor(
        @InjectModel('Plan')
        private readonly planModel : Model<Plan>,

        private readonly userService : UserService,
        private readonly workoutService: WorkoutService,

        @InjectModel('PersonalPlan')
        private readonly personalPlanModel: Model<PersonalPlan>
    ){};

    async searchPrograms(criteria: any): Promise<Plan[]> {
        const query = this.planModel.find();
        if (criteria.type) {
            const types = criteria.type.split(','); 
            query.where('type').in(types);
        }
        if (criteria.genre) {
          query.where('genre').equals(criteria.genre);
        }
        if (criteria.sortBy) {
          query.sort(criteria.sortBy);
        }
        if (criteria.search) {
            const searchTerms = criteria.search.split(' ');
            const andConditions = searchTerms.map(term => {
              const termRegex = new RegExp(term, 'i');
              return { $or: [{ name: termRegex }, { creator: termRegex }] };
            });
            query.and(andConditions);
          }
        return query.exec();
      }

    async createPlan(dto: SubmitPlanDto, userId : string) : Promise<Plan>{
        const user = await this.userService.findById(userId);
        const plan = {
            ...dto,
            creator: user.username,
            days: dto.workouts.length,
            submissionDate: Date.now(),
            workoutsCompleted: 0,
        }
        return this.planModel.create(plan);
    }

    async recommendPlan(permissions: boolean, id: string){
        if (permissions){
            const plan = await this.planModel.findById(id);
            return this.planModel.findByIdAndUpdate(id, {isRecommended: !plan.isRecommended});
        }
        return new MethodNotAllowedException();
    }

    async getRecommendedPlans(){
        const plans = await this.planModel.find({isRecommended: true}).exec();
        console.log(plans);
        return plans;
    }
    
      

    async incrementWorkoutsCompleted(id: string){
        console.log(id);
        return this.planModel.findByIdAndUpdate(id, {$inc: {workoutsCompleted: 1}});
    }

    
    findById(id: string): Promise<Plan>{
        return this.planModel.findById(id);
    }

    async getPlansByUser(username: string){
        console.log(username);
        const plans = await this.planModel.find({creator : `${username}`});
        return plans;
    }

    async updatePlan(dto: UpdatePlanDto) : Promise<Plan>{
        const existingPlan = await this.planModel.findById(dto.planLink);
        const updatedPlan = {
            ...existingPlan,
            ...dto,
        };
        const updatedPlanInstance = await this.planModel.findByIdAndUpdate(
            dto.planLink,
            updatedPlan,
            { new: true },
         );
        return updatedPlanInstance;
    }
    
    async deletePlan(planId: string){
        const deletedPlan = await this.planModel.deleteOne({ _id: planId });
        return deletedPlan;
    }

    async deletePersonalPlan(planId: string){
        const deletedPlan = await this.personalPlanModel.deleteOne({_id: planId});
        return deletedPlan;
    }
}

/*submit training -> ()

>Frontend selektuje dan koji je na redu
>salje se na taj plan request
>request autofill podatke sa poslednjim treningom u tom danu. 
>Ako ne postoji ?
    > fill se sa podacima iz parent treninga!
>Submit button ->
    >Ako korisnik menja ili dodaje vezbe ?
        >korisnik se pita da li zeli da usnimi promenu vezbe u originalnom planu ?
            > ako zeli, snima se originalni plan!!
    >Originalnom planu se dodaje uradjen trening
    >Datum objave postaje datum poslednjeg treninga za dan
    >Dan se inkrementira za 1.
*/

/*
Napraviti novog usera ->
Modifikovati usera
    napraviti plan sa slikom (samo create plan)
    modifikovati plan (modify plan)
    add taj isti plan (create personal plan)
    submitaj 3 workouts (retrieveLastWorkout, submitWorkout)
    ulogovati drugi nalog(login)
    submitaj 1 workout (retrieveLastWorkout, submitWorkout)
    obrisati personalni plan ()
    obrisati plan 

    ocekivani rezultati pre obrisa: 
        >plan na dobrom danu
        >submissionDate uspesan
        >dodaju se parentplanu submitted workouts
*/ // find latestWorkout 