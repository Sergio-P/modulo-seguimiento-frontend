import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import { SeguimientoForm } from "../CaseForm";
import { EntryCreate } from "@/types/UtilitySchemas";
import * as fns from "date-fns";

export function serializeSeguimientoUpdate(
  formData: SeguimientoForm,
  seguimiento: Seguimiento,
  newEntries: EntryCreate[]
): SeguimientoUpdate {
  const estado_vital = formData.estado_vital
    ? formData.estado_vital
    : seguimiento.estado_vital;
  const caso = seguimiento.caso_registro_correspondiente;
  const seguimientoUpdate: SeguimientoUpdate = {
    validacion_clase_caso: formData.caso_registro_correspondiente.clase_caso
      ? formData.caso_registro_correspondiente.clase_caso
      : seguimiento.validacion_clase_caso,
    posee_recurrencia: seguimiento.posee_recurrencia,
    posee_progresion: seguimiento.posee_progresion,
    posee_metastasis: seguimiento.posee_metastasis,
    posee_tto: seguimiento.posee_tto,
    condicion_del_caso: formData.condicion_del_caso
      ? formData.condicion_del_caso
      : seguimiento.condicion_del_caso,
    ultimo_contacto: formData.ultimo_contacto
      ? typeof formData.ultimo_contacto === "string"
        ? formData.ultimo_contacto
        : fns.format(formData.ultimo_contacto as Date, "yyyy-MM-dd")
      : seguimiento.ultimo_contacto,
    causa_defuncion:
      formData.causa_defuncion && estado_vital === "Muerto"
        ? formData.causa_defuncion
        : null,
    fecha_defuncion:
      formData.fecha_defuncion && estado_vital === "Muerto"
        ? typeof formData.fecha_defuncion === "string"
          ? formData.fecha_defuncion
          : fns.format(formData.fecha_defuncion as Date, "yyyy-MM-dd")
        : null,
    //sigue_atencion_otro_centro: formData.sigue_atencion_otro_centro,  //OJO NO ESTA EN EL Modelo de datos
    //fecha_estimada: formData.fecha_estimada,  //OJO NO ESTA EN EL MODELO DE DATOS
    estado_vital: estado_vital,
    tiene_consulta_nueva: seguimiento.tiene_consulta_nueva,
    tiene_examenes: seguimiento.tiene_examenes,
    tiene_comite_oncologico: seguimiento.tiene_comite_oncologico,
    tiene_tratamiento: seguimiento.tiene_tratamiento,
    new_entries: newEntries,
    updated_entries: [],
    deleted_entries: [],
  };
  return seguimientoUpdate;
}
