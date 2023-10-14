import { Caja } from "../Caja.interface";

export interface CajaState{
    loading: boolean,
    cargado: boolean,
    cajas: ReadonlyArray<Caja>
}