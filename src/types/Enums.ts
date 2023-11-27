export enum EntryType {
  metastasis = "metastasis",
  progresion = "progresion",
  recurrencia = "recurrencia",
  tratamiento_antes_falp = "tratamiento_antes_falp",
  tratamiento_en_falp = "tratamiento_en_falp",
  tratamiento_post_durante_falp = "tratamiento_post_durante_falp",
  comite = "comite",
  comentario = "comentario",
}

export enum Rol {
  admin = "admin",
  registrador = "registrador",
}

export enum TipoSeguimiento {
  seguimiento_automatico = "Seguimiento automático",
  seguimiento_por_consulta = "Seguimiento por consulta",
  seguimiento_por_tratamiento = "Seguimiento por tratamiento",
}

export enum SeguimientoState {
  gatillado = "Gatillado",
  sin_asignar = "Sin asignar",
  asignado = "Asignado",
  incompleto = "Incompleto",
  completo_fallecido = "Completo fallecido",
  finalizado = "Finalizado",
}

export enum ClaseCaso {
  diagnostico_y_tratamiento_en_falp = "DIAGNÓSTICO Y TRATAMIENTO EN FALP",
  tratamiento_en_falp = "TRATAMIENTO EN FALP",
  diagnostico_en_falp = "DIAGNÓSTICO EN FALP",
  desconocido = "DESCONOCIDO"
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
  si = "SI",
  no = "NO",
  desconocido = "DESCONOCIDO",
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
  terapia_sistemica = "Terapia sistémica",
  radioterapia = "Radioterapia",
  otro = "Otro",
}

export enum SubcategoriaTTOCirugiaOProcedimientoQuirurgico {
  cirugia = "Cirugía",
  reseccion_endoscopica = "Resección endoscópica",
  biopsia_excisional_o_ampliacion_de_margenes = "Biopsia excisional o ampliación de márgenes",
  desconocido = "Desconocido",
}

export enum SubcategoriaTTOTerapiaSistemica {
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
  extra_sistema_sistema_privado = "EXTRA SISTEMA O SISTEMA PRIVADO",
  extra_sistema_sistema_publico = "EXTRA SISTEMA O SISTEMA PÚBLICO",
  falp = "FALP",
  otros = "OTRAS",
}

export enum IntencionTTO {
  curativo = "CURATIVO",
  paliativo = "PALIATIVO",
  desconocido = "DESCONOCIDO",
}

export enum CodingMode {
  topography = "topography",
  morphology = "morphology",
  practitioner = "practitioner",
}
