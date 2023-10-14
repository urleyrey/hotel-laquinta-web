import { Habitacion } from "./Habitacion.interface";

export interface Reserva {
    id:         string;
    fechaInicio:string;
    horaInicio: string;
    fechaFin:   string;
    horaFin:    string;
    habitacion: Habitacion;
    numeroPersonas: number;
    valor: number;
    observaciones: string;
    motivoViaje: string;
    estado: string;
}