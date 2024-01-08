export interface QualityReportBase {
  comentario: string;
}

export interface QualityReportCreate extends QualityReportBase {
  numero_seguimiento: number;
}

export interface QualityReport extends QualityReportBase {
  id: number;
  usuario_id: number;
  seguimiento_id: number;
  caso_registro_id: number;
  patient_data: boolean;
  tumor_data: boolean;
  comite_data: boolean;
  treatment_data: boolean;
  progression_data: boolean;
  vital_data: boolean;
  justificacion: string;
}
