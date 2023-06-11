import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkoutComponent } from './submit-workout.component';

describe('SubmitWorkoutComponent', () => {
  let component: SubmitWorkoutComponent;
  let fixture: ComponentFixture<SubmitWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitWorkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
