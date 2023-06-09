import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { CategoriaTTO, EntryType, IntencionTTO } from "@/types/Enums";
import { TratamientoEnFALPCreate } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import * as fns from "date-fns";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateDataContext } from "../context/updateData";

interface FormValues {
  medico: string;
  fecha_de_inicio: Date;
  fecha_de_termino: Date;
  en_tto: boolean;
  categoria_tto: CategoriaTTO;
  subcategoria_tto: string;
  intencion_tto: IntencionTTO;
  observaciones: string;
  descripcion_de_la_prestacion: string;
}

const ModalRender = (props: ModalRenderProps) => {
  const { handleClose } = props;
  const updateData = useContext(UpdateDataContext);

  const form = useForm<FormValues>({
    defaultValues: {
      en_tto: false, //
    },
  });

  const { watch: watchTratamiento } = form;
  const categoria_tto = watchTratamiento("categoria_tto");
  const subcategoria_TTO_options =
    subcategoriaTTOForCategoriaTTO(categoria_tto);

  const addTratamiento: SubmitHandler<FormValues> = (data) => {
    const newTratamiento: TratamientoEnFALPCreate = {
      ...data,
      updated_at: new Date().toISOString(),
      fecha_de_inicio: fns.format(data.fecha_de_inicio as Date, "yyyy-MM-dd"),
      fecha_de_termino: fns.format(data.fecha_de_termino as Date, "yyyy-MM-dd"),
    };

    updateData?.setNewEntries((prev) => [
      ...prev,
      {
        entry_type: EntryType.tratamiento_en_falp,
        entry_content: newTratamiento,
      },
    ]);
    handleClose();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addTratamiento)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-3 items-center gap-6">
        <div className="col-span-3">
          <TextInput
            label="Médico"
            {...form.register("medico", { required: true })}
          />
        </div>
        <Controller
          name="fecha_de_inicio"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <DatePicker label="Inicio" {...field} />
            </div>
          )}
        />
        <Controller
          name="fecha_de_termino"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => <DatePicker label="Término" {...field} />}
        />
        <Checkbox label="Tratamiento" {...form.register("en_tto")} />
      </div>
      <div className="pt-6 pb-4">Categorización Tratamiento</div>
      <div className="grid grid-cols-3 items-center gap-6">
        <Controller
          name="categoria_tto"
          control={form.control}
          defaultValue={CategoriaTTO.cirugia_o_procedimiento_quirurgico}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label={"Categoría"}
              options={[
                CategoriaTTO.cirugia_o_procedimiento_quirurgico,
                CategoriaTTO.terapia_sistemica,
                CategoriaTTO.radioterapia,
                CategoriaTTO.otro,
              ]}
              {...field}
            />
          )}
        />
        <Controller
          name="subcategoria_tto"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label={"Subcategoría"}
              options={subcategoria_TTO_options}
              {...field}
            />
          )}
        />
        <Controller
          name="intencion_tto"
          control={form.control}
          defaultValue={IntencionTTO.curativo}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              label={"Intención"}
              options={[
                IntencionTTO.curativo,
                IntencionTTO.paliativo,
                IntencionTTO.desconocido,
              ]}
              {...field}
            />
          )}
        />

        <div className="col-span-3">
          <TextInput
            label="Descripción de la prestación"
            {...form.register("descripcion_de_la_prestacion", {
              required: true,
            })}
          />
        </div>

        <div className="col-span-3">
          <TextInput
            label="Observaciones"
            {...form.register("observaciones", { required: true })}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cancelar
        </Button>
        <Button filled type="submit" disabled={!form.formState.isValid}>
          Agregar Tratamiento
        </Button>
      </div>
    </form>
  );
};

export default function TratamientoEnFalpModal(props: Partial<ModalProps>) {
  return (
    <Modal
      title="Tratamientos"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} />}
      {...props}
    >
      Agregar
    </Modal>
  );
}
