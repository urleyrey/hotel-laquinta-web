import { createReducer, on } from '@ngrx/store';
import { NivelState } from 'src/app/core/models/state/Nivel.state';
import { loadNivel, loadedNivel, changeNivel, loadedNivelStore } from '../actions/nivel.actions';


export const initialState: NivelState = {loading: false, cargado: false, niveles: []};

export const nivelReducer = createReducer(
  initialState,
  on(loadNivel, (state) => {
    return {...state, loading:true}
  }),
  on(loadedNivel, (state, {niveles}) => {
    return {...state, loading:false, cargado: true, niveles}
  }),on(changeNivel, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedNivelStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);