import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { SeguimientoForm } from "../../CaseForm";
import axiosClient from "@/utils/axios";
import { UpdateDataContext } from "../context/updateData";
import { useMutation } from "react-query";

interface SignModalProps extends Partial<ModalProps> {
  loading: boolean;
}

export default function SignModal(props: SignModalProps) {
  const form = useFormContext();
  const { control } = form;
  const causaDefuncion = useWatch({
    control,
    name: "causa_defuncion",
  });
  const estadoVital = useWatch({
    control,
    name: "estado_vital",
  });

  return (
    <Modal
      title="¿Estás seguro/a de firmar seguimiento?"
      disabled={estadoVital === "Muerto" && !causaDefuncion}
      render={(renderProps) => (
        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" onClick={renderProps.handleClose}>
            Cancelar
          </Button>
          <Button
            filled
            type="submit"
            form="seguimiento-form"
            loading={props.loading}
            onClick={() => {
              renderProps.handleClose();
            }}
          >
            Firmar Seguimiento
          </Button>
        </div>
      )}
      {..._.omit(props, "onClick")}
    >
      Firmar Seguimiento
    </Modal>
  );
}
