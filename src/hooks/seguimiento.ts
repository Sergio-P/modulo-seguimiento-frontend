import { api } from "@/api";
import { Comentario, ComentarioBase } from "@/types/Comentario";
import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import sleep from "@/utils/sleep";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutationUpdateSeguimiento(
  seguimientoId: number | undefined
) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (payload: SeguimientoUpdate) => {
      if (!seguimientoId || !payload) return;
      await sleep(500);
      const resp = await api.updateSeguimiento(seguimientoId, payload);
      return resp;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Partial<Seguimiento>>(
          ["seguimiento", seguimientoId],
          (prev) => ({ ...prev, ...data })
        );
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
      },
    }
  );
  return mutation;
}

export function useMutationPostComentario(seguimientoId: number | undefined) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (payload: ComentarioBase) => {
      if (!seguimientoId || !payload) return;
      await sleep(500);
      const resp = await api.postComentario(seguimientoId, payload);
      return resp;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<Partial<Seguimiento>>(
          ["seguimiento", seguimientoId],
          (prev) => ({ ...prev, ...data })
        );
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
      },
    }
  );
  return mutation;
}
