import {
  ClaseCaso,
  CondicionCaso,
  EstadoVital,
  SeguimientoState,
} from "./Enums";
import { EntryUpdate, EntryCreate, EntryDelete } from "./UtilitySchemas";
import { CasoRegistro } from "./CasoRegistro";
import { Usuario } from "./Usuario";

// TODO In Seguimiento, fields can be null while the assigned user is filling them.
// this will happen while state is not "finalizado"

export interface SeguimientoBase {
  state: SeguimientoState;
  numero_seguimiento: number;
  validacion_clase_caso: ClaseCaso | null;
  posee_recurrencia: boolean;
  posee_progresion: boolean;
  posee_metastasis: boolean;
  posee_tto: boolean;
  condicion_del_caso: CondicionCaso | null;
  ultimo_contacto: Date | null;
  estado_vital: EstadoVital | null;
  fecha_defuncion: Date | null;
  causa_defuncion: string | null;
  cierre_del_caso: boolean | null;
  tiene_consulta_nueva: boolean;
  tiene_examenes: boolean;
  tiene_comite_oncologico: boolean;
  tiene_tratamiento: boolean;
}

export interface SeguimientoCreate extends SeguimientoBase {}

export interface SeguimientoUpdate extends SeguimientoBase {
  id: number;
  caso_registro_id: number;
  new_entries: EntryCreate[];
  updated_entries: EntryUpdate[];
  deleted_entries: EntryDelete[];
}

export interface Seguimiento extends SeguimientoBase {
  id: number;
  usuario_id: number | null;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date | null;
  usuario_asignado: Usuario | null;
  caso_registro_correspondiente: CasoRegistro;
}
