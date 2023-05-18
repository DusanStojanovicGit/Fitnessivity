import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsComponentComponent } from './programs-component.component';

describe('ProgramsComponentComponent', () => {
  let component: ProgramsComponentComponent;
  let fixture: ComponentFixture<ProgramsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
