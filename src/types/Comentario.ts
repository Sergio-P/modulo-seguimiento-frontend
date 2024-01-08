export interface ComentarioBase {
  comentario: string;
  type: string;
  data: any;
  open: boolean;
}

export interface ComentarioCreate extends ComentarioBase {
  numero_seguimiento: number;
}

export interface Comentario extends ComentarioBase {
  id: number;
  usuario_id: number;
  seguimiento_id: number;
  caso_registro_id: number;
  nombre_usuario: string;
  created_at: Date;
  numero_seguimiento: number | null;
}
