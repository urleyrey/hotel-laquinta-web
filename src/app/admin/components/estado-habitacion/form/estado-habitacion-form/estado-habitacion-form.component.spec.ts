import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoHabitacionFormComponent } from './estado-habitacion-form.component';

describe('EstadoHabitacionFormComponent', () => {
  let component: EstadoHabitacionFormComponent;
  let fixture: ComponentFixture<EstadoHabitacionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoHabitacionFormComponent]
    });
    fixture = TestBed.createComponent(EstadoHabitacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
