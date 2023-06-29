import { Comentario } from "@/types/Comentario";
import React, { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import * as fns from "date-fns";

interface ComentarioListProps {
  comentarios?: Comentario[];
}
//<div>Fecha: {fns.format(comentario.created_at, "dd-MM-yyyy HH:mm")}</div>
export default function ComentarioListFunc({}: ComentarioListProps) {
  const seguimiento = useContext(SeguimientoContext);
  console.log("Comentarios: ", seguimiento?.caso_registro_correspondiente?.comentarios);
  const comentarios = seguimiento?.caso_registro_correspondiente?.comentarios;
  if (!comentarios) {
    return <div>No hay comentarios.</div>;
  }
  return (
      <div>
        <div>Comentarios</div>
        {comentarios.length > 0 ? (
          <div>
            {comentarios.map((comentario) => (
              <>
                <div>Autor: {comentario.nombre_usuario}</div>
                <div>{comentario.comentario}</div>
              </>
            ))}
          </div>
        ) : (
          <p>No hay comentarios.</p>
        )}
      </div>
  );
}