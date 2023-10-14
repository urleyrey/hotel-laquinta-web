import { createAction, props } from "@ngrx/store";
import { Estadohabitacion } from "src/app/core/models/Estadohabitacion.interface";

export const loadEstadohabitacion = createAction(
    '[Estado Habitacion List] Load Estado Habitacion'
);

export const loadedEstadohabitacion = createAction(
    '[Estado Habitacion List] Loaded Estado Habitacion Success',
    props<{estadoHabitaciones: Estadohabitacion[]}>()
);