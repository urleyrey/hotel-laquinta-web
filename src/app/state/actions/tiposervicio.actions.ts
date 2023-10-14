import { createAction, props } from "@ngrx/store";
import { Tiposervicio } from "src/app/core/models/Tiposervicio.interface";

export const loadTiposervicio = createAction(
    '[Tipo Servicio] Load List'
);

export const loadedTiposervicio = createAction(
    '[Tipo Servicio] Loaded List Success',
    props<{tipoServicios: Tiposervicio[]}>()
);