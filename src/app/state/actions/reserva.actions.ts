import { createAction, props } from "@ngrx/store";
import { Reserva } from "src/app/core/models/Reserva.interface";

export const loadReserva = createAction(
    '[Reserva] Load List'
);

export const loadedReserva = createAction(
    '[Reserva] Loaded List Success',
    props<{reservas: Reserva[]}>()
);

export const changeReserva = createAction(
    '[Reserva] change List Success',
    props<{cargado: boolean}>()
);

export const loadedReservaStore = createAction(
    '[Reserva] Loaded List Store Success'
);