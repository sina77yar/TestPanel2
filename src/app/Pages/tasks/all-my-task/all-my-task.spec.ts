import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMyTask } from './all-my-task';

describe('AllMyTask', () => {
  let component: AllMyTask;
  let fixture: ComponentFixture<AllMyTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllMyTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMyTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
