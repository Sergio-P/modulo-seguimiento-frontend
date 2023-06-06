import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import {
  CategoriaTTO,
  IntencionTTO,
  LugarTTO,
  SubcategoriaTTOCirugiaOProcedimientoQuirurgico,
  SubcategoriaTTOOtro,
  SubcategoriaTTORadioterapia,
  SubcategoriaTTOTerapiaSistemica,
} from "@/types/Enums";
import { TratamientoEnFALPCreate } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import { TratamientoPostDuranteFALPCreate } from "@/types/TratamientoPostDuranteFALP";

interface FormValues {
  fecha_de_inicio: null | Date;
  fecha_estimada: Boolean;
  categoria_tto: CategoriaTTO | null;
  subcategoria_tto:
    | SubcategoriaTTOCirugiaOProcedimientoQuirurgico
    | SubcategoriaTTOTerapiaSistemica
    | SubcategoriaTTORadioterapia
    | SubcategoriaTTOOtro
    | null;
  lugar_tto: LugarTTO | null;
  intencion_tto: IntencionTTO | null;
  observaciones: string | null;
  numero_seguimiento?: number | null;
}

const ModalRender = (props: ModalRenderProps) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);

  const tratamientoForm = useForm<FormValues>({
    defaultValues: {
      fecha_de_inicio: null, //
      fecha_estimada: false, //
      categoria_tto: null, //
      subcategoria_tto: null, //
      intencion_tto: null, //
      lugar_tto: null, //
      observaciones: null, //
    },
  });

  const { watch: watchTratamiento } = tratamientoForm;
  const fecha_inicio = watchTratamiento("fecha_de_inicio");
  const categoria_tto = watchTratamiento("categoria_tto");
  const subcategoria_tto = watchTratamiento("subcategoria_tto");
  const lugar_tto = watchTratamiento("lugar_tto");
  const intencion_tto = watchTratamiento("intencion_tto");
  const observaciones = watchTratamiento("observaciones");
  const subcategoria_TTO_options =
    subcategoriaTTOForCategoriaTTO(categoria_tto);

  const addTratamiento: SubmitHandler<FormValues> = (data) => {
    if (
      data.fecha_de_inicio !== null &&
      data.fecha_estimada !== null &&
      data.categoria_tto !== null &&
      data.subcategoria_tto !== null &&
      data.lugar_tto !== null &&
      data.intencion_tto !== null &&
      data.observaciones !== null
    ) {
      updateData?.setNewEntries((prev) => {
        return [
          ...prev,
          {
            entry_type: "tratamiento_post_durante_falp",
            entry_content: {
              updated_at: new Date().toISOString(),
              fecha_de_inicio: fns.format(
                data.fecha_de_inicio as Date,
                "yyyy-MM-dd"
              ),
              fecha_estimada: data.fecha_estimada,
              categoria_tto: data.categoria_tto,
              subcategoria_tto: data.subcategoria_tto,
              lugar_tto: data.lugar_tto,
              intencion_tto: data.intencion_tto,
              observaciones: data.observaciones,
            } as TratamientoPostDuranteFALPCreate,
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
        <Controller
          name="fecha_de_inicio"
          control={tratamientoForm.control}
          render={({ field }) => (
            <div>
              <DatePicker label="Inicio" {...field} />
            </div>
          )}
        />
        <Checkbox
          label="Fecha estimada"
          {...tratamientoForm.register("fecha_estimada")}
        />
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

        <Controller
          name="lugar_tto"
          control={tratamientoForm.control}
          defaultValue={LugarTTO.extra_sistema_sistema_privado}
          render={({ field }) => (
            <SelectInput
              label={"Lugar Tratamiento"}
              options={[
                LugarTTO.extra_sistema_sistema_privado,
                LugarTTO.extra_sistema_sistema_publico,
                LugarTTO.otros,
              ]}
              {...field}
            />
          )}
        />

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
            !fecha_inicio ||
            !categoria_tto ||
            !subcategoria_tto ||
            !intencion_tto ||
            !lugar_tto ||
            !observaciones
          }
          title={
            !fecha_inicio ||
            !categoria_tto ||
            !subcategoria_tto ||
            !intencion_tto ||
            !lugar_tto ||
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

export default function TratamientoEnFalpModal(props: Partial<ModalProps>) {
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
