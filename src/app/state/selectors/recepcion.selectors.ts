import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { RecepcionState } from "src/app/core/models/state/Recepcion.state";

export const selectRecepcionFeature = (state: AppState) => state.recepciones;

export const selectRecepcionList = createSelector(
    selectRecepcionFeature,
    (state: RecepcionState) => state.recepciones
);

export const selectRecepcionLoading = createSelector(
    selectRecepcionFeature,
    (state: RecepcionState) => state.loading
);

export const selectRecepcionCargado = createSelector(
    selectRecepcionFeature,
    (state: RecepcionState) => state.cargado
);