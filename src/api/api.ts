import { LoginCredentials, LoginResponse } from "@/hooks/auth";
import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import { Usuario } from "@/types/Usuario";
import { Coding } from "@/types/Coding";
import { CodingMode } from "@/types/Enums";
import { Report } from "@/types/Report";
import apiClient from "@/utils/axios";
import { AxiosResponse } from "axios";
import * as fns from "date-fns";
import _ from "lodash";

type Id = number | string;

interface PaginatedResponse<T> {
  body: T;
  total: number;
}

// seguimientos

export async function signSeguimiento(
  seguimientoId: Id,
  payload: SeguimientoUpdate
) {
  await apiClient.put(`/seguimiento/sign/${seguimientoId}`, payload);
}

export async function updateSeguimiento(
  seguimientoId: Id,
  payload: SeguimientoUpdate
) {
  return await apiClient
    .put<Seguimiento>(`/seguimiento/save/${seguimientoId}`, payload)
    .then((response) => response.data);
}

export async function getSeguimiento(seguimientoId: Id): Promise<Seguimiento> {
  return await apiClient
    .get(`/seguimiento/${seguimientoId}`)
    .then((res) => res.data);
}

export async function getSeguimientos(
  skip = 0,
  limit = 100,
  filters: Record<string, string> = {}
): Promise<PaginatedResponse<Seguimiento[]>> {
  const query: Record<string, string> = {
    ...filters,
    skip: skip.toString(),
    limit: limit.toString(),
  };
  return await apiClient
    .get(`/seguimiento/?${new URLSearchParams(query).toString()}`, {
      timeout: 5000,
    }) // TODO: handle timeout in a better way
    .then((res) => res.data);
}

export async function assignSeguimientoUser(seguimientoId: Id, userId: Id) {
  return await apiClient.patch(
    `/seguimiento/assign/${seguimientoId}?usuario_id=${userId}`
  );
}

export async function postComentario(
  seguimientoId: Id,
  payload: { comentario: string }
) {
  return await apiClient.post(
    `/comentario/?seguimiento_id=${seguimientoId}`,
    payload
  );
}

// usuarios

export async function getUsuarios(): Promise<Usuario[]> {
  return await apiClient.get("/usuario/").then((res) => res.data);
}

export async function getUsuarioToken(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  return apiClient
    .post<LoginResponse>(
      "/usuario/token",
      {
        username: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => response.data);
}

export async function getCurrentUsuario(): Promise<Usuario> {
  return await apiClient
    .get<Usuario>("/usuario/user/me")
    .then((response) => response.data);
}

// rht integration

export async function getCodings(
  mode: CodingMode,
  query: string
): Promise<Coding[]> {
  return await apiClient
    .get<Coding[]>(`/rht_api/codings?mode=${mode}&q=${query}`)
    .then((response) => response.data);
}

export async function getReports(caseId: number): Promise<Report> {
  return await apiClient
    .get<Report>(`/rht_api/reports?case_id=${caseId}`)
    .then((response) => response.data);
}
