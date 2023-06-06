import {
  SubcategoriaTTOCirugiaOProcedimientoQuirurgico,
  SubcategoriaTTOTerapiaSistemica,
  SubcategoriaTTORadioterapia,
  SubcategoriaTTOOtro,
  CategoriaTTO,
  LugarTTO,
  IntencionTTO,
} from "./Enums";

export interface TratamientoPostDuranteFALPBase {
  fecha_de_inicio: string;
  fecha_estimada: boolean;
  categoria_tto: CategoriaTTO | string;
  subcategoria_tto:
    | SubcategoriaTTOCirugiaOProcedimientoQuirurgico
    | SubcategoriaTTOTerapiaSistemica
    | SubcategoriaTTORadioterapia
    | SubcategoriaTTOOtro;
  lugar_tto: LugarTTO;
  intencion_tto: IntencionTTO;
  observaciones: string;
  numero_seguimiento?: number | null;
}

export interface TratamientoPostDuranteFALPCreate
  extends TratamientoPostDuranteFALPBase {
  updated_at: string;
}

export interface TratamientoPostDuranteFALPUpdate
  extends TratamientoPostDuranteFALPBase {
  id: number;
}

export interface TratamientoPostDuranteFALP
  extends TratamientoPostDuranteFALPBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: string;
  updated_at: string;
}
