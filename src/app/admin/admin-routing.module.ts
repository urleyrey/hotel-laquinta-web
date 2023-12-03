import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { TipoHabitacionComponent } from './components/tipo-habitacion/tipo-habitacion.component';
import { TipoHabitacionFormComponent } from './components/tipo-habitacion/form/tipo-habitacion-form/tipo-habitacion-form.component';
import { HabitacionFormComponent } from './components/habitacion/form/habitacion-form/habitacion-form.component';
import { NivelComponent } from './components/nivel/nivel.component';
import { NivelFormComponent } from './components/nivel/form/nivel-form/nivel-form.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { TipoServicioFormComponent } from './components/tipo-servicio/form/tipo-servicio-form/tipo-servicio-form.component';
import { EstadoHabitacionComponent } from './components/estado-habitacion/estado-habitacion.component';
import { EstadoHabitacionFormComponent } from './components/estado-habitacion/form/estado-habitacion-form/estado-habitacion-form.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaFormComponent } from './components/reserva/reserva-form/reserva-form.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { RecepcionFormComponent } from './components/recepcion/recepcion-form/recepcion-form.component';

const routes: Routes = [
  {
    path: 'habitacion',
    component: HabitacionComponent
  },
  {
    path: 'habitacion/form/:id',
    component: HabitacionFormComponent
  },
  {
    path: 'tipo-habitacion',
    component: TipoHabitacionComponent
  },
  {
    path: 'tipo-habitacion/form/:id',
    component: TipoHabitacionFormComponent
  },
  {
    path: 'nivel',
    component: NivelComponent
  },
  {
    path: 'nivel/form/:id',
    component: NivelFormComponent
  },
  {
    path: 'tipo-servicio',
    component: TipoServicioComponent
  },
  {
    path: 'tipo-servicio/form/:id',
    component: TipoServicioFormComponent
  },
  {
    path: 'estado-habitacion',
    component: EstadoHabitacionComponent
  },
  {
    path: 'estado-habitacion/form/:id',
    component: EstadoHabitacionFormComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  },
  {
    path: 'reserva/form/:id',
    component: ReservaFormComponent
  },
  {
    path: 'recepcion',
    component: RecepcionComponent
  },
  {
    path: 'recepcion/form/:id',
    component: RecepcionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
