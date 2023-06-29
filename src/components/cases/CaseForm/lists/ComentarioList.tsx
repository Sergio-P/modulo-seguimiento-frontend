import { Comentario } from "@/types/Comentario";
import React, { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";

interface ComentarioListProps {
  comentarios?: Comentario[];
}

export default function ComentarioListFunc({}: ComentarioListProps) {
  const seguimiento = useContext(SeguimientoContext);
  console.log("Comentarios: ", seguimiento?.caso_registro_correspondiente?.comentarios);
  const comentarios = seguimiento?.caso_registro_correspondiente?.comentarios;
  if (!comentarios) {
    return <div>No hay comentarios.</div>;
  }
  return (
      <div>
        <h2>Comentarios</h2>
        {comentarios.length > 0 ? (
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario.id}>{comentario.comentario}</li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios.</p>
        )}
      </div>
  );
}