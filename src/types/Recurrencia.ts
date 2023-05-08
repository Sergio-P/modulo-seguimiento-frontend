import { TipoRecurrenciaProgresion } from "./Enums";

export interface RecurrenciaBase {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  tipo: Object | TipoRecurrenciaProgresion;
  detalle_topografia_recurrencia: string;
}

export interface RecurrenciaCreate extends RecurrenciaBase {}

export interface RecurrenciaUpdate extends RecurrenciaBase {
  id: number;
}

export interface Recurrencia extends RecurrenciaBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date | null;
}
