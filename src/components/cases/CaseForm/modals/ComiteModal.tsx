import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { Comite } from "@/types/Comite";
import { IntencionTTO } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ComiteModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewComiteList: Dispatch<SetStateAction<Comite[]>>;
}

interface FormValues {
  medico: null | string;
  intencion_tto: null | IntencionTTO;
  fecha_comite: null | Date;
}

const ModalRender = (props: ComiteModalProps & ModalRenderProps) => {
  const { seguimiento, setNewComiteList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;
  const comiteForm = useForm<FormValues>({
    defaultValues: {
      medico: null, //
      intencion_tto: null, //
      fecha_comite: null, //
    },
  });

  const addComite: SubmitHandler<FormValues> = (data) => {
    if (
      data.medico !== null &&
      data.intencion_tto !== null &&
      data.fecha_comite !== null
    ) {
      const newComite: Comite = {
        id: caso?.comites ? caso.comites.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        medico: data.medico,
        intencion_tto: data.intencion_tto,
        fecha_comite: data.fecha_comite,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewComiteList((prev: Comite[]) => {
        return [...prev, newComite];
      });
      handleClose();
    }
  };

  const { watch: watchComite } = comiteForm;
  const medico_comite = watchComite("medico");
  const intencion_tto_comite = watchComite("intencion_tto");
  const fecha_comite = watchComite("fecha_comite");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        comiteForm.handleSubmit(addComite)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_comite"
          control={comiteForm.control}
          render={({ field }) => <DatePicker label="Fecha Comité" {...field} />}
        />

        <Controller
          name="intencion_tto"
          control={comiteForm.control}
          defaultValue={IntencionTTO.curativo}
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
          <TextInput label="Médico" {...comiteForm.register("medico")} />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          filled
          type="submit"
          disabled={!medico_comite || !intencion_tto_comite || !fecha_comite}
          title={
            !medico_comite || !intencion_tto_comite || !fecha_comite
              ? "Por favor complete todos los campos"
              : ""
          }
        >
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
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewComiteList")}
    >
      Agregar Comité
    </Modal>
  );
}
