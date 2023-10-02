import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHabitacionComponent } from './tipo-habitacion.component';

describe('TipoHabitacionComponent', () => {
  let component: TipoHabitacionComponent;
  let fixture: ComponentFixture<TipoHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoHabitacionComponent]
    });
    fixture = TestBed.createComponent(TipoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
