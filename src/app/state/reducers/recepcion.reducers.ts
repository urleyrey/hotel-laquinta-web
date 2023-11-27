import { createReducer, on } from '@ngrx/store';
import { RecepcionState } from 'src/app/core/models/state/Recepcion.state';
import { changeRecepcion, loadRecepcion, loadedRecepcion, loadedRecepcionStore } from '../actions/recepcion.actions';


export const initialState: RecepcionState = {loading: false, cargado: false, recepciones: []};

export const recepcionReducer = createReducer(
  initialState,
  on(loadRecepcion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedRecepcion, (state, {recepciones}) => {
    return {...state, loading:false, cargado: true, recepciones}
  }),on(changeRecepcion, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedRecepcionStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);