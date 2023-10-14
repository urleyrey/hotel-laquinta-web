import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TipoServicioState } from "src/app/core/models/state/TipoServicio.state";

export const selectTiposervicioFeature = (state: AppState) => state.tipoServicios;

export const selectTiposervicioList = createSelector(
    selectTiposervicioFeature,
    (state: TipoServicioState) => state.tipoServicios
);

export const selectTiposervicioLoading = createSelector(
    selectTiposervicioFeature,
    (state: TipoServicioState) => state.loading
);

export const selectTiposervicioCargado = createSelector(
    selectTiposervicioFeature,
    (state: TipoServicioState) => state.cargado
);