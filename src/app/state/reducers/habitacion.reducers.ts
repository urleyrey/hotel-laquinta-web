import { createReducer, on } from '@ngrx/store';
import { changeHabitacion, loadHabitacion, loadedHabitacion, loadedHabitacionStore } from '../actions/habitacion.actions';
import { HabitacionState } from 'src/app/core/models/state/Habitacion.state';


export const initialState: HabitacionState = {loading: false, cargado: false, habitaciones: []};

export const habitacionReducer = createReducer(
  initialState,
  on(loadHabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedHabitacion, (state, {habitaciones}) => {
    return {...state, loading:false, cargado: true, habitaciones}
  }),on(changeHabitacion, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedHabitacionStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);