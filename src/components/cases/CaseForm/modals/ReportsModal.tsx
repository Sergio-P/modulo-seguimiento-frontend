import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { useMutationPostComentario } from "@/hooks/seguimiento";
import { Comentario } from "@/types/Comentario";
import { useContext } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { SeguimientoForm } from "../../CaseForm";
import { SeguimientoContext } from "../context/seguimiento";
import { EditModalRenderProps } from "../lists/edition";
import ComentarioListSection from "../sections/ComentarioListSection";
import { Reports } from "../reports/Reports";

interface FormValues {
  comentario: string;
}

export const ReportsModalRender = ({
  edit = false,
  data: prevData,
  ...props
}: EditModalRenderProps<Comentario>) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);

  return (
    <div className="h-[60vh] overflow-scroll">
      <Reports />
    </div>
  );
};

interface ReportsModalProps extends Partial<ModalProps> {}
export default function ReportsModal(props: ReportsModalProps) {
  return (
    <Modal
      title="Reportes"
      icon="FileIcon2"
      render={(renderProps) => <ReportsModalRender {...renderProps} />}
      width="lg"
      {...props}
    >
      Reportes
    </Modal>
  );
}
