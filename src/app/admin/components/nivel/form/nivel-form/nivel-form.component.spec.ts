import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelFormComponent } from './nivel-form.component';

describe('NivelFormComponent', () => {
  let component: NivelFormComponent;
  let fixture: ComponentFixture<NivelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NivelFormComponent]
    });
    fixture = TestBed.createComponent(NivelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
