export enum EntryType {
  metastasis = "metastasis",
  progresion = "progresion",
  recurrencia = "recurrencia",
  tratamiento_antes_falp = "tratamiento_antes_falp",
  tratamiento_en_falp = "tratamiento_en_falp",
  tratamiento_post_durante_falp = "tratamiento_post_durante_falp",
}

export enum Rol {
  admin = "admin",
  registrador = "registrador",
}

export enum SeguimientoState {
  pendiente_asignacion = "pendiente_asignacion",
  asignado = "asignado",
  en_progreso = "en_progreso",
  cerrado = "cerrado",
}

export enum ClaseCaso {
  diagnostico_y_tratamiento_en_falp = "Diagnóstico y tratamiento en FALP",
  tratamiento_en_falp = "Tratamiento en FALP",
  diagnostico_en_falp = "Diagnóstico en FALP",
}

export enum CondicionCaso {
  vivo_sin_enfermedad = "Vivo sin enfermedad",
  vivo_con_enfermedad = "Vivo con enfermedad",
  vivo_soe = "Vivo SOE",
  desconocido = "Desconocido",
  fallecido = "Fallecido",
}

export enum EstadoVital {
  vivo = "Vivo",
  muerto = "Muerto",
}

export enum CausaDefuncion {
  muerte_por_cancer_o_complicacion = "Muerte por cáncer o complicación",
  muerte_por_otra_causa = "Muerte por otra causa",
  desconocido = "Desconocido",
}

export enum SiNoDesconocido {
  si = "Si",
  no = "No",
  desconocido = "Desconocido",
}

export enum TipoRecurrenciaProgresion {
  local = "Local",
  regional = "Regional",
  metastasis = "Metástasis",
  peritoneal = "Peritoneal",
  sin_informacion = "Sin información",
}

export enum CategoriaTTO {
  cirugia_o_procedimiento_quirurgico = "Cirugía o procedimiento quirúrgico",
  terapia_sistematica = "Terapia sistémica",
  radioterapia = "Radioterapia",
  otro = "Otro",
}

export enum SubcategoriaTTOCirugiaOProcedimientoQuirurgico {
  cirugia = "Cirugía",
  reseccion_endoscopica = "Resección endoscópica",
  biopsia_excisional_o_ampliacion_de_margenes = "Biopsia excisional o ampliación de márgenes",
  desconocido = "Desconocido",
}

export enum SubcategoriaTTOTerapiaSistematica {
  quimioterapia = "Quimioterapia",
  inmunoterapia = "Inmunoterapia",
  terapias_moleculares = "Terapias moleculares",
  hormonoterapia = "Hormonoterapia",
  radiofarmaco = "Radiofármaco",
  quimioterapia_mas_inmunoterapia = "Quimioterapia + Inmunoterapia",
  quimioterapia_mas_terapias_moleculares = "Quimioterapia + Terapias moleculares",
  quimioterapia_mas_inmunoterapia_mas_terapias_moleculares = "Quimioterapia + Inmunoterapia + Terapias moleculares",
  desconocido = "Desconocido",
}

export enum SubcategoriaTTORadioterapia {
  radioterapia = "Radioterapia",
}

export enum SubcategoriaTTOOtro {
  cuidados_paliativos = "Cuidados paliativos",
  vigilancia = "Vigilancia",
  fotodinamia = "Fotodinamia",
  no_definido = "No definido",
  desconocido = "Desconocido",
}

export enum LugarTTO {
  extra_sistema_sistema_privado = "Extra sistema - sistema privado",
  extra_sistema_sistema_publico = "Extra sistema - sistema público",
  otros = "Otros",
}

export enum IntencionTTO {
  curativo = "Curativo",
  paliativo = "Paliativo",
  desconocido = "Desconocido",
}
