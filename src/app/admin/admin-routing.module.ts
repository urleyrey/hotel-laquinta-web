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
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente/form/cliente-form.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormComponent } from './components/producto/form/producto-form.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { MovimientoFormComponent } from './components/movimiento/form/movimiento-form.component';
import { CajaComponent } from './components/caja/caja.component';
import { CajaFormComponent } from './components/caja/form/caja-form.component';

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
    path: 'reserva/form/:id/:range/:duration',
    component: ReservaFormComponent
  },
  {
    path: 'recepcion',
    component: RecepcionComponent
  },
  {
    path: 'recepcion/form/:id/:range/:duration',
    component: RecepcionFormComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'cliente/form/:id',
    component: ClienteFormComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'producto/form/:id',
    component: ProductoFormComponent
  },
  {
    path: 'movimiento',
    component: MovimientoComponent
  },
  {
    path: 'movimiento/form/:id',
    component: MovimientoFormComponent
  },
  {
    path: 'caja',
    component: CajaComponent
  },
  {
    path: 'caja/form/:id',
    component: CajaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
