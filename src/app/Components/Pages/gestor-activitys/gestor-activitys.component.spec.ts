import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorActivitysComponent } from './gestor-activitys.component';

describe('GestorActivitysComponent', () => {
  let component: GestorActivitysComponent;
  let fixture: ComponentFixture<GestorActivitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorActivitysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorActivitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
