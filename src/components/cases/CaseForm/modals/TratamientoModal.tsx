import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { CategoriaTTO, IntencionTTO } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import { TratamientoEnFALP } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Tratamiento = any;

interface TratamientoModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
  setNewTratamientoList: Dispatch<SetStateAction<Tratamiento[]>>;
}

interface FormValues {
  medico: null | string;
  fecha_inicio: null | Date;
  fecha_termino: null | Date;
  en_tto: boolean;
  categoria_tto: null | CategoriaTTO;
  subcategoria_tto: null | string;
  intencion_tto: null | IntencionTTO;
  observaciones: null | string;
}

const ModalRender = (props: TratamientoModalProps & ModalRenderProps) => {
  const { seguimiento, setNewTratamientoList, handleClose } = props;
  const caso = seguimiento.caso_registro_correspondiente;

  const tratamientoForm = useForm<FormValues>({
    defaultValues: {
      medico: null, //
      fecha_inicio: null, //
      fecha_termino: null, //
      en_tto: false, //
      categoria_tto: null, //
      subcategoria_tto: null, //
      intencion_tto: null, //
      observaciones: null, //
    },
  });

  const { watch: watchTratamiento } = tratamientoForm;
  const medico = watchTratamiento("medico");
  const fecha_inicio = watchTratamiento("fecha_inicio");
  const fecha_termino = watchTratamiento("fecha_termino");
  const categoria_tto = watchTratamiento("categoria_tto");
  const subcategoria_tto = watchTratamiento("subcategoria_tto");
  const intencion_tto = watchTratamiento("intencion_tto");
  const observaciones = watchTratamiento("observaciones");
  const en_tto = watchTratamiento("en_tto");
  const subcategoria_TTO_options =
    subcategoriaTTOForCategoriaTTO(categoria_tto);

  const addTratamiento: SubmitHandler<FormValues> = (data) => {
    if (
      data.fecha_inicio !== null &&
      data.fecha_termino !== null &&
      data.categoria_tto !== null &&
      data.subcategoria_tto !== null &&
      data.intencion_tto !== null &&
      data.medico !== null &&
      data.observaciones !== null
    ) {
      const newTratamiento: TratamientoEnFALP = {
        id: caso?.tratamientos_en_falp
          ? caso.tratamientos_en_falp.length + 1
          : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        medico: data.medico,
        observaciones: data.observaciones,
        fecha_de_inicio: data.fecha_inicio,
        fecha_de_termino: data.fecha_termino,
        categoria_tto: data.categoria_tto,
        subcategoria_tto: data.subcategoria_tto,
        intencion_tto: data.intencion_tto,
        en_tto: data.en_tto,
        descripcion_de_la_prestacion: "no esta este campo en el formulario",
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewTratamientoList((prev: TratamientoEnFALP[]) => {
        return [...prev, newTratamiento];
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
          name="fecha_inicio"
          control={tratamientoForm.control}
          render={({ field }) => (
            <div>
              <DatePicker label="Inicio" {...field} />
            </div>
          )}
        />
        <Controller
          name="fecha_termino"
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

export default function TratamientoModal(props: TratamientoModalProps) {
  return (
    <Modal
      title="Tratamientos"
      icon="plus"
      render={(renderProps) => <ModalRender {...renderProps} {...props} />}
      {..._.omit(props, "seguimiento", "setNewTratamientoList")}
    >
      Agregar
    </Modal>
  );
}
