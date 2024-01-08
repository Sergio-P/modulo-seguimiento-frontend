export interface DuplicarBase {
  comentario: string;
}

export interface DuplicarCreate extends DuplicarBase {
  numero_seguimiento: number;
}

export interface Duplicar extends DuplicarBase {
  id: number;
  usuario_id: number;
  seguimiento_id: number;
  caso_registro_id: number;
  categoria: string;
  subcategoria: string;
  fecha_diagnostico: string;
  fecha_estimada_dg: boolean;
  justificacion: string;
}
