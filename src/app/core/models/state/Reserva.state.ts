import { Reserva } from "../Reserva.interface";

export interface ReservaState{
    loading:    boolean,
    cargado:    boolean,
    reservas:   ReadonlyArray<Reserva>
}