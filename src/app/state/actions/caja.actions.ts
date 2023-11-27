import { createAction, props } from "@ngrx/store";
import { Caja } from "src/app/core/models/Caja.interface";

export const loadCaja = createAction(
    '[Caja] Load List'
);

export const loadedCaja = createAction(
    '[Caja] Loaded List Success',
    props<{cajas: Caja[]}>()
);

export const changeCaja = createAction(
    '[Caja] change List Success',
    props<{cargado: boolean}>()
);

export const loadedCajaStore = createAction(
    '[Caja] Loaded List Store Success'
);