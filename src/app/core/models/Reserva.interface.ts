import { Habitacion } from "./Habitacion.interface";

export interface Reserva {
    id:         string;
    fechaInicio:string;
    fechaFin:   string;
    habitacion: Habitacion;
    numeroPersonas: number;
    valor: number;
    observaciones: string;
    motivoViaje: string;
    estado: string;
}