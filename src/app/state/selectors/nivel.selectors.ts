import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { NivelState } from "src/app/core/models/state/Nivel.state";

export const selectNivelFeature = (state: AppState) => state.niveles;

export const selectNivelList = createSelector(
    selectNivelFeature,
    (state: NivelState) => state.niveles
);

export const selectNivelLoading = createSelector(
    selectNivelFeature,
    (state: NivelState) => state.loading
);

export const selectNivelCargado = createSelector(
    selectNivelFeature,
    (state: NivelState) => state.cargado
);