import { createAction, props } from "@ngrx/store";
import { Tipohabitacion } from "src/app/core/models/Tipohabitacion.interface";

export const loadTipohabitacion = createAction(
    '[Tipo Habitacion] Load List'
);

export const loadedTipohabitacion = createAction(
    '[Tipo Habitacion] Loaded List Success',
    props<{tipoHabitaciones: Tipohabitacion[]}>()
);