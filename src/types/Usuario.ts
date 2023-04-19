import { Rol } from "./Enums";

export interface UsuarioBase {
  email: string;
  nombre: string;
  rol: Rol;
}

export interface UsuarioCreate extends UsuarioBase {}

export interface Usuario extends UsuarioBase {
  id: number;
}
