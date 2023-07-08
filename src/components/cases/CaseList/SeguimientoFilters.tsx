import { api } from "@/api";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { useUser } from "@/hooks/auth";
import { SeguimientoState, TipoSeguimiento } from "@/types/Enums";
import { Usuario } from "@/types/Usuario";
import sleep from "@/utils/sleep";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as fns from "date-fns";
import _ from "lodash";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface SeguimientoFiltersProps {
  subcategories: string[];
  onFilter: (filterData: Record<string, number | string>) => void;
}

export interface SeguimientoFiltersFormData {
  anioDg: number | null;
  fechaInicio: Date | null;
  fechaTermino: Date | null;
  nombrePaciente: string;
  apellidoPaciente: string;
  subCategoria: string | null;
  user: { id: number; name: string } | null;
  tipo: string | null;
  estado: string | null;
  ficha: string;
  numero: string;
}

function createFilters(data: SeguimientoFiltersFormData) {
  let newFilters: Record<string, number | string> = {};
  if (data.anioDg) {
    newFilters.caso__fecha_dg__gte = `${data.anioDg}-01-01`;
    newFilters.caso__fecha_dg__lte = `${data.anioDg}-12-31`;
  }
  if (data.fechaInicio)
    newFilters.fecha_asignacion__gte = fns.format(
      data.fechaInicio,
      "yyyy-MM-dd"
    );
  if (data.fechaTermino)
    newFilters.fecha_asignacion__lte = fns.format(
      data.fechaTermino,
      "yyyy-MM-dd"
    );
  if (data.nombrePaciente) newFilters.caso__nombre__ilike = data.nombrePaciente;
  if (data.apellidoPaciente)
    newFilters.caso__apellido__ilike = data.apellidoPaciente;
  if (data.subCategoria) newFilters.caso__subcategoria = data.subCategoria;
  if (data.user) newFilters.usuario_id = data.user.id;
  if (data.tipo) newFilters.tipo_seguimiento = data.tipo;
  if (data.estado) newFilters.state = data.estado;
  if (data.numero) newFilters.caso__id = data.numero;
  if (data.ficha) newFilters.caso__ficha = data.ficha;
  return newFilters;
}

export default function SeguimientoFilters(props: SeguimientoFiltersProps) {
  const { subcategories } = props;
  const form = useForm<SeguimientoFiltersFormData>({
    defaultValues: {
      nombrePaciente: "",
      apellidoPaciente: "",
    },
  });
  const userQuery = useUser();
  const usersQuery = useQuery<Usuario[]>({
    queryKey: ["usuarios"],
    queryFn: () => api.getUsuarios(),
    enabled: userQuery.data?.rol === "admin",
  });
  const { handleSubmit, control, register } = form;
  const submitMutation = useMutation(
    async (filter: SeguimientoFiltersFormData) => {
      await sleep(200);
      props.onFilter(createFilters(filter));
    }
  );
  const cleanMutation = useMutation(async () => {
    form.reset();
    await sleep(200);
    props.onFilter(createFilters(form.getValues()));
  });
  const onSubmit: SubmitHandler<SeguimientoFiltersFormData> = (filter) =>
    submitMutation.mutate(filter);
  const handleClean = () => cleanMutation.mutate();
  const disabled = cleanMutation.isLoading || submitMutation.isLoading;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-font-title">
        Criterio búsqueda (2017 - Fecha Actual)
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <Controller
            name="anioDg"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                label="Año diagnóstico"
                disabled={disabled}
                options={_.range(2017, fns.getYear(new Date()) + 1).reverse()}
                {...field}
              />
            )}
          />
          <Controller
            name="fechaInicio"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fecha inicio"
                disabled={disabled}
                dayPickerOptions={{
                  fromYear: 2017,
                }}
              />
            )}
          />
          <Controller
            name="fechaTermino"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fecha término"
                disabled={disabled}
                dayPickerOptions={{
                  fromYear: 2017,
                }}
              />
            )}
          />
          <div className="col-span-3">
            <Controller
              name="subCategoria"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label="Sub-categoría"
                  disabled={disabled}
                  options={subcategories}
                  expand={false}
                />
              )}
            />
          </div>
          <TextInput
            {...register("nombrePaciente", {})}
            label="Nombre Paciente"
            disabled={disabled}
          />
          <TextInput
            {...register("apellidoPaciente", {})}
            label="Apellido Paciente"
            disabled={disabled}
          />

          {userQuery.data?.rol === "admin" && (
            <Controller
              name="user"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label="Usuario"
                  disabled={disabled}
                  options={
                    usersQuery.data?.map((user) => ({
                      id: user.id,
                      name: user.email,
                    })) || []
                  }
                />
              )}
            />
          )}
          <Controller
            name="estado"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Estado del seguimiento"
                disabled={disabled}
                options={[
                  SeguimientoState.sin_asignar,
                  SeguimientoState.asignado,
                  SeguimientoState.incompleto,
                  SeguimientoState.completo_fallecido,
                  SeguimientoState.finalizado,
                ]}
              />
            )}
          />
          <Controller
            name="tipo"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Tipo de seguimiento"
                disabled={disabled}
                options={[
                  TipoSeguimiento.seguimiento_automatico,
                  TipoSeguimiento.seguimiento_por_consulta,
                  TipoSeguimiento.seguimiento_por_tratamiento,
                ]}
              />
            )}
          />
          <TextInput
            {...register("ficha", { valueAsNumber: true })}
            label="Ficha"
            disabled={disabled}
          />
          <TextInput
            {...register("numero", { valueAsNumber: true })}
            label="Número"
            disabled={disabled}
          />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            type="submit"
            filled
            loading={submitMutation.isLoading}
            disabled={disabled}
          >
            Buscar
          </Button>
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleClean();
            }}
            loading={cleanMutation.isLoading}
            disabled={disabled}
          >
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
}
