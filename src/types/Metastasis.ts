export interface MetastasisBase {
  fecha_diagnostico: string;
  fecha_estimada: boolean;
  detalle_topografia: string;
}

export interface MetastasisCreate extends MetastasisBase {
  updated_at: string;
  numero_seguimiento: number;
}

export interface MetastasisUpdate extends MetastasisBase {
  id: number;
}

export interface Metastasis extends MetastasisBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: string;
  updated_at: string;
  numero_seguimiento: number | null;
}
