import { createReducer, on } from '@ngrx/store';
import { RecepcionState } from 'src/app/core/models/state/Recepcion.state';
import { loadRecepcion, loadedRecepcion } from '../actions/recepcion.actions';


export const initialState: RecepcionState = {loading: false, cargado: false, recepciones: []};

export const recepcionReducer = createReducer(
  initialState,
  on(loadRecepcion, (state) => {
    return {...state, loading:true}
  }),
  on(loadedRecepcion, (state, {recepciones}) => {
    console.log("REDUCER: ", recepciones);
    return {...state, loading:false, cargado: true, recepciones}
  })
);