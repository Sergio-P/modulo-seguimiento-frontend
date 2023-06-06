import { Seguimiento } from "@/types/Seguimiento";
import { createContext } from "react";

type NewEntry = {
  entry_type: string;
  entry_content: any;
};

export interface UpdateData {
  newEntries: NewEntry[];
  setNewEntries: React.Dispatch<React.SetStateAction<NewEntry[]>>;
}

export const UpdateDataContext = createContext<UpdateData | undefined>(
  undefined
);
