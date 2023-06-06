import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { Comite, ComiteCreate } from "@/types/Comite";
import { EntryType, IntencionTTO } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import * as fns from "date-fns";

interface ComiteModalProps extends Partial<ModalProps> {}

interface FormValues {
  medico: string;
  intencion_tto: IntencionTTO;
  fecha_comite: Date;
}

const ModalRender = (props: ModalRenderProps) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);

  const form = useForm<FormValues>();
  if (!seguimiento || !updateData) {
    return <></>;
  }

  const addComite: SubmitHandler<FormValues> = (data) => {
    const newComite: ComiteCreate = {
      ...data,
      updated_at: new Date().toISOString(),
      fecha_comite: fns.format(data.fecha_comite, "yyyy-MM-dd"),
      numero_seguimiento: seguimiento.numero_seguimiento,
    };
    updateData.setNewEntries((prev) => [
      ...prev,
      { entry_type: EntryType.comite, entry_content: newComite },
    ]);
    handleClose();
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
        <Button filled type="submit" disabled={!form.formState.isValid}>
          Agregar Comité
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
      render={(renderProps) => <ModalRender {...renderProps} />}
      {...props}
    >
      Agregar Comité
    </Modal>
  );
}
