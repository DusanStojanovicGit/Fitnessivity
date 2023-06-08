import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanViewPageComponent } from './plan-view-page.component';

describe('PlanViewPageComponent', () => {
  let component: PlanViewPageComponent;
  let fixture: ComponentFixture<PlanViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
