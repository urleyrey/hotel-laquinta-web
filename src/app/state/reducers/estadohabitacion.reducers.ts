import { createReducer, on } from '@ngrx/store';
import { loadEstadohabitacion, loadedEstadohabitacion } from '../actions/estadohabitacion.actions';
import { EstadoHabitacionState } from '../../core/models/state/Estadohabitacion.state';


export const initialState: EstadoHabitacionState = {loading: false, cargado: false, estadoHabitaciones: []};

export const estadoHabitacionReducer = createReducer(
  initialState,
  on(loadEstadohabitacion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedEstadohabitacion, (state, {estadoHabitaciones}) => {
    console.log("REDUCER: ",estadoHabitaciones);
    return {...state, loading:false, cargado: true, estadoHabitaciones}
  })
);