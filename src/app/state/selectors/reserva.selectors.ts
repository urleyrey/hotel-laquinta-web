import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ReservaState } from "src/app/core/models/state/Reserva.state";

export const selectReservaFeature = (state: AppState) => state.reservas;

export const selectReservaList = createSelector(
    selectReservaFeature,
    (state: ReservaState) => state.reservas
);

export const selectReservaLoading = createSelector(
    selectReservaFeature,
    (state: ReservaState) => state.loading
);

export const selectReservaCargado = createSelector(
    selectReservaFeature,
    (state: ReservaState) => state.cargado
);