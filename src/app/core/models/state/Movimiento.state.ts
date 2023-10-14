import { Movimiento } from "../movimiento.interface";

export interface MovimientoState{
    loading:    boolean,
    cargado:    boolean,
    movimientos:ReadonlyArray<Movimiento>
}