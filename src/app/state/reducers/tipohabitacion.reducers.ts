import { createReducer, on } from '@ngrx/store';
import { TipoHabitacionState } from 'src/app/core/models/state/TipoHabitacion.state';
import { changeTipohabitacion, loadTipohabitacion, loadedTipohabitacion, loadedTipohabitacionStore } from '../actions/tipohabitacion.actions';


export const initialState: TipoHabitacionState = {loading: false, cargado: false, tipoHabitaciones: []};

export const tipoHabitacionReducer = createReducer(
  initialState,
  on(loadTipohabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedTipohabitacion, (state, {tipoHabitaciones}) => {
    return {...state, loading:false, cargado: true, tipoHabitaciones}
  }),on(changeTipohabitacion, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedTipohabitacionStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);