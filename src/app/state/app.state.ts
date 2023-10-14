import { ActionReducerMap } from "@ngrx/store";
import { estadoHabitacionReducer } from "./reducers/estadohabitacion.reducers";
import { Estadohabitacion } from "../core/models/Estadohabitacion.interface";
import { EstadoHabitacionState } from "../core/models/state/Estadohabitacion.state";
import { CajaState } from "../core/models/state/Caja.state";
import { cajaReducer } from "./reducers/caja.reducers";
import { ClienteState } from "../core/models/state/Cliente.state";
import { HabitacionState } from "../core/models/state/Habitacion.state";
import { MovimientoState } from "../core/models/state/Movimiento.state";
import { NivelState } from "../core/models/state/Nivel.state";
import { RecepcionState } from "../core/models/state/Recepcion.state";
import { ReservaState } from "../core/models/state/Reserva.state";
import { TipoHabitacionState } from "../core/models/state/TipoHabitacion.state";
import { TipoServicioState } from "../core/models/state/TipoServicio.state";
import { clienteReducer } from "./reducers/cliente.reducers";
import { habitacionReducer } from "./reducers/habitacion.reducers";
import { movimientoReducer } from "./reducers/movimiento.reducers";
import { nivelReducer } from "./reducers/nivel.reducers";
import { recepcionReducer } from "./reducers/recepcion.reducers";
import { reservaReducer } from "./reducers/reserva.reducers";
import { tipoHabitacionReducer } from "./reducers/tipohabitacion.reducers";
import { tipoServicioReducer } from "./reducers/tiposervicio.reducers";

export interface AppState {
    cajas:              CajaState,
    clientes:           ClienteState,
    estadoHabitaciones: EstadoHabitacionState,
    habitaciones:       HabitacionState,
    movimientos:        MovimientoState,
    niveles:            NivelState,
    recepciones:        RecepcionState,
    reservas:           ReservaState,
    tipoHabitaciones:   TipoHabitacionState,
    tipoServicios:      TipoServicioState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    cajas:              cajaReducer,
    clientes:           clienteReducer,
    estadoHabitaciones: estadoHabitacionReducer,
    habitaciones:       habitacionReducer,
    movimientos:        movimientoReducer,
    niveles:            nivelReducer,
    recepciones:        recepcionReducer,
    reservas:           reservaReducer,
    tipoHabitaciones:   tipoHabitacionReducer,
    tipoServicios:      tipoServicioReducer
};