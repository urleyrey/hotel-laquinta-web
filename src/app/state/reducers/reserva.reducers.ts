import { createReducer, on } from '@ngrx/store';
import { ReservaState } from 'src/app/core/models/state/Reserva.state';
import { loadReserva, loadedReserva } from '../actions/reserva.actions';


export const initialState: ReservaState = {loading: false, cargado: false, reservas: []};

export const reservaReducer = createReducer(
  initialState,
  on(loadReserva, (state) => {
    return {...state, loading:true}
  }),
  on(loadedReserva, (state, {reservas}) => {
    console.log("REDUCER: ", reservas);
    return {...state, loading:false, cargado: true, reservas}
  })
);