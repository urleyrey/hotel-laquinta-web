import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ClienteState } from "src/app/core/models/state/Cliente.state";

export const selectClienteFeature = (state: AppState) => state.clientes;

export const selectClienteList = createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.clientes
);

export const selectClienteLoading = createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.loading
);

export const selectClienteCargado = createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.cargado
);