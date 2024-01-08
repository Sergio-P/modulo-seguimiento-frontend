import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import {
  CodingMode,
  EntryType,
  categorySubcategories,
} from "@/types/Enums";
import { Duplicar, DuplicarCreate } from "@/types/Duplicar";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { EditModalRenderProps } from "../lists/edition";
import { SeguimientoForm } from "../../CaseForm";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { SeguimientoUpdate } from "@/types/Seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import TopoMorfoAutocompleteInput from "@/components/cases/TopoMorfoAutocompleteInput";
import { ReportsModalWrapper } from "../reports/ReportsModalWrapper";
import { postComentario } from "@/api/api";

interface DuplicarModalProps extends Partial<ModalProps> {}

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada_dg: boolean;
  categoria: string;
  subcategoria: string;
  justificacion: string;
}

export const DuplicarModalRender = (
  props: EditModalRenderProps<Duplicar>
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    defaultValues: {
      fecha_diagnostico: undefined,
      fecha_estimada_dg: undefined,
      categoria: undefined,
      subcategoria: undefined,
      justificacion: undefined,
    },
  });

  const { watch } = form;
  const categoria = watch("categoria");
  const subcategorias = categoria ? categorySubcategories[categoria] : [];

  if (!seguimiento) {
    return <></>;
  }

  const addDuplicar: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      comentario: `Se ha reportado un duplicado para este caso. Diagnóstico: ${data.categoria} ${data.subcategoria}`,
      type: "duplicate",
      data: JSON.stringify(data),
    };

    await postComentario(seguimiento.id, payload);
    handleClose();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addDuplicar)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <Controller
          name="fecha_diagnostico"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada_dg")} />
        <Controller
          name="categoria"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="col-span-2">
              <SelectInput
                label={"Categoría"}
                options={Object.keys(categorySubcategories)}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="subcategoria"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="col-span-2">
              <SelectInput
                label={"Subcategoría"}
                options={subcategorias}
                {...field}
              />
            </div>
          )}
        />
        <div className="col-span-2">
          <TextArea
            label="Justificación"
            rows={3}
            {...form.register("justificacion", { required: true })}
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
        >
          Duplicar
        </Button>
      </div>
    </form>
  );
};

export default function DuplicarModal(props: DuplicarModalProps) {
  return (
    <Modal
      title="Duplicar Caso"
      icon="2cuadrados"
      width="md"
      render={(renderProps) => (
        <DuplicarModalRender {...renderProps} />
      )}
      {..._.omit(props)}
    >
      Duplicar
    </Modal>
  );
}
