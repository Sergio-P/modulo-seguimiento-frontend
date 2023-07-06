import { TipoRecurrenciaProgresion } from "./Enums";

export interface RecurrenciaBase {
  fecha_diagnostico: string;
  fecha_estimada: boolean;
  tipo: TipoRecurrenciaProgresion;
  codigo_topografia_recurrencia: string;
  descripcion_topografia_recurrencia: string;
}

export interface RecurrenciaCreate extends RecurrenciaBase {
  updated_at: string;
  numero_seguimiento: number;
}

export interface RecurrenciaUpdate extends RecurrenciaBase {
  id: number;
}

export interface Recurrencia extends RecurrenciaBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: string;
  updated_at: string;
  numero_seguimiento: number | null;
}
