import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

const MENUADMIN = [
  { state: 'habitacion', name: 'Habitacion', type: 'link', icon: 'night_shelter' },
  { state: 'tipo-habitacion', name: 'Tipo Habitacion', type: 'link', icon: 'living' },
  { state: 'nivel', name: 'Nivel', type: 'link', icon: 'apartment' },
  { state: 'tipo-servicio', name: 'Tipo Servicio', type: 'link', icon: 'room_service' },
  { state: 'estado-habitacion', name: 'Estado Habitacion', type: 'link', icon: 'flaky' },
];

const MENUDASHBOARD = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard' }
];

const MENURESERVA = [
  { state: 'calendario', name: 'Calendario', type: 'link', icon: 'calendar_today' },
  { state: 'reserva', name: 'Reservar', type: 'link', icon: 'assignment' },
  { state: 'recepcion', name: 'Recepcion', type: 'link', icon: 'room_service' },
];

const MENUCLIENTE = [
  { state: 'cliente', name: 'Cliente', type: 'link', icon: 'person' },
];

const MENUCAJA = [
  { state: 'producto', name: 'Producto/Servicio', type: 'link', icon: 'ballot' },
  { state: 'movimiento', name: 'Movimientos', type: 'link', icon: 'attach_money' },
  { state: 'Caja', name: 'Caja Menor', type: 'link', icon: 'local_atm' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
  getMenuAdmin(): Menu[] {
    return MENUADMIN;
  }
  getMenuDashboard(): Menu[] {
    return MENUDASHBOARD;
  }
  getMenuReserva(): Menu[] {
    return MENURESERVA;
  }
  getMenuCliente(): Menu[] {
    return MENUCLIENTE;
  }

  getMenuCaja(): Menu[] {
    return MENUCAJA;
  }
}
