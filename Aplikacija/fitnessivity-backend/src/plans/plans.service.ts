import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './plans.entity';
import { Model } from 'mongoose';
import { SubmitPlanDto } from './dtos/submit-plan.dto';
import { UserService } from 'src/user/user.service';
import { Mode } from 'fs';
import { PersonalPlan } from './personal-plans/personal-plan.entity';
import { WorkoutService } from 'src/workouts/workout.service';

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
        return query.exec();
      }

    async createPlan(dto: SubmitPlanDto, userId : string) : Promise<Plan>{
        const user = await this.userService.findById(userId);
        const workoutIds = await this.workoutService.createAndReturnIds(dto.workouts)
        const plan = {
            ...dto,
            creator: user.username,
            days: dto.workouts.length,
            submissionDate: Date.now(),
            workouts: workoutIds
        }
        return this.planModel.create(plan);
    }

    async createPersonalPlan(parentPlanId: string, userId: string): Promise<PersonalPlan>{
        const parentPlan = await this.planModel.findById(parentPlanId);
        const personalPlan = {
            name: parentPlan.name,
            creator: parentPlan.creator,
            type: parentPlan.type,
            genre: parentPlan.genre,
            workouts: parentPlan.workouts,
            days: parentPlan.days,
            picture: parentPlan.picture,
            planLink: parentPlan.planLink,
            user: (await this.userService.findById(userId)),
            latestWorkout: Date.now(),
            previousDay: 0,
            parentPlan: parentPlan
        }
        console.log(personalPlan);
        return this.personalPlanModel.create(personalPlan);
    }

    async getPlansByUser(username: string){
        console.log(username);
        const plans = await this.planModel.find({creator : `${username}`});
        return plans;
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