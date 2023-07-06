import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { CodingMode, EntryType, TipoRecurrenciaProgresion } from "@/types/Enums";
import { Recurrencia, RecurrenciaCreate } from "@/types/Recurrencia";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { EditModalRenderProps } from "../lists/edition";
import { SeguimientoForm } from "../../CaseForm";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { SeguimientoUpdate } from "@/types/Seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import TopoMorfoAutocompleteInput from "@/components/ui/TopoMorfoAutocompleteInput";

interface RecurrenciaModalProps extends Partial<ModalProps> {}

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  tipo: TipoRecurrenciaProgresion;
  detalle_topografia_recurrencia: string;
}

export const RecurrenciaModalRender = (
  props: EditModalRenderProps<Recurrencia>
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    defaultValues: {
      fecha_estimada: false, //
      tipo: undefined, //
      detalle_topografia_recurrencia: undefined, //
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

  const addRecurrencia: SubmitHandler<FormValues> = (data) => {
    const entryContent: RecurrenciaCreate = {
      ...data,
      updated_at: new Date().toISOString(),
      tipo: data.tipo,
      fecha_diagnostico: fns.format(data.fecha_diagnostico, "yyyy-MM-dd"),
      detalle_topografia_recurrencia: data.detalle_topografia_recurrencia,
      numero_seguimiento: seguimiento.numero_seguimiento,
    };
    const payload: SeguimientoUpdate = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [props.edit && props.data ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.recurrencia,
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
        form.handleSubmit(addRecurrencia)(e);
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
                  TipoRecurrenciaProgresion.metastasis,
                  TipoRecurrenciaProgresion.peritoneal,
                  TipoRecurrenciaProgresion.sin_informacion,
                ]}
                {...field}
              />
            </div>
          )}
        />
        <div className="col-span-2">
          <Controller
            name="detalle_topografia_recurrencia"
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
          {props.edit ? "Editar" : "Agregar"} Recurrencia
        </Button>
      </div>
    </form>
  );
};

export default function RecurrenciaModal(props: RecurrenciaModalProps) {
  return (
    <Modal
      title="Recurrencia"
      icon="plus"
      render={(renderProps) => <RecurrenciaModalRender {...renderProps} />}
      {..._.omit(props)}
    >
      Agregar Recurrencia
    </Modal>
  );
}
