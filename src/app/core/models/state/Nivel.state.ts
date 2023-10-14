import { Nivel } from "../Nivel.interface";

export interface NivelState{
    loading: boolean,
    cargado: boolean,
    niveles: ReadonlyArray<Nivel>
}