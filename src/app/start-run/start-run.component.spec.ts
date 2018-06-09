import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRunComponent } from './start-run.component';

describe('StartRunComponent', () => {
  let component: StartRunComponent;
  let fixture: ComponentFixture<StartRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
