import { createReducer, on } from '@ngrx/store';
import { changeCliente, loadCliente, loadedCliente, loadedClienteStore } from '../actions/cliente.actions';
import { ClienteState } from 'src/app/core/models/state/Cliente.state';


export const initialState: ClienteState = {loading: false, cargado: false, clientes: []};

export const clienteReducer = createReducer(
  initialState,
  on(loadCliente, (state) => {
    return {...state, loading:true}
  }),
  on(loadedCliente, (state, {clientes}) => {
    return {...state, loading:false, cargado: true, clientes}
  }),on(changeCliente, (state, {cargado}) => {
    return {...state, cargado:cargado}
  }),on(loadedClienteStore, (state) => {
    return {...state, loading:false, cargado: true}
  })
);