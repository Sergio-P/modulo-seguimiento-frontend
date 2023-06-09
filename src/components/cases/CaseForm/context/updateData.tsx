import { Seguimiento } from "@/types/Seguimiento";
import { EntryCreate } from "@/types/UtilitySchemas";
import { createContext } from "react";

export interface UpdateData {
  newEntries: EntryCreate[];
  setNewEntries: React.Dispatch<React.SetStateAction<EntryCreate[]>>;
}

export const UpdateDataContext = createContext<UpdateData | undefined>(
  undefined
);
