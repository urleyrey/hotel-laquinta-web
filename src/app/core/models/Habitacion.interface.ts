import { Estadohabitacion } from "./Estadohabitacion.interface";
import { Nivel } from "./Nivel.interface";
import { Tipohabitacion } from "./Tipohabitacion.interface";
import { Tiposervicio } from "./Tiposervicio.interface";

export interface Habitacion {
    id:                 string;
    nombre:             string;
    estadoHabitacion:   Estadohabitacion;
    tipoHabitacion:     Tipohabitacion,
    servicios:          Tiposervicio[];
    nivel:              Nivel;
    descripcion:        string;
    valor:              number;
}