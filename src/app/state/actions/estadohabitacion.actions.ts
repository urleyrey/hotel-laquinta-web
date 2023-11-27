import { createAction, props } from "@ngrx/store";
import { Estadohabitacion } from "src/app/core/models/Estadohabitacion.interface";

export const loadEstadohabitacion = createAction(
    '[Estado Habitacion] Load Estado Habitacion'
);

export const loadedEstadohabitacion = createAction(
    '[Estado Habitacion] Loaded Estado Habitacion Success',
    props<{estadoHabitaciones: Estadohabitacion[]}>()
);

export const changeEstadohabitacion = createAction(
    '[Estado Habitacion] change List Success',
    props<{cargado: boolean}>()
);

export const loadedEstadohabitacionStore = createAction(
    '[Estado Habitacion] Loaded List Store Success'
);