import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import axiosClient from "@/utils/axios";

type Id = number | string;

export async function signSeguimiento(
  seguimientoId: Id,
  payload: SeguimientoUpdate
) {
  await axiosClient.put(
    `http://localhost:8000/seguimiento/sign/${seguimientoId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function saveSeguimiento(
  seguimientoId: Id,
  payload: SeguimientoUpdate
) {
  await axiosClient.put(
    `http://localhost:8000/seguimiento/save/${seguimientoId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getSeguimiento(seguimientoId: Id) {
  return await axiosClient
    .get(`http://localhost:8000/seguimiento/${seguimientoId}`)
    .then((res) => {
      const data = res.data as Seguimiento;
      return data;
    });
}
