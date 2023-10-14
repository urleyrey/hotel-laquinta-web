import { createAction, props } from "@ngrx/store";
import { Nivel } from "src/app/core/models/Nivel.interface";

export const loadNivel = createAction(
    '[Nivel] Load List'
);

export const loadedNivel = createAction(
    '[Nivel] Loaded List Success',
    props<{niveles: Nivel[]}>()
);