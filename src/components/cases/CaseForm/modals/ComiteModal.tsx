import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { Comite } from "@/types/Comite";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ComiteModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewComiteList: Dispatch<SetStateAction<Comite[]>>;
}

interface FormValues {}

const ModalRender = (props: ComiteModalProps & ModalRenderProps) => {
  const { seguimiento, setNewComiteList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;

  return <></>;
};

export default function ComiteModal(props: ComiteModalProps) {
  return (
    <Modal
      title="Comite"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewComiteList")}
    >
      Agregar Comité
    </Modal>
  );
}
