import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarActivityComponent } from './asignar-activity.component';

describe('AsignarActivityComponent', () => {
  let component: AsignarActivityComponent;
  let fixture: ComponentFixture<AsignarActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
