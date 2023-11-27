import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/core/models/Cliente.interface";

export const loadCliente = createAction(
    '[Cliente] Load List'
);

export const loadedCliente = createAction(
    '[Cliente] Loaded List Success',
    props<{clientes: Cliente[]}>()
);

export const changeCliente = createAction(
    '[Cliente] change List Success',
    props<{cargado: boolean}>()
);

export const loadedClienteStore = createAction(
    '[Cliente] Loaded List Store Success'
);