import { createAction, props } from "@ngrx/store";
import { Movimiento } from "src/app/core/models/movimiento.interface";

export const loadMovimiento = createAction(
    '[Movimiento] Load List'
);

export const loadedMovimiento = createAction(
    '[Movimiento] Loaded List Success',
    props<{movimientos: Movimiento[]}>()
);

export const changeMovimiento = createAction(
    '[Movimiento] change List Success',
    props<{cargado: boolean}>()
);

export const loadedMovimientoStore = createAction(
    '[Movimiento] Loaded List Store Success'
);