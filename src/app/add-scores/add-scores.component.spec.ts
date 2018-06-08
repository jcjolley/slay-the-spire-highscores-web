import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoreComponent } from './add-scores.component';

describe('AddScoresComponent', () => {
  let component: AddScoreComponent;
  let fixture: ComponentFixture<AddScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddScoreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
