import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { TipoRecurrenciaProgresion } from "@/types/Enums";
import { Progresion } from "@/types/Progresion";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ProgresionModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewProgresionList: Dispatch<SetStateAction<Progresion[]>>;
}

interface FormValues {
  fecha_diagnostico: null | Date;
  fecha_estimada: boolean;
  tipo: null | TipoRecurrenciaProgresion;
  detalle_topografia_progresion: null | string;
}

const ModalRender = (props: ProgresionModalProps & ModalRenderProps) => {
  const { seguimiento, setNewProgresionList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;
  const progresionForm = useForm<FormValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_progresion: null, //
    },
  });

  const { watch: watchProgresion } = progresionForm;
  const tipo_progresion = watchProgresion("tipo");
  const detalle_topografia_progresion = watchProgresion(
    "detalle_topografia_progresion"
  );
  const fecha_diagnostico_progresion = watchProgresion("fecha_diagnostico");

  const addProgresion: SubmitHandler<FormValues> = (data) => {
    if (
      data.fecha_diagnostico !== null &&
      data.tipo !== null &&
      data.detalle_topografia_progresion !== null
    ) {
      const newProgresion: Progresion = {
        id: caso?.progresiones ? caso.progresiones.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_progresion: data.detalle_topografia_progresion,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewProgresionList((prev: Progresion[]) => {
        return [...prev, newProgresion];
      });
      handleClose();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        progresionForm.handleSubmit(addProgresion)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_diagnostico"
          control={progresionForm.control}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox
          label="Fecha Estimada"
          {...progresionForm.register("fecha_estimada")}
        />
        <Controller
          name="tipo"
          control={progresionForm.control}
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
            label="Detalle Topografía Progresión"
            {...progresionForm.register("detalle_topografia_progresion")}
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
            !tipo_progresion ||
            !detalle_topografia_progresion ||
            !fecha_diagnostico_progresion
          }
          title={
            !tipo_progresion ||
            !detalle_topografia_progresion ||
            !fecha_diagnostico_progresion
              ? "Por favor complete todos los campos"
              : ""
          }
        >
          Agregar Progresión
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
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewProgresionList")}
    >
      Agregar Progresión
    </Modal>
  );
}
