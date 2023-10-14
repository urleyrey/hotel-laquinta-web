import { Tiposervicio } from "../Tiposervicio.interface";

export interface TipoServicioState{
    loading:        boolean,
    cargado:        boolean,
    tipoServicios:  ReadonlyArray<Tiposervicio>
}