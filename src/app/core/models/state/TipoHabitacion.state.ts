import { Tipohabitacion } from "../Tipohabitacion.interface";

export interface TipoHabitacionState{
    loading:            boolean,
    cargado:            boolean,
    tipoHabitaciones:   ReadonlyArray<Tipohabitacion>
}