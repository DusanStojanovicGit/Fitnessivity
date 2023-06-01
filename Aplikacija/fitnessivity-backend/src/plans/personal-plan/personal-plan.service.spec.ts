import { Test, TestingModule } from '@nestjs/testing';
import { PersonalPlanService } from './personal-plan.service';

describe('PersonalPlanService', () => {
  let service: PersonalPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalPlanService],
    }).compile();

    service = module.get<PersonalPlanService>(PersonalPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
