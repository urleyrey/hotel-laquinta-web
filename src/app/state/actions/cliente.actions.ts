import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/core/models/Cliente.interface";

export const loadCliente = createAction(
    '[Cliente] Load List'
);

export const loadedCliente = createAction(
    '[Cliente] Loaded List Success',
    props<{clientes: Cliente[]}>()
);