import { Estadohabitacion } from "../Estadohabitacion.interface";

export interface EstadoHabitacionState{
    loading: boolean,
    cargado: boolean,
    estadoHabitaciones: ReadonlyArray<Estadohabitacion>
}