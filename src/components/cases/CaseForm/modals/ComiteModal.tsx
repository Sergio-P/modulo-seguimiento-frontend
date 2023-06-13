import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { Comite, ComiteCreate } from "@/types/Comite";
import { EntryType, IntencionTTO } from "@/types/Enums";
import * as fns from "date-fns";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import { EditModalRenderProps } from "../lists/edition";
import { SeguimientoForm } from "../../CaseForm";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import { SeguimientoUpdate } from "@/types/Seguimiento";

interface ComiteModalProps extends Partial<ModalProps> {}

interface FormValues {
  medico: string;
  intencion_tto: IntencionTTO;
  fecha_comite: Date;
}

export const ComiteModalRender = (props: EditModalRenderProps<Comite>) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  console.log(props.data);
  const form = useForm<FormValues>({
    defaultValues: {
      ...props.data,
      fecha_comite: props.data ? new Date(props.data.fecha_comite) : undefined,
    },
  });
  const { mutate, isLoading } = useMutationUpdateSeguimiento(seguimiento?.id);

  if (!seguimiento) {
    return <></>;
  }

  const addComite: SubmitHandler<FormValues> = (data) => {
    const entryContent: ComiteCreate = {
      ...data,
      updated_at: new Date().toISOString(),
      fecha_comite: fns.format(data.fecha_comite, "yyyy-MM-dd"),
      numero_seguimiento: seguimiento.numero_seguimiento,
    };
    const payload: SeguimientoUpdate = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [props.edit && props.data ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.comite,
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
        form.handleSubmit(addComite)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_comite"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => <DatePicker label="Fecha Comité" {...field} />}
        />

        <Controller
          name="intencion_tto"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label={"Intención Tratamiento"}
              options={[
                IntencionTTO.curativo,
                IntencionTTO.paliativo,
                IntencionTTO.desconocido,
              ]}
              {...field}
            />
          )}
        />
        <div className="col-span-2">
          <TextInput
            label="Médico"
            {...form.register("medico", { required: true })}
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
          {props.edit ? "Editar" : "Agregar"} Comité
        </Button>
      </div>
    </form>
  );
};

export default function ComiteModal(props: ComiteModalProps) {
  return (
    <Modal
      title="Comité Oncológico"
      icon="plus"
      render={(renderProps) => <ComiteModalRender {...renderProps} />}
      {...props}
    >
      Agregar Comité
    </Modal>
  );
}
