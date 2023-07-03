import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { Seguimiento } from "@/types/Seguimiento";
import sleep from "@/utils/sleep";
import { useMutation } from "@tanstack/react-query";
import * as fns from "date-fns";
import _ from "lodash";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface SeguimientoFiltersProps {
  setFilterFn: React.Dispatch<
    React.SetStateAction<(list: Seguimiento[]) => Seguimiento[]>
  >;
  subcategories: string[];
}

interface FormData {
  anio: number | null;
  fechaInicio: Date | null;
  fechaTermino: Date | null;
  nombrePaciente: string;
  subCategoria: string | null;
}

function filterSeguimientos(filter: FormData, list: Seguimiento[]) {
  return list.filter((seguimiento) => {
    const caso = seguimiento.caso_registro_correspondiente;
    const anio = fns.getYear(new Date(caso.fecha_completado));
    const fechaAsignacion = seguimiento.fecha_asignacion
      ? new Date(seguimiento.fecha_asignacion)
      : null;
    const paciente = `${caso.nombre} ${caso.apellido}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const pacienteFilter = filter.nombrePaciente
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return (
      (!filter.anio || anio === filter.anio) &&
      (!filter.fechaInicio ||
        (fechaAsignacion && fechaAsignacion >= filter.fechaInicio)) &&
      (!filter.fechaTermino ||
        (fechaAsignacion && fechaAsignacion <= filter.fechaTermino)) &&
      paciente.includes(pacienteFilter) &&
      (!filter.subCategoria || caso.subcategoria === filter.subCategoria)
    );
  });
}

export default function SeguimientoFilters(props: SeguimientoFiltersProps) {
  const { setFilterFn, subcategories } = props;
  const form = useForm<FormData>({
    defaultValues: {
      nombrePaciente: "",
    },
  });
  const { handleSubmit, control, register } = form;
  const submitMutation = useMutation(async (filter: FormData) => {
    await sleep(500);
    setFilterFn(
      () => (list: Seguimiento[]) => filterSeguimientos(filter, list)
    );
  });
  const cleanMutation = useMutation(async () => {
    form.reset();
    await sleep(500);
    setFilterFn(() => (x: Seguimiento[]) => x);
  });
  const onSubmit: SubmitHandler<FormData> = (filter) =>
    submitMutation.mutate(filter);
  const handleClean = () => cleanMutation.mutate();
  const disabled = cleanMutation.isLoading || submitMutation.isLoading;
  console.log("filterForm:", form.watch());
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-font-title">
        Criterio búsqueda (2017 - Fecha Actual)
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <Controller
            name="anio"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                label="Año"
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
          <TextInput
            {...register("nombrePaciente", {})}
            label="Nombre Paciente"
            disabled={disabled}
          />
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
              />
            )}
          />
        </div>
        <div className="flex flex-row-reverse gap-4">
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
