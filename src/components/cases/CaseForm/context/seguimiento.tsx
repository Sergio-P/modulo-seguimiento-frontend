import { Seguimiento } from "@/types/Seguimiento";
import { createContext } from "react";

export const SeguimientoContext = createContext<Seguimiento | undefined>(
  undefined
);
