import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { Metastasis, MetastasisCreate } from "@/types/Metastasis";
import _ from "lodash";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import * as fns from "date-fns";
import { EntryType } from "@/types/Enums";
import { EditModalRenderProps } from "../lists/edition";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import { SeguimientoForm } from "../../CaseForm";

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  detalle_topografia: string;
}

export const MetastasisModalRender = ({
  edit = false,
  data: prevData,
  ...props
}: EditModalRenderProps<Metastasis>) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const { mutate: updateSeguimiento, isLoading } = useMutationUpdateSeguimiento(
    seguimiento?.id
  );
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fecha_estimada: false, //
      detalle_topografia: "", //
      ...prevData,
      fecha_diagnostico: prevData
        ? new Date(prevData.fecha_diagnostico)
        : undefined,
    },
  });

  if (!seguimiento) {
    return <></>;
  }

  const addMetastasis: SubmitHandler<FormValues> = (data) => {
    const entryContent: MetastasisCreate = {
      updated_at: new Date().toISOString(),
      fecha_diagnostico: fns.format(data.fecha_diagnostico, "yyyy-MM-dd"),
      fecha_estimada: data.fecha_estimada,
      detalle_topografia: data.detalle_topografia,
      numero_seguimiento: seguimiento.numero_seguimiento,
    };
    const payload = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [edit && prevData ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.metastasis,
          entry_content: { id: prevData?.id || undefined, ...entryContent },
        },
      ],
    };
    updateSeguimiento(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addMetastasis)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_diagnostico"
          rules={{ required: true }}
          control={form.control}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada")} />
        <div className="col-span-2">
          <TextArea
            label="Detalle Topografía"
            {...form.register("detalle_topografia", { required: true })}
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
          {edit ? "Editar" : "Agregar"} Metástasis
        </Button>
      </div>
    </form>
  );
};

interface MetastasisModalProps extends Partial<ModalProps> {}
export default function MetastasisModal(props: MetastasisModalProps) {
  return (
    <Modal
      title="Metástasis"
      icon="plus"
      render={(renderProps) => <MetastasisModalRender {...renderProps} />}
      {...props}
    >
      Agregar Metástasis
    </Modal>
  );
}
