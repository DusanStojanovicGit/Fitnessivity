import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPartComponent } from './info-part.component';

describe('InfoPartComponent', () => {
  let component: InfoPartComponent;
  let fixture: ComponentFixture<InfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
