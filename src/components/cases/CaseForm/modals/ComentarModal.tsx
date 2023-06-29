import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { Comentario, ComentarioCreate } from "@/types/Comentario";
import _, { add } from "lodash";
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
import {
  useMutationPostComentario,
  useMutationUpdateSeguimiento,
} from "@/hooks/seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import { SeguimientoForm } from "../../CaseForm";
import apiClient from "@/utils/axios";
import ComentarioList from "../lists/ComentarioList";
import ComentarioListFunc from "../lists/ComentarioList";
import { api } from "@/api";

interface FormValues {
  comentario: string;
}

export const ComentarioModalRender = ({
  edit = false,
  data: prevData,
  ...props
}: EditModalRenderProps<Comentario>) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const { mutate: postComentario, isLoading } = useMutationPostComentario(
    seguimiento?.id
  );
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      comentario: "", //
      ...prevData,
    },
  });

  if (!seguimiento) {
    return <></>;
  }

  const addComentario: SubmitHandler<FormValues> = (data) => {
    const payload = {
      comentario: data.comentario,
    };

    postComentario(payload, {
      onSuccess: () => {},
    });
  };

  return (
    <form
      className="h-[77vh]"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addComentario)(e);
        e.stopPropagation();
      }}
    >
      <div className="flex-col items-center">
        <ComentarioListFunc />
        
        <TextInput
          className="mt-6"
          label="Comentarios..."
          {...form.register("comentario", { required: true })}
        />
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
          {edit ? "Editar" : "Agregar"} Comentario
        </Button>
      </div>
    </form>
  );
};

interface ComentarioModalProps extends Partial<ModalProps> {}
export default function ComentarioModal(props: ComentarioModalProps) {
  return (
    <Modal
      title="Comentarios"
      icon="chatbubble"
      width="lg"
      render={(renderProps) => <ComentarioModalRender {...renderProps} />}
      {...props}
    >
      Comentarios
    </Modal>
  );
}
