export interface MetastasisBase {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  detalle_topografia: string;
}

export interface MetastasisCreate extends MetastasisBase {}

export interface MetastasisUpdate extends MetastasisBase {
  id: number;
}

export interface Metastasis extends MetastasisBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date | null;
}
