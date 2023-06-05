import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { CategoriaTTO, IntencionTTO } from "@/types/Enums";
import { TratamientoEnFALPCreate } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";

interface FormValues {
  medico: null | string;
  fecha_de_inicio: null | Date;
  fecha_de_termino: null | Date;
  en_tto: boolean;
  categoria_tto: null | CategoriaTTO;
  subcategoria_tto: null | string;
  intencion_tto: null | IntencionTTO;
  observaciones: null | string;
  descripcion_de_la_prestacion: null | string;
}

const ModalRender = (props: ModalRenderProps) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);

  const tratamientoForm = useForm<FormValues>({
    defaultValues: {
      medico: null, //
      fecha_de_inicio: null, //
      fecha_de_termino: null, //
      en_tto: false, //
      categoria_tto: null, //
      subcategoria_tto: null, //
      intencion_tto: null, //
      descripcion_de_la_prestacion: null, //
      observaciones: null, //
    },
  });

  const { watch: watchTratamiento } = tratamientoForm;
  const medico = watchTratamiento("medico");
  const fecha_inicio = watchTratamiento("fecha_de_inicio");
  const fecha_termino = watchTratamiento("fecha_de_termino");
  const categoria_tto = watchTratamiento("categoria_tto");
  const subcategoria_tto = watchTratamiento("subcategoria_tto");
  const intencion_tto = watchTratamiento("intencion_tto");
  const observaciones = watchTratamiento("observaciones");
  const en_tto = watchTratamiento("en_tto");
  const subcategoria_TTO_options =
    subcategoriaTTOForCategoriaTTO(categoria_tto);

  const addTratamiento: SubmitHandler<FormValues> = (data) => {
    if (
      data.fecha_de_inicio !== null &&
      data.fecha_de_termino !== null &&
      data.categoria_tto !== null &&
      data.subcategoria_tto !== null &&
      data.intencion_tto !== null &&
      data.medico !== null &&
      data.observaciones !== null
    ) {
      updateData?.setNewEntries((prev) => {
        return [
          ...prev,
          {
            entry_type: "tratamiento_en_falp",
            entry_content: {
              updated_at: new Date().toISOString(),
              medico: data.medico,
              fecha_de_inicio: fns.format(
                data.fecha_de_inicio as Date,
                "yyyy-MM-dd"
              ),
              fecha_de_termino: fns.format(
                data.fecha_de_termino as Date,
                "yyyy-MM-dd"
              ),
              en_tto: data.en_tto,
              categoria_tto: data.categoria_tto,
              subcategoria_tto: data.subcategoria_tto,
              intencion_tto: data.intencion_tto,
              descripcion_de_la_prestacion: data.descripcion_de_la_prestacion,
              observaciones: data.observaciones,
            } as TratamientoEnFALPCreate,
          },
        ];
      });
      handleClose();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        tratamientoForm.handleSubmit(addTratamiento)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-3 items-center gap-6">
        <div className="col-span-3">
          <TextInput label="Médico" {...tratamientoForm.register("medico")} />
        </div>
        <Controller
          name="fecha_de_inicio"
          control={tratamientoForm.control}
          render={({ field }) => (
            <div>
              <DatePicker label="Inicio" {...field} />
            </div>
          )}
        />
        <Controller
          name="fecha_de_termino"
          control={tratamientoForm.control}
          render={({ field }) => <DatePicker label="Término" {...field} />}
        />
        <Checkbox label="Tratamiento" {...tratamientoForm.register("en_tto")} />
      </div>
      <div className="pt-6 pb-4">Categorización Tratamiento</div>
      <div className="grid grid-cols-3 items-center gap-6">
        <Controller
          name="categoria_tto"
          control={tratamientoForm.control}
          defaultValue={CategoriaTTO.cirugia_o_procedimiento_quirurgico}
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
          control={tratamientoForm.control}
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
          control={tratamientoForm.control}
          defaultValue={IntencionTTO.curativo}
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
            {...tratamientoForm.register("descripcion_de_la_prestacion")}
          />
        </div>

        <div className="col-span-3">
          <TextInput
            label="Observaciones"
            {...tratamientoForm.register("observaciones")}
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
          disabled={
            !medico ||
            !fecha_inicio ||
            !fecha_termino ||
            !categoria_tto ||
            !subcategoria_tto ||
            !intencion_tto ||
            !observaciones
          }
          title={
            !medico ||
            !fecha_inicio ||
            !fecha_termino ||
            !categoria_tto ||
            !subcategoria_tto ||
            !intencion_tto ||
            !observaciones
              ? "Por favor complete todos los campos"
              : ""
          }
        >
          Agregar Tratamiento
        </Button>
      </div>
    </form>
  );
};

export default function TratamientoModal(props: Partial<ModalProps>) {
  return (
    <Modal
      title="Tratamientos"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} />}
      {..._.omit(props)}
    >
      Agregar
    </Modal>
  );
}
