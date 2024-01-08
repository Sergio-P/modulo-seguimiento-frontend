import Button from "@/components/ui/Button";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import _ from "lodash";
import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";

export const HistoricalModalRender = (
  props: ModalProps
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);

  if (!seguimiento) {
    return <></>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 items-center gap-6">
        <span>PLACEHOLDER</span>
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default function HistoricalModal(props: Partial<ModalProps>) {
  return (
    <Modal
      title="Históricos de Casos"
      icon="history"
      width="md"
      render={(renderProps) => (
        <HistoricalModalRender {...renderProps} />
      )}
      {..._.omit(props)}
    >
      Históricos
    </Modal>
  );
}
