export interface Cliente {
    id:             string;
    tipoDocumento:  string;
    numeroDocumento:string
    nombres:        string;
    apellidos:      string;
    direccion:      string;
    email:          string;
    telefono:       string;
    sexo:           string;
    fechaNacimiento:string; // -> DD/MM/YYYY
}

export interface TipoDocumento {
    id:             number;
    value:          string;
    descripcion:    string;
}