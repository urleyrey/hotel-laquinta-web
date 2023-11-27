import { createReducer, on } from '@ngrx/store';
import { changeMovimiento, loadMovimiento, loadedMovimiento, loadedMovimientoStore } from '../actions/movimiento.actions';
import { MovimientoState } from 'src/app/core/models/state/Movimiento.state';


export const initialState: MovimientoState = {loading: false, cargado: false, movimientos: []};

export const movimientoReducer = createReducer(
  initialState,
  on(loadMovimiento, (state) => {
    return {...state, loading:true}
  }),
  on(loadedMovimiento, (state, {movimientos}) => {
    return {...state, loading:false, cargado: true, movimientos}
  }),on(changeMovimiento, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedMovimientoStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);