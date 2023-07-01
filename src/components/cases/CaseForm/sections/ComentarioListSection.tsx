import { Comentario } from "@/types/Comentario";
import React, { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import * as fns from "date-fns";

interface ComentarioListProps {
  comentarios?: Comentario[];
}

export default function ComentarioListSection({}: ComentarioListProps) {
  const seguimiento = useContext(SeguimientoContext);
  console.log("Comentarios: ", seguimiento?.caso_registro_correspondiente?.comentarios);
  const comentarios = seguimiento?.caso_registro_correspondiente?.comentarios;
  if (!comentarios) {
    return <div>No hay comentarios aún.</div>;
  }
  return (
      <div className="h-[60vh] overflow-y-scroll">
        {comentarios.length > 0 ? (
          <div>
            {comentarios.map((comentario) => (
              <div className="flex-col rounded-lg bg-background-dark px-3 py-2 m-4">
                <div className="text-lg">{comentario.comentario}</div>
                <div className="flex pt-3 justify-end gap-2 font-bold text-font-subtitle">
                  <div>{comentario.nombre_usuario}</div>
                  <div>{fns.format(new Date(comentario.created_at), "dd-MM-yyyy HH:mm")}</div>
                  <div>{comentario.numero_seguimiento > 0 ? `Seguimiento ${comentario.numero_seguimiento}` : "Registro"}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay comentarios.</p>
        )}
      </div>
  );
}