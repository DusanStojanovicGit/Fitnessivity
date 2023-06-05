import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBaseDisplayComponent } from './plan-base-display.component';

describe('PlanBaseDisplayComponent', () => {
  let component: PlanBaseDisplayComponent;
  let fixture: ComponentFixture<PlanBaseDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanBaseDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanBaseDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
