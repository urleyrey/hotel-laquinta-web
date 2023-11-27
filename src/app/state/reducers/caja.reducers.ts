import { createReducer, on } from '@ngrx/store';
import { changeCaja, loadCaja, loadedCaja, loadedCajaStore } from '../actions/caja.actions';
import { CajaState } from 'src/app/core/models/state/Caja.state';


export const initialState: CajaState = {loading: false, cargado: false, cajas: []};

export const cajaReducer = createReducer(
  initialState,
  on(loadCaja, (state) => {
    return {...state, loading:true}
  }),
  on(loadedCaja, (state, {cajas}) => {
    return {...state, loading:false, cargado: true, cajas}
  }),on(changeCaja, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedCajaStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);