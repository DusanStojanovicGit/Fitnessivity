import { Test, TestingModule } from '@nestjs/testing';
import { SubmittedWorkoutService } from './submitted-workout.service';

describe('SubmittedWorkoutService', () => {
  let service: SubmittedWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmittedWorkoutService],
    }).compile();

    service = module.get<SubmittedWorkoutService>(SubmittedWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
