import { Seguimiento } from "@/types/Seguimiento";
import { UpdateData } from "../context/updateData";
import { EntryType } from "@/types/Enums";
import { useMemo } from "react";
import _ from "lodash";

const entryKeyByType: Record<EntryType, string> = {
  [EntryType.tratamiento_antes_falp]: "tratamientos_antes_falp",
  [EntryType.tratamiento_en_falp]: "tratamientos_en_falp",
  [EntryType.tratamiento_post_durante_falp]: "tratamientos_post_durante_falp",
  [EntryType.metastasis]: "metastasis",
  [EntryType.progresion]: "progresiones",
  [EntryType.recurrencia]: "recurrencias",
  [EntryType.comite]: "comites",
  [EntryType.comentario]: "comentarios",
};

export default function useSeguimientoEntries<T>(
  seguimiento: Seguimiento | undefined,
  updateData: UpdateData | undefined,
  entryType: EntryType
) {
  const entryKey = entryKeyByType[entryType];
  const existingEntries = useMemo(
    () => _.get(seguimiento?.caso_registro_correspondiente, entryKey) as T[],
    [seguimiento?.caso_registro_correspondiente, entryKey]
  );
  const newEntries = useMemo(
    () =>
      updateData?.newEntries
        .filter((x) => x.entry_type === entryType)
        .map((x) => x.entry_content) as T[],
    [updateData?.newEntries, entryType]
  );
  const data = useMemo(
    () => [...existingEntries, ...newEntries],
    [existingEntries, newEntries]
  );
  return data;
}
