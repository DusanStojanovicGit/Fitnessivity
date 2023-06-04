import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPlanComponent } from './find-plan.component';

describe('FindPlanComponent', () => {
  let component: FindPlanComponent;
  let fixture: ComponentFixture<FindPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
