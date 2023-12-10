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
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaFormComponent } from './components/reserva/reserva-form/reserva-form.component';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { RecepcionFormComponent } from './components/recepcion/recepcion-form/recepcion-form.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente/form/cliente-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProductoComponent } from './components/producto/producto.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { ProductoFormComponent } from './components/producto/form/producto-form.component';
import { MovimientoFormComponent } from './components/movimiento/form/movimiento-form.component';
import { CajaComponent } from './components/caja/caja.component';
import { CajaFormComponent } from './components/caja/form/caja-form.component';


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
    ReservaComponent,
    ReservaFormComponent,
    RecepcionComponent,
    RecepcionFormComponent,
    ClienteComponent,
    ClienteFormComponent,
    CalendarioComponent,
    ProductoComponent,
    MovimientoComponent,
    ProductoFormComponent,
    MovimientoFormComponent,
    CajaComponent,
    CajaFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgSelectModule,
    FullCalendarModule
  ]
})
export class AdminModule { }
