import { createReducer, on } from '@ngrx/store';
import { changeEstadohabitacion, loadEstadohabitacion, loadedEstadohabitacion, loadedEstadohabitacionStore } from '../actions/estadohabitacion.actions';
import { EstadoHabitacionState } from '../../core/models/state/Estadohabitacion.state';


export const initialState: EstadoHabitacionState = {loading: false, cargado: false, estadoHabitaciones: []};

export const estadoHabitacionReducer = createReducer(
  initialState,
  on(loadEstadohabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedEstadohabitacion, (state, {estadoHabitaciones}) => {
    return {...state, loading:false, cargado: true, estadoHabitaciones}
  }),on(changeEstadohabitacion, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedEstadohabitacionStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);