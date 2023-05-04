import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlansBarComponent } from './search-plans-bar.component';

describe('SearchPlansBarComponent', () => {
  let component: SearchPlansBarComponent;
  let fixture: ComponentFixture<SearchPlansBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPlansBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPlansBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
