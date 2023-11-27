import { createAction, props } from "@ngrx/store";
import { Tipohabitacion } from "src/app/core/models/Tipohabitacion.interface";

export const loadTipohabitacion = createAction(
    '[Tipo Habitacion] Load List'
);

export const loadedTipohabitacion = createAction(
    '[Tipo Habitacion] Loaded List Success',
    props<{tipoHabitaciones: Tipohabitacion[]}>()
);

export const changeTipohabitacion = createAction(
    '[Tipo Habitacion] change List Success',
    props<{cargado: boolean}>()
);

export const loadedTipohabitacionStore = createAction(
    '[Tipo Habitacion] Loaded List Store Success'
);