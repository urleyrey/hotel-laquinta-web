import { createReducer, on } from '@ngrx/store';
import { loadCaja, loadedCaja } from '../actions/caja.actions';
import { CajaState } from 'src/app/core/models/state/Caja.state';


export const initialState: CajaState = {loading: false, cargado: false, cajas: []};

export const cajaReducer = createReducer(
  initialState,
  on(loadCaja, (state) => {
    return {...state, loading:true}
  }),
  on(loadedCaja, (state, {cajas}) => {
    console.log("REDUCER: ",cajas);
    return {...state, loading:false, cargado: true, cajas}
  })
);