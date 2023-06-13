import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import { CellContext, ColumnHelper } from "@tanstack/react-table";
import React from "react";

export interface EditModalRenderProps<T = Record<string, any>>
  extends ModalRenderProps {
  edit?: boolean;
  data?: T;
}

export function createEditColumn<T extends Record<string, any>>(
  colHelper: ColumnHelper<T>,
  name: string,
  editModalRender: React.ComponentType<EditModalRenderProps<T>>
) {
  const EditModal = editModalRender;
  return colHelper.display({
    id: "_edit_buttons",
    size: 20,
    cell: (props) => (
      <div className="flex gap-6">
        <Modal
          title={`Editar ${name}`}
          render={(renderProps) => (
            <EditModal
              edit={true}
              data={props.cell.row.original}
              {...renderProps}
            />
          )}
          clear={true}
        >
          Editar
        </Modal>
        <button
          onClick={(e) => {
            e.preventDefault();
            alert(`aquí deberíamos borrar`);
          }}
          className="h-6 w-8 text-primary"
        >
          Borrar
        </button>
      </div>
    ),
  });
}
