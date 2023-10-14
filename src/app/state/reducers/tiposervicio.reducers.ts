import { createReducer, on } from '@ngrx/store';
import { TipoServicioState } from 'src/app/core/models/state/TipoServicio.state';
import { loadTiposervicio, loadedTiposervicio } from '../actions/tiposervicio.actions';


export const initialState: TipoServicioState = {loading: false, cargado: false, tipoServicios: []};

export const tipoServicioReducer = createReducer(
  initialState,
  on(loadTiposervicio, (state) => {
    return {...state, loading:true}
  }),
  on(loadedTiposervicio, (state, {tipoServicios}) => {
    console.log("REDUCER: ", tipoServicios);
    return {...state, loading:false, cargado: true, tipoServicios}
  })
);