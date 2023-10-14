import { createReducer, on } from '@ngrx/store';
import { TipoHabitacionState } from 'src/app/core/models/state/TipoHabitacion.state';
import { loadTipohabitacion, loadedTipohabitacion } from '../actions/tipohabitacion.actions';


export const initialState: TipoHabitacionState = {loading: false, cargado: false, tipoHabitaciones: []};

export const tipoHabitacionReducer = createReducer(
  initialState,
  on(loadTipohabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedTipohabitacion, (state, {tipoHabitaciones}) => {
    console.log("REDUCER: ",tipoHabitaciones);
    return {...state, loading:false, cargado: true, tipoHabitaciones}
  })
);