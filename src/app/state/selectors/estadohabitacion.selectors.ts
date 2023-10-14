import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EstadoHabitacionState } from "src/app/core/models/state/Estadohabitacion.state";

export const selectEstadohabitacionFeature = (state: AppState) => state.estadoHabitaciones;

export const selectEstadohabitacionList = createSelector(
    selectEstadohabitacionFeature,
    (state: EstadoHabitacionState) => state.estadoHabitaciones
);

export const selectEstadohabitacionLoading = createSelector(
    selectEstadohabitacionFeature,
    (state: EstadoHabitacionState) => state.loading
);

export const selectEstadohabitacionCargado = createSelector(
    selectEstadohabitacionFeature,
    (state: EstadoHabitacionState) => state.cargado
);