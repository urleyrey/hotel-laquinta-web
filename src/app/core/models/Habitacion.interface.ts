import { Estadohabitacion } from "./Estadohabitacion.interface";
import { Tipohabitacion } from "./Tipohabitacion.interface";
import { Tiposervicio } from "./Tiposervicio.interface";

export interface Habitacion {
    id:                 string;
    nombre:             string;
    estadoHabitacion:   Estadohabitacion;
    tipoHabitacion:     Tipohabitacion,
    servicios:          Tiposervicio[];
    descripcion:        string;
}