import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MovimientoState } from "src/app/core/models/state/Movimiento.state";

export const selectMovimientoFeature = (state: AppState) => state.movimientos;

export const selectMovimientoList = createSelector(
    selectMovimientoFeature,
    (state: MovimientoState) => state.movimientos
);

export const selectMovimientoLoading = createSelector(
    selectMovimientoFeature,
    (state: MovimientoState) => state.loading
);

export const selectMovimientoCargado = createSelector(
    selectMovimientoFeature,
    (state: MovimientoState) => state.cargado
);