import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { Comentario, ComentarioCreate } from "@/types/Comentario";
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
  const { mutate: updateSeguimiento, isLoading } = useMutationUpdateSeguimiento(
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

  async function addComentario(data: FormValues) {
    apiClient.post(`http://localhost:8000/comentario/?seguimiento_id=${seguimiento?.id}`, data);
    handleClose();
  }

  //Quizas deberia ser mejor usando comentarios como entry 
  const addComentarioPUT: SubmitHandler<FormValues> = (data) => {
    const entryContent: ComentarioCreate = {
      comentario: data.comentario,
    };
    const payload = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [edit && prevData ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.comentario,
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
        form.handleSubmit(addComentario)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <div className="col-span-2">
          <ComentarioListFunc/>
          <TextInput
            label="Comentarios..."
            {...form.register("comentario", { required: true })}
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
        render={(renderProps) => <ComentarioModalRender {...renderProps} />}
        {...props}
      >
      </Modal>
  );
}
