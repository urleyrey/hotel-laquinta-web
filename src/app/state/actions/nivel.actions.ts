import { createAction, props } from "@ngrx/store";
import { Nivel } from "src/app/core/models/Nivel.interface";

export const loadNivel = createAction(
    '[Nivel] Load List'
);

export const loadedNivel = createAction(
    '[Nivel] Loaded List Success',
    props<{niveles: Nivel[]}>()
);

export const changeNivel = createAction(
    '[Nivel] change List Success',
    props<{cargado: boolean}>()
);

export const loadedNivelStore = createAction(
    '[Nivel] Loaded List Store Success'
);