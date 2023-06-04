import { Comite } from "@/types/Comite";
import { CategoriaTTO, IntencionTTO } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import { TratamientoEnFALP } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import clsx from "clsx";
import _ from "lodash";
import Image from "next/image";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import Checkbox from "../../../ui/Checkbox";
import CustomDialog from "../../../ui/CustomDialog";
import DatePicker from "../../../ui/DatePicker";
import SelectInput from "../../../ui/SelectInput";
import TextInput from "../../../ui/TextInput";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
  disabled?: boolean;
  tratamiento?: boolean;
  comite?: boolean;
  seguimiento: Seguimiento;
  setNewTratamientoList?: any;
  setNewComiteList?: any;
}

export default function DeprecatedModal(props: ButtonProps) {
  const {
    disabled,
    filled,
    icon,
    tratamiento,
    seguimiento,
    comite,
    setNewTratamientoList,
    setNewComiteList,
  } = props;
  let [isOpenTratamiento, setIsOpenTratamiento] = useState(false);
  let [isOpenComite, setIsOpenComite] = useState(false);

  const caso = seguimiento.caso_registro_correspondiente;

  interface TratamientoValues {
    medico: null | string;
    fecha_inicio: null | Date;
    fecha_termino: null | Date;
    en_tto: boolean;
    categoria_tto: null | CategoriaTTO;
    subcategoria_tto: null | string;
    intencion_tto: null | IntencionTTO;
    observaciones: null | string;
  }

  const tratamientoForm = useForm<TratamientoValues>({
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

  interface ComiteValues {
    medico: null | string;
    intencion_tto: null | IntencionTTO;
    fecha_comite: null | Date;
  }

  const comiteForm = useForm<ComiteValues>({
    defaultValues: {
      medico: null, //
      intencion_tto: null, //
      fecha_comite: null, //
    },
  });

  const { watch: watchComite } = comiteForm;
  const medico_comite = watchComite("medico");
  const intencion_tto_comite = watchComite("intencion_tto");
  const fecha_comite = watchComite("fecha_comite");

  function closeModalTratamiento() {
    setIsOpenTratamiento(false);
  }

  function openModalTratamiento() {
    setIsOpenTratamiento(true);
  }

  function openModalComite() {
    setIsOpenComite(true);
  }

  function closeModalComite() {
    setIsOpenComite(false);
  }

  const addTratamiento: SubmitHandler<TratamientoValues> = (data) => {
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
      closeModalTratamiento();
    }
  };

  const addComite: SubmitHandler<ComiteValues> = (data) => {
    if (
      data.medico !== null &&
      data.intencion_tto !== null &&
      data.fecha_comite !== null
    ) {
      const newComite: Comite = {
        id: caso?.comites ? caso.comites.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        medico: data.medico,
        intencion_tto: data.intencion_tto,
        fecha_comite: data.fecha_comite,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewComiteList((prev: Comite[]) => {
        return [...prev, newComite];
      });
      closeModalComite();
    }
  };

  return (
    <>
      <button
        {..._.omit(props, [
          "icon",
          "filled",
          "tratamiento",
          "comite",
          "setNewTratamientoList",
          "setNewComiteList",
        ])}
        onClick={() => {
          if (tratamiento) {
            openModalTratamiento();
          } else if (comite) {
            openModalComite();
          }
        }}
        className={clsx(
          "h-10 rounded-lg border-2 border-primary text-sm tracking-wide",
          props.children ? "px-4" : "w-10",
          filled ? "bg-primary text-white" : "text-primary",
          disabled &&
            "border-primary border-opacity-0 bg-primary bg-opacity-50",
          props.className
        )}
      >
        {icon && props.children ? (
          <div className="flex items-center gap-3">
            <Image
              src={`/icons/${icon}.svg`}
              width={16}
              height={16}
              alt=""
              className="h-4 w-4"
            />
            <div>{props.children}</div>
          </div>
        ) : icon && !props.children ? (
          <Image
            src={`/icons/${icon}.svg`}
            width={16}
            height={16}
            alt=""
            className="m-auto h-4 w-4"
          />
        ) : (
          props.children
        )}
      </button>

      <CustomDialog
        open={isOpenTratamiento}
        onClose={closeModalTratamiento}
        title="Tratamientos"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tratamientoForm.handleSubmit(addTratamiento)(e);
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-3 items-center gap-6">
            <div className="col-span-3">
              <TextInput
                label="Médico"
                {...tratamientoForm.register("medico")}
              />
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
            <Checkbox
              label="Tratamiento"
              {...tratamientoForm.register("en_tto")}
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

            <div className="col-span-3">
              <TextInput
                label="Observaciones"
                {...tratamientoForm.register("observaciones")}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button type="button" onClick={closeModalTratamiento}>
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
      </CustomDialog>

      <CustomDialog
        open={isOpenComite}
        onClose={closeModalComite}
        title="Comité Oncológico"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            comiteForm.handleSubmit(addComite)(e);
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-2 items-center gap-6">
            <Controller
              name="fecha_comite"
              control={comiteForm.control}
              render={({ field }) => (
                <DatePicker label="Fecha Comité" {...field} />
              )}
            />

            <Controller
              name="intencion_tto"
              control={comiteForm.control}
              defaultValue={IntencionTTO.curativo}
              render={({ field }) => (
                <SelectInput
                  label={"Intención Tratamiento"}
                  options={[
                    IntencionTTO.curativo,
                    IntencionTTO.paliativo,
                    IntencionTTO.desconocido,
                  ]}
                  {...field}
                />
              )}
            />
            <div className="col-span-2">
              <TextInput label="Médico" {...comiteForm.register("medico")} />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button type="button" onClick={closeModalComite}>
              Cancelar
            </Button>
            <Button
              filled
              type="submit"
              disabled={
                !medico_comite || !intencion_tto_comite || !fecha_comite
              }
              title={
                !medico_comite || !intencion_tto_comite || !fecha_comite
                  ? "Por favor complete todos los campos"
                  : ""
              }
            >
              Agregar Comité
            </Button>
          </div>
        </form>
      </CustomDialog>
    </>
  );
}
