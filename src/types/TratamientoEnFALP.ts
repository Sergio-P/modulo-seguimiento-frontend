import {
  CategoriaTTO,
  SubcategoriaTTOCirugiaOProcedimientoQuirurgico,
  SubcategoriaTTOTerapiaSistemica,
  SubcategoriaTTORadioterapia,
  SubcategoriaTTOOtro,
  IntencionTTO,
} from "./Enums";

export interface TratamientoEnFALPBase {
  medico: string;
  fecha_de_inicio: string;
  fecha_de_termino: string | null;
  en_tto: boolean;
  categoria_tto: CategoriaTTO | string;
  subcategoria_tto:
    | SubcategoriaTTOCirugiaOProcedimientoQuirurgico
    | SubcategoriaTTOTerapiaSistemica
    | SubcategoriaTTORadioterapia
    | SubcategoriaTTOOtro
    | string;

  intencion_tto: IntencionTTO | string;
  descripcion_de_la_prestacion: string | null;
  observaciones: string;
  numero_seguimiento?: number | null;
}

export interface TratamientoEnFALPCreate extends TratamientoEnFALPBase {
  updated_at: string;
}

export interface TratamientoEnFALPUpdate extends TratamientoEnFALPBase {
  id: number;
}

export interface TratamientoEnFALP extends TratamientoEnFALPBase {
  id: number;
  seguimiento_id: number | null;
  caso_registro_id: number;
  created_at: string;
  updated_at: string;
}
