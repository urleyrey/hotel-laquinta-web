import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFormComponent } from './reserva-form.component';

describe('HabitacionFormComponent', () => {
  let component: ReservaFormComponent;
  let fixture: ComponentFixture<ReservaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaFormComponent]
    });
    fixture = TestBed.createComponent(ReservaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
