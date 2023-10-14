import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { HabitacionState } from "src/app/core/models/state/Habitacion.state";

export const selectHabitacionFeature = (state: AppState) => state.habitaciones;

export const selectHabitacionList = createSelector(
    selectHabitacionFeature,
    (state: HabitacionState) => state.habitaciones
);

export const selectHabitacionLoading = createSelector(
    selectHabitacionFeature,
    (state: HabitacionState) => state.loading
);

export const selectHabitacionCargado = createSelector(
    selectHabitacionFeature,
    (state: HabitacionState) => state.cargado
);