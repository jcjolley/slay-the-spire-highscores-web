import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayScoresComponent } from './display-scores.component';

describe('DisplayScoresComponent', () => {
  let component: DisplayScoresComponent;
  let fixture: ComponentFixture<DisplayScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
