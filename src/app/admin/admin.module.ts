import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { DemoMaterialModule } from '../demo-material-module';
import { TipoHabitacionComponent } from './components/tipo-habitacion/tipo-habitacion.component';
import { TipoHabitacionFormComponent } from './components/tipo-habitacion/form/tipo-habitacion-form/tipo-habitacion-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitacionFormComponent } from './components/habitacion/form/habitacion-form/habitacion-form.component';
import { NivelComponent } from './components/nivel/nivel.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { EstadoHabitacionComponent } from './components/estado-habitacion/estado-habitacion.component';
import { EstadoHabitacionFormComponent } from './components/estado-habitacion/form/estado-habitacion-form/estado-habitacion-form.component';
import { TipoServicioFormComponent } from './components/tipo-servicio/form/tipo-servicio-form/tipo-servicio-form.component';
import { NivelFormComponent } from './components/nivel/form/nivel-form/nivel-form.component';


@NgModule({
  declarations: [
    HabitacionComponent,
    TipoHabitacionComponent,
    TipoHabitacionFormComponent,
    HabitacionFormComponent,
    NivelComponent,
    TipoServicioComponent,
    EstadoHabitacionComponent,
    EstadoHabitacionFormComponent,
    TipoServicioFormComponent,
    NivelFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
