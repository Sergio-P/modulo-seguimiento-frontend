import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import {
  CodingMode,
  EntryType,
  TipoRecurrenciaProgresion,
} from "@/types/Enums";
import { Progresion, ProgresionCreate } from "@/types/Progresion";
import { SeguimientoUpdate } from "@/types/Seguimiento";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoForm } from "../../CaseForm";
import { SeguimientoContext } from "../context/seguimiento";
import { EditModalRenderProps } from "../lists/edition";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import TopoMorfoAutocompleteInput from "@/components/cases/TopoMorfoAutocompleteInput";
import { ReportsModalWrapper } from "../reports/ReportsModalWrapper";

interface ProgresionModalProps extends Partial<ModalProps> {}

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  tipo: TipoRecurrenciaProgresion;
  detalle_topografia_progresion: string;
}

export const ProgresionModalRender = (
  props: EditModalRenderProps<Progresion>
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    defaultValues: {
      fecha_estimada: false, //
      tipo: undefined, //
      detalle_topografia_progresion: undefined, //
      ...props.data,
      fecha_diagnostico: props.data
        ? new Date(props.data.fecha_diagnostico)
        : undefined,
    },
  });
  const { mutate, isLoading } = useMutationUpdateSeguimiento(seguimiento?.id);

  if (!seguimiento) {
    return <></>;
  }

  const addProgresion: SubmitHandler<FormValues> = (data) => {
    const entryContent: ProgresionCreate = {
      updated_at: new Date().toISOString(),
      fecha_diagnostico: fns.format(data.fecha_diagnostico, "yyyy-MM-dd"),
      fecha_estimada: data.fecha_estimada,
      tipo: data.tipo,
      numero_seguimiento: seguimiento.numero_seguimiento,
      codigo_topografia_progresion: data.detalle_topografia_progresion
        .split(" ")[0]
        .replace("(", "")
        .replace(")", ""),
      descripcion_topografia_progresion: data.detalle_topografia_progresion
        .split(" ")
        .slice(1)
        .join(" "),
    };
    const payload: SeguimientoUpdate = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [props.edit && props.data ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.progresion,
          entry_content: { id: props.data?.id || undefined, ...entryContent },
        },
      ],
    };
    mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addProgresion)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_diagnostico"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada")} />
        <Controller
          name="tipo"
          control={form.control}
          defaultValue={TipoRecurrenciaProgresion.local}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="col-span-2">
              <SelectInput
                label={"Tipo"}
                options={[
                  TipoRecurrenciaProgresion.local,
                  TipoRecurrenciaProgresion.regional,
                  TipoRecurrenciaProgresion.avanzado,
                  // TipoRecurrenciaProgresion.peritoneal,
                  // TipoRecurrenciaProgresion.sin_informacion,
                ]}
                {...field}
              />
            </div>
          )}
        />
        <div className="col-span-2">
          <Controller
            name="detalle_topografia_progresion"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TopoMorfoAutocompleteInput
                mode={CodingMode.topography}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          filled
          type="submit"
          disabled={!form.formState.isValid}
          loading={isLoading}
        >
          {props.edit ? "Editar" : "Agregar"} Progresión
        </Button>
      </div>
    </form>
  );
};

export default function ProgresionModal(props: ProgresionModalProps) {
  return (
    <Modal
      title="Progresión"
      icon="plus"
      width="xl"
      render={(renderProps) => (
        <ReportsModalWrapper>
          <ProgresionModalRender {...renderProps} />
        </ReportsModalWrapper>
      )}
      {..._.omit(props)}
    >
      Agregar Progresión
    </Modal>
  );
}
