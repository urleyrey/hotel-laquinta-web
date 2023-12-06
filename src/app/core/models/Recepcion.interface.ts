import { Habitacion } from "./Habitacion.interface";
import { Reserva } from "./Reserva.interface";

export interface Recepcion {
    id:         string;
    fechaInicio:string;
    fechaFin:   string;
    habitacion: Habitacion;
    numeroPersonas: number;
    valor: number;
    observaciones: string;
    motivoViaje: string;
    reserva: Reserva;
    estado: string;
    descuento: number;
    adicional: number;
    cliente: string;
}