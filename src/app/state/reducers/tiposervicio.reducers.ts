import { createReducer, on } from '@ngrx/store';
import { TipoServicioState } from 'src/app/core/models/state/TipoServicio.state';
import { changeTiposervicio, loadTiposervicio, loadedTiposervicio, loadedTiposervicioStore } from '../actions/tiposervicio.actions';


export const initialState: TipoServicioState = {loading: false, cargado: false, tipoServicios: []};

export const tipoServicioReducer = createReducer(
  initialState,
  on(loadTiposervicio, (state) => {
    return {...state, loading:true}
  }),
  on(loadedTiposervicio, (state, {tipoServicios}) => {
    return {...state, loading:false, cargado: true, tipoServicios}
  }),on(changeTiposervicio, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedTiposervicioStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);