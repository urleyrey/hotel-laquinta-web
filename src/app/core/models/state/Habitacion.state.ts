import { Habitacion } from "../Habitacion.interface";

export interface HabitacionState{
    loading:        boolean,
    cargado:        boolean,
    habitaciones:   ReadonlyArray<Habitacion>
}