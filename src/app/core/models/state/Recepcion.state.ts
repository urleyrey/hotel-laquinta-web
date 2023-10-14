import { Recepcion } from "../Recepcion.interface";

export interface RecepcionState{
    loading:    boolean,
    cargado:    boolean,
    recepciones:ReadonlyArray<Recepcion>
}