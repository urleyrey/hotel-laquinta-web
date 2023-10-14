import { createAction, props } from "@ngrx/store";
import { Movimiento } from "src/app/core/models/movimiento.interface";

export const loadMovimiento = createAction(
    '[Movimiento] Load List'
);

export const loadedMovimiento = createAction(
    '[Movimiento] Loaded List Success',
    props<{movimientos: Movimiento[]}>()
);