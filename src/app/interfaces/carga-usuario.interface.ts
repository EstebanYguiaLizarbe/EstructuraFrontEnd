import { Usuario } from "../models/Usuario";

export interface CargaUsuario{
    total: number,
    usuarios: Usuario[],
}