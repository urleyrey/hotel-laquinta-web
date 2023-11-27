import { createAction, props } from "@ngrx/store";
import { Habitacion } from "src/app/core/models/Habitacion.interface";

export const loadHabitacion = createAction(
    '[Habitacion] Load List'
);

export const loadedHabitacion = createAction(
    '[Habitacion] Loaded List Success',
    props<{habitaciones: Habitacion[]}>()
);

export const changeHabitacion = createAction(
    '[Habitacion] change List Success',
    props<{cargado: boolean}>()
);

export const loadedHabitacionStore = createAction(
    '[Habitacion] Loaded List Store Success'
);