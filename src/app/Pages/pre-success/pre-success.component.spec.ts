import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSuccessComponent } from './pre-success.component';

describe('PreSuccessComponent', () => {
  let component: PreSuccessComponent;
  let fixture: ComponentFixture<PreSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
