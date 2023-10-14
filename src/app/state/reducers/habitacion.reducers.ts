import { createReducer, on } from '@ngrx/store';
import { loadHabitacion, loadedHabitacion } from '../actions/habitacion.actions';
import { HabitacionState } from 'src/app/core/models/state/Habitacion.state';


export const initialState: HabitacionState = {loading: false, cargado: false, habitaciones: []};

export const habitacionReducer = createReducer(
  initialState,
  on(loadHabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedHabitacion, (state, {habitaciones}) => {
    console.log("REDUCER: ", habitaciones);
    return {...state, loading:false, cargado: true, habitaciones}
  })
);