import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TipoHabitacionState } from "src/app/core/models/state/TipoHabitacion.state";

export const selectTipohabitacionFeature = (state: AppState) => state.tipoHabitaciones;

export const selectTipohabitacionList = createSelector(
    selectTipohabitacionFeature,
    (state: TipoHabitacionState) => state.tipoHabitaciones
);

export const selectTipohabitacionLoading = createSelector(
    selectTipohabitacionFeature,
    (state: TipoHabitacionState) => state.loading
);

export const selectTipohabitacionCargado = createSelector(
    selectTipohabitacionFeature,
    (state: TipoHabitacionState) => state.cargado
);