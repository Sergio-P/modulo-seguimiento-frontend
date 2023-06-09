import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { MetastasisCreate } from "@/types/Metastasis";
import _ from "lodash";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import * as fns from "date-fns";
import { EntryType } from "@/types/Enums";

interface MetastasisModalProps extends Partial<ModalProps> {}

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  detalle_topografia: string;
}

const ModalRender = (props: ModalRenderProps) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fecha_diagnostico: undefined, //
      fecha_estimada: false, //
      detalle_topografia: "", //
    },
  });

  if (!seguimiento || !updateData) {
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
    updateData.setNewEntries((prev) => [
      ...prev,
      {
        entry_type: EntryType.metastasis,
        entry_content: entryContent,
      },
    ]);
    handleClose();
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
          <TextInput
            label="Detalle Topografía"
            {...form.register("detalle_topografia", { required: true })}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cancelar
        </Button>
        <Button filled type="submit" disabled={!form.formState.isValid}>
          Agregar Metástasis
        </Button>
      </div>
    </form>
  );
};

export default function MetastasisModal(props: MetastasisModalProps) {
  return (
    <Modal
      title="Metástasis"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} />}
      {...props}
    >
      Agregar Metástasis
    </Modal>
  );
}
