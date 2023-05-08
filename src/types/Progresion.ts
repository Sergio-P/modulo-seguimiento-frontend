import { TipoRecurrenciaProgresion } from "./Enums";

export interface ProgresionBase {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  tipo: Object | TipoRecurrenciaProgresion;
  detalle_topografia_progresion: string;
}

export interface ProgresionCreate extends ProgresionBase {}

export interface ProgresionUpdate extends ProgresionBase {
  id: number;
}

export interface Progresion extends ProgresionBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date | null;
}
