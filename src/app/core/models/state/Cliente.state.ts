import { Cliente } from "../Cliente.interface";

export interface ClienteState{
    loading: boolean,
    cargado: boolean,
    clientes: ReadonlyArray<Cliente>
}