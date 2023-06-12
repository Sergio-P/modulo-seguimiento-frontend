import { Seguimiento } from "@/types/Seguimiento";
import { EntryCreate } from "@/types/UtilitySchemas";
import { createContext, useState } from "react";

export interface UpdateData {
  newEntries: EntryCreate[];
  setNewEntries: React.Dispatch<React.SetStateAction<EntryCreate[]>>;
}

export const UpdateDataContext = createContext<UpdateData>({
  newEntries: [],
  setNewEntries: (_) => {},
});

export function UpdateDataProvider({ children }: React.PropsWithChildren) {
  const [newEntries, setNewEntries] = useState<EntryCreate[]>([]);

  return (
    <UpdateDataContext.Provider value={{ newEntries, setNewEntries }}>
      {children}
    </UpdateDataContext.Provider>
  );
}
