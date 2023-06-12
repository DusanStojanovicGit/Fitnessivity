import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDisplayComponent } from './workout-display.component';

describe('WorkoutDisplayComponent', () => {
  let component: WorkoutDisplayComponent;
  let fixture: ComponentFixture<WorkoutDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
