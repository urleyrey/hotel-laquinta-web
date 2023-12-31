import { createAction, props } from "@ngrx/store";
import { Recepcion } from "src/app/core/models/Recepcion.interface";

export const loadRecepcion = createAction(
    '[Recepcion] Load List'
);

export const loadedRecepcion = createAction(
    '[Recepcion] Loaded List Success',
    props<{recepciones: Recepcion[]}>()
);

export const changeRecepcion = createAction(
    '[Recepcion] change List Success',
    props<{cargado: boolean}>()
);

export const loadedRecepcionStore = createAction(
    '[Recepcion] Loaded List Store Success'
);