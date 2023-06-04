import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { Metastasis } from "@/types/Metastasis";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface MetastasisModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewMetastasisList: Dispatch<SetStateAction<Metastasis[]>>;
}

interface MetastasisValues {
  fecha_diagnostico: Date | null;
  fecha_estimada: boolean;
  detalle_topografia: null | string;
}

const ModalRender = (props: MetastasisModalProps & ModalRenderProps) => {
  const { seguimiento, setNewMetastasisList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;
  const form = useForm<MetastasisValues>({
    mode: "onChange",
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      detalle_topografia: null, //
    },
  });
  const detalle_topografia = form.watch("detalle_topografia");
  const fecha_diagnostico = form.watch("fecha_diagnostico");
  const addMetastasis: SubmitHandler<MetastasisValues> = (data, event) => {
    event?.stopPropagation();
    if (data.fecha_diagnostico !== null && data.detalle_topografia !== null) {
      const newMetastasis: Metastasis = {
        id: caso?.metastasis ? caso.metastasis.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia: data.detalle_topografia,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewMetastasisList((prev: Metastasis[]) => {
        return [...prev, newMetastasis];
      });
      handleClose();
    }
    // TODO: this shouldn't close the modal, instead it should show an error
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
          control={form.control}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada")} />
        <div className="col-span-2">
          <TextInput
            label="Detalle Topografía"
            {...form.register("detalle_topografia")}
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
          disabled={!detalle_topografia || !fecha_diagnostico}
          title={
            !detalle_topografia || !fecha_diagnostico
              ? "Por favor complete todos los campos"
              : ""
          }
        >
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
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewMetastasisList")}
    >
      Agregar Metástasis
    </Modal>
  );
}
