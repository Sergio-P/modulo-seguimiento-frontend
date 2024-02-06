import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import _ from "lodash";
import { useFormContext, useWatch } from "react-hook-form";

interface SignModalProps extends Partial<ModalProps> {
  loading: boolean;
}

export default function SignModal(props: SignModalProps) {
  const form = useFormContext();
  const { control, formState } = form;
  const causaDefuncion = useWatch({
    control,
    name: "causa_defuncion",
  });
  const estadoVital = useWatch({
    control,
    name: "estado_vital",
  });
  const metastasis = useWatch({
    control,
    name: "posee_metastasis",
  });
  const recurrencia = useWatch({
    control,
    name: "posee_recurrencia",
  });
  const progresion = useWatch({
    control,
    name: "posee_progresion",
  });
  const comite = useWatch({
    control,
    name: "posee_comite",
  });
  const tto = useWatch({
    control,
    name: "posee_tto",
  });
  const condicion = useWatch({
    control,
    name: "condicion_del_caso",
  });

  const validateForm = () => {
    return metastasis != null && recurrencia != null  && progresion != null
      && comite != null  && condicion != null && tto != null
      && (estadoVital === "Vivo" || (estadoVital === "Muerto" && !!causaDefuncion));
  }

  return (
    <Modal
      title="¿Estás seguro/a de firmar seguimiento?"
      disabled={!validateForm()}
      render={(renderProps) => (
        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" onClick={() => { console.log(formState.errors, formState.isValid); renderProps.handleClose()}}>
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
