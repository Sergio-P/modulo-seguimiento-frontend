import { TipoRecurrenciaProgresion } from "./Enums";

export interface ProgresionBase {
  fecha_diagnostico: string;
  fecha_estimada: boolean;
  tipo: TipoRecurrenciaProgresion;
  detalle_topografia_progresion: string;
}

export interface ProgresionCreate extends ProgresionBase {
  updated_at: string;
  numero_seguimiento: number;
}

export interface ProgresionUpdate extends ProgresionBase {
  id: number;
}

export interface Progresion extends ProgresionBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: string;
  updated_at: string;
  numero_seguimiento: number | null;
}
