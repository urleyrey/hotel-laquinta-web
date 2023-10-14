import { createAction, props } from "@ngrx/store";
import { Habitacion } from "src/app/core/models/Habitacion.interface";

export const loadHabitacion = createAction(
    '[Habitacion] Load List'
);

export const loadedHabitacion = createAction(
    '[Habitacion] Loaded List Success',
    props<{habitaciones: Habitacion[]}>()
);