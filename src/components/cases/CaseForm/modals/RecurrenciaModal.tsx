import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { TipoRecurrenciaProgresion } from "@/types/Enums";
import { Recurrencia } from "@/types/Recurrencia";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface RecurrenciaModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewRecurrenciaList: Dispatch<SetStateAction<Recurrencia[]>>;
}

interface RecurrenciaValues {
  fecha_diagnostico: null | Date;
  fecha_estimada: boolean;
  tipo: null | TipoRecurrenciaProgresion;
  detalle_topografia_recurrencia: null | string;
}

const ModalRender = (props: RecurrenciaModalProps & ModalRenderProps) => {
  const { seguimiento, setNewRecurrenciaList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;
  const form = useForm<RecurrenciaValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_recurrencia: null, //
    },
  });

  const tipo = form.watch("tipo");
  const detalle_topografia_recurrencia = form.watch(
    "detalle_topografia_recurrencia"
  );
  const fecha_diagnostico_recurrencia = form.watch("fecha_diagnostico");

  const addRecurrencia: SubmitHandler<RecurrenciaValues> = (data) => {
    if (
      data.fecha_diagnostico !== null &&
      data.tipo !== null &&
      data.detalle_topografia_recurrencia !== null
    ) {
      const newRecurrencia: Recurrencia = {
        id: caso?.recurrencias ? caso.recurrencias.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_recurrencia: data.detalle_topografia_recurrencia,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewRecurrenciaList((prev: Recurrencia[]) => {
        return [...prev, newRecurrencia];
      });
      handleClose();
    }
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
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada")} />
        <Controller
          name="tipo"
          control={form.control}
          defaultValue={TipoRecurrenciaProgresion.local}
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
          <TextInput
            label="Detalle Topografía Recurrencia"
            {...form.register("detalle_topografia_recurrencia")}
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
          disabled={
            !tipo ||
            !detalle_topografia_recurrencia ||
            !fecha_diagnostico_recurrencia
          }
          title={
            !tipo ||
            !detalle_topografia_recurrencia ||
            !fecha_diagnostico_recurrencia
              ? "Por favor complete todos los campos"
              : ""
          }
        >
          Agregar Recurrencia
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
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewRecurrenciaList")}
    >
      Agregar Recurrencia
    </Modal>
  );
}
