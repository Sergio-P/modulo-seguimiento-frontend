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
  avanzado = "Avanzado",
  // metastasis = "Metástasis",
  // peritoneal = "Peritoneal",
  // sin_informacion = "Sin información",
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
  biopsia_excisional = "Biopsia excisional",
  ampliacion_de_margenes = "Ampliación de márgenes",
  desconocido = "Desconocido",
}

export enum SubcategoriaTTOTerapiaSistemica {
  quimioterapia = "Quimioterapia",
  inmunoterapia = "Inmunoterapia",
  terapias_moleculares = "Terapias moleculares (CDKI)",
  hormonoterapia = "Hormonoterapia",
  radiofarmaco = "Radiofármaco",
  quimioterapia_mas_inmunoterapia = "Quimioterapia + Inmunoterapia",
  quimioterapia_mas_terapias_moleculares = "Quimioterapia + Terapias moleculares (CDKI)",
  quimioterapia_mas_inmunoterapia_mas_terapias_moleculares = "Quimioterapia + Inmunoterapia + Terapias moleculares (CDKI)",
  inmunoterapia_mas_terapias_moleculares = "Inmunoterapia + Terapias moleculares (CDKI)",
  desconocido = "Desconocido",
}

export enum SubcategoriaTTORadioterapia {
  radioterapia = "Radioterapia",
}

export enum SubcategoriaTTOOtro {
  cuidados_paliativos = "Cuidados paliativos",
  vigilancia = "Vigilancia",
  // fotodinamia = "Fotodinamia",
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

export const categorySubcategories = {
  'Mama': ['Mama'],
  'Órganos Digestivos': [
    'Ano y Conducto Anal',
    'Colon',
    'Esófago',
    'Estómago',
    'Hígado y Conductor Biliares intrahepáticos',
    'Intestino Delgado',
    'Páncreas',
    'Recto',
    'Unión Rectosigmoidea',
    'Vesícula Biliar',
    'Otras partes de las vías biliares y las no específicadas',
    'Otros sitios de los órganos digestivos y los mal definidos'
  ],
  'Piel': [
    'Melanoma',
    'No Melanoma'
  ],
  'Órganos Genitales Masculinos': [
    'Glándula Prostática',
    'Pene',
    'Testículos',
    'Otros órganos genitales masculinos y los no específicados'
  ],
  'Órganos Genitales Femeninos': [
    'Cuello Uterino',
    'Cuerpo Uterino',
    'Ovario',
    'Útero, SAI',
    'Vagina',
    'Vulva',
    'Placenta',
    'Otros órganos genitales femeninos y los no específicados'
  ],
  'Tiroides y otras Glándulas Endocrinas': [
    'Glándula Suprrarrenal (Adrenal)',
    'Glándula Tiroides',
    'Otras glándulas endocrinas y estructuras afines'
  ],
  'Sistema Respiratorio y Órganos Intratorácicos': [
    'Cavidad Nasal y Oído Medio',
    'Senos Paranasales',
    'Laringe',
    'Tráquea',
    'Bronquios y Pulmón',
    'Corazón, Mediastino y Pleura',
    'Timo',
    'Otros sitios y los mal definidos del sistema respiratorio y los órganos intratorácicos'
  ],
  'Tracto Urinario': [
    'Pelvis Renal',
    'Riñón',
    'Uréter',
    'Vejiga Urinaria',
    'Otros órganos urinarios y los no específicados'
  ],
  'Labio, Cavidad Bucal y Faringe': [
    'Amígdala',
    'Base de la Lengua',
    'Glándula Parótida',
    'Hipofaringe',
    'Labio',
    'Nasofaringe',
    'Orofaringe',
    'Paladar',
    'Seno Piriforme',
    'Encía',
    'Piso de la Boca',
    'Otras Glándulas Salivales Mayores y las no específicadas',
    'Otras partes de la Boca y las no específicadas',
    'Otras partes de la Lengua y las no específicadas',
    'Otros sitios del Labio, Cavidad Bucal y Faringe; y los mal definidos',
  ],
  'Sitio primario desconocido': ['Sitio primario desconocido'],
  'Encéfalo, Ojo y otras partes del Sistema Nervioso Central': [
    'Encéfalo',
    'Médula Espinal, Nervios Craneales y de otras partes del SNC',
    'Meninges',
    'Ojos y anexos'
  ],
  'Tejido conjuntivo, subcutáneo y de otros tejidos blandos': [
    'Tejido conjuntivo, subcutáneo y de otros tejidos blandos'
  ],
  'Huesos, Articulaciones y Cartílago Articular': [
    'Miembros',
    'Otros sitios y de los no específicados'
  ],
  'Peritoneo y Retroperitoneo': ['Peritoneo y Retroperitoneo'],
  'Nervios Periféricos y Sistema Nervioso Autónomo': ['Nervios Periféricos y Sistema Nervioso Autónomo'],
  'Sitios mal definidos y otros': ['Sitios mal definidos y otros']
}

export enum QualityReportTypes {
  patient_data = "DATOS DEL PACIENTE",
  tumor_data = "ANTECEDENTES DEL TUMOR",
  comite_data = "ANTECEDENTES DE RESOLUCIÓN DEL COMITE",
  treatment_data = "ANTECEDENTES DEL TRATAMIENTO",
  progression_data = "ANTECEDENTS DE RECURRENCIA/PROGRESIÓN",
  vital_data = "ANTECEDENTES ESTADO VITAL",
}

