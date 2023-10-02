import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoHabitacionComponent } from './estado-habitacion.component';

describe('EstadoHabitacionComponent', () => {
  let component: EstadoHabitacionComponent;
  let fixture: ComponentFixture<EstadoHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoHabitacionComponent]
    });
    fixture = TestBed.createComponent(EstadoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
