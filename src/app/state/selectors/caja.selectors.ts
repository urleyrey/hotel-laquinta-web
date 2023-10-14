import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CajaState } from "src/app/core/models/state/Caja.state";

export const selectCajaFeature = (state: AppState) => state.cajas;

export const selectCajaList = createSelector(
    selectCajaFeature,
    (state: CajaState) => state.cajas
);

export const selectCajaLoading = createSelector(
    selectCajaFeature,
    (state: CajaState) => state.loading
);

export const selectCajaCargado = createSelector(
    selectCajaFeature,
    (state: CajaState) => state.cargado
);