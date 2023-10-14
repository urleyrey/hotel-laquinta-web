import { Habitacion } from "./Habitacion.interface";
import { Reserva } from "./Reserva.interface";

export interface Recepcion {
    id:         string;
    fechaInicio:string;
    horaInicio: string;
    fechaFin:   string;
    horaFin:    string;
    habitacion: Habitacion;
    numeroPersonas: number;
    valor: number;
    descuento: number;
    adicional: number;
    observaciones: string;
    motivoViaje: string;
    reserva: Reserva;
    estado: string;
}