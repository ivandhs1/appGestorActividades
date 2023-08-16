import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminateActivityComponent } from './eliminate-activity.component';

describe('EliminateActivityComponent', () => {
  let component: EliminateActivityComponent;
  let fixture: ComponentFixture<EliminateActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminateActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
