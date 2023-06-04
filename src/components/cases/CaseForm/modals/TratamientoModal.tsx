import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Tratamiento = any;

interface TratamientoModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewTratamientoList: Dispatch<SetStateAction<Tratamiento[]>>;
}

interface FormValues {}

const ModalRender = (props: TratamientoModalProps & ModalRenderProps) => {
  const { seguimiento, setNewTratamientoList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;

  return <></>;
};

export default function TratamientoModal(props: TratamientoModalProps) {
  return (
    <Modal
      title="Tratamiento"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewTratamientoList")}
    >
      Agregar
    </Modal>
  );
}
