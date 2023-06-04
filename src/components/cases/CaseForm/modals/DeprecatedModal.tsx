import { Comite } from "@/types/Comite";
import {
  CategoriaTTO,
  IntencionTTO,
  TipoRecurrenciaProgresion,
} from "@/types/Enums";
import { Metastasis } from "@/types/Metastasis";
import { Progresion } from "@/types/Progresion";
import { Recurrencia } from "@/types/Recurrencia";
import { Seguimiento } from "@/types/Seguimiento";
import { TratamientoEnFALP } from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import clsx from "clsx";
import _ from "lodash";
import Image from "next/image";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
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
  metastasis?: boolean;
  recurrencia?: boolean;
  progresion?: boolean;
  tratamiento?: boolean;
  comite?: boolean;
  sign?: boolean;
  seguimiento: Seguimiento;
  setNewMetastasisList?: any;
  setNewRecurrenciaList?: any;
  setNewProgresionList?: any;
  setNewTratamientoList?: any;
  setNewComiteList?: any;
}

export default function DeprecatedModal(props: ButtonProps) {
  const {
    disabled,
    filled,
    icon,
    metastasis,
    recurrencia,
    progresion,
    tratamiento,
    seguimiento,
    comite,
    setNewMetastasisList,
    setNewRecurrenciaList,
    setNewProgresionList,
    setNewTratamientoList,
    setNewComiteList,
    sign,
  } = props;
  let [isOpenMetastasis, setIsOpenMetastasis] = useState(false);
  let [isOpenRecurrencia, setIsOpenRecurrencia] = useState(false);
  let [isOpenProgresion, setIsOpenProgresion] = useState(false);
  let [isOpenTratamiento, setIsOpenTratamiento] = useState(false);
  let [isOpenComite, setIsOpenComite] = useState(false);
  let [isOpenSign, setIsOpenSign] = useState(false);
  const { control, register } = useFormContext();

  const caso = seguimiento.caso_registro_correspondiente;
  interface MetastasisValues {
    fecha_diagnostico: Date | null;
    fecha_estimada: boolean;
    detalle_topografia: null | string;
  }

  const metastasisForm = useForm<MetastasisValues>({
    mode: "onChange",
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      detalle_topografia: null, //
    },
  });

  const { watch: watchMetastasis } = metastasisForm;
  const detalle_topografia = watchMetastasis("detalle_topografia");
  const fecha_diagnostico = watchMetastasis("fecha_diagnostico");

  interface RecurrenciaValues {
    fecha_diagnostico: null | Date;
    fecha_estimada: boolean;
    tipo: null | TipoRecurrenciaProgresion;
    detalle_topografia_recurrencia: null | string;
  }

  const recurrenciaForm = useForm<RecurrenciaValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_recurrencia: null, //
    },
  });

  const { watch: watchRecurrencia } = recurrenciaForm;
  const tipo = watchRecurrencia("tipo");
  const detalle_topografia_recurrencia = watchRecurrencia(
    "detalle_topografia_recurrencia"
  );
  const fecha_diagnostico_recurrencia = watchRecurrencia("fecha_diagnostico");

  interface ProgresionValues {
    fecha_diagnostico: null | Date;
    fecha_estimada: boolean;
    tipo: null | TipoRecurrenciaProgresion;
    detalle_topografia_progresion: null | string;
  }

  const progresionForm = useForm<ProgresionValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_progresion: null, //
    },
  });

  const { watch: watchProgresion } = progresionForm;
  const tipo_progresion = watchProgresion("tipo");
  const detalle_topografia_progresion = watchProgresion(
    "detalle_topografia_progresion"
  );
  const fecha_diagnostico_progresion = watchProgresion("fecha_diagnostico");

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

  function closeModalMetastasis() {
    setIsOpenMetastasis(false);
  }

  function openModalMetastasis() {
    setIsOpenMetastasis(true);
  }

  function closeModalRecurrencia() {
    setIsOpenRecurrencia(false);
  }

  function openModalRecurrencia() {
    setIsOpenRecurrencia(true);
  }

  function closeModalProgresion() {
    setIsOpenProgresion(false);
  }

  function openModalProgresion() {
    setIsOpenProgresion(true);
  }

  function closeModalTratamiento() {
    setIsOpenTratamiento(false);
  }

  function openModalTratamiento() {
    setIsOpenTratamiento(true);
  }

  function closeSign() {
    setIsOpenSign(false);
  }

  function openSign() {
    setIsOpenSign(true);
  }

  function openModalComite() {
    setIsOpenComite(true);
  }

  function closeModalComite() {
    setIsOpenComite(false);
  }

  const addMetastasis: SubmitHandler<MetastasisValues> = (data, event) => {
    event?.stopPropagation();
    if (data.fecha_diagnostico !== null && data.detalle_topografia !== null) {
      const newMetastasis: Metastasis = {
        id: caso?.metastasis ? caso.metastasis.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia: data.detalle_topografia,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewMetastasisList((prev: Metastasis[]) => {
        return [...prev, newMetastasis];
      });
      closeModalMetastasis();
    }
    // TODO: this shouldn't close the modal, instead it should show an error
    closeModalMetastasis();
  };

  const addRecurrencia: SubmitHandler<RecurrenciaValues> = (data) => {
    if (
      data.fecha_diagnostico !== null &&
      data.tipo !== null &&
      data.detalle_topografia_recurrencia !== null
    ) {
      const newRecurrencia: Recurrencia = {
        id: caso?.recurrencias ? caso.recurrencias.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_recurrencia: data.detalle_topografia_recurrencia,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewRecurrenciaList((prev: Recurrencia[]) => {
        return [...prev, newRecurrencia];
      });
      closeModalRecurrencia();
    }
  };

  const addProgresion: SubmitHandler<ProgresionValues> = (data) => {
    if (
      data.fecha_diagnostico !== null &&
      data.tipo !== null &&
      data.detalle_topografia_progresion !== null
    ) {
      const newProgresion: Progresion = {
        id: caso?.progresiones ? caso.progresiones.length + 1 : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_progresion: data.detalle_topografia_progresion,
        numero_seguimiento: seguimiento.numero_seguimiento,
      };
      setNewProgresionList((prev: Progresion[]) => {
        return [...prev, newProgresion];
      });
      closeModalProgresion();
    }
  };

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
          "metastasis",
          "recurrencia",
          "progresion",
          "tratamiento",
          "sign",
          "comite",
          "setNewMetastasisList",
          "setNewRecurrenciaList",
          "setNewProgresionList",
          "setNewTratamientoList",
          "setNewComiteList",
        ])}
        onClick={() => {
          if (metastasis) {
            openModalMetastasis();
          } else if (recurrencia) {
            openModalRecurrencia();
          } else if (progresion) {
            openModalProgresion();
          } else if (tratamiento) {
            openModalTratamiento();
          } else if (sign) {
            openSign();
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
        open={isOpenMetastasis}
        onClose={closeModalMetastasis}
        title="Metástasis"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            metastasisForm.handleSubmit(addMetastasis)(e);
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-2 items-center gap-6">
            <Controller
              name="fecha_diagnostico"
              control={metastasisForm.control}
              render={({ field }) => (
                <DatePicker label="Fecha Diagnóstico" {...field} />
              )}
            />
            <Checkbox
              label="Fecha Estimada"
              {...metastasisForm.register("fecha_estimada")}
            />
            <div className="col-span-2">
              <TextInput
                label="Detalle Topografía"
                {...metastasisForm.register("detalle_topografia")}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button type="button" onClick={closeModalMetastasis}>
              Cancelar
            </Button>
            <Button
              filled
              type="submit"
              disabled={!detalle_topografia || !fecha_diagnostico}
              title={
                !detalle_topografia || !fecha_diagnostico
                  ? "Por favor complete todos los campos"
                  : ""
              }
            >
              Agregar Metástasis
            </Button>
          </div>
        </form>
      </CustomDialog>

      <CustomDialog
        open={isOpenRecurrencia}
        onClose={closeModalRecurrencia}
        title="Recurrencia"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            recurrenciaForm.handleSubmit(addRecurrencia)(e);
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-2 items-center gap-6">
            <Controller
              name="fecha_diagnostico"
              control={recurrenciaForm.control}
              render={({ field }) => (
                <DatePicker label="Fecha Diagnóstico" {...field} />
              )}
            />
            <Checkbox
              label="Fecha Estimada"
              {...recurrenciaForm.register("fecha_estimada")}
            />
            <Controller
              name="tipo"
              control={recurrenciaForm.control}
              defaultValue={TipoRecurrenciaProgresion.local}
              render={({ field }) => (
                <div className="col-span-2">
                  <SelectInput
                    label={"Tipo"}
                    options={[
                      TipoRecurrenciaProgresion.local,
                      TipoRecurrenciaProgresion.regional,
                      TipoRecurrenciaProgresion.metastasis,
                      TipoRecurrenciaProgresion.peritoneal,
                      TipoRecurrenciaProgresion.sin_informacion,
                    ]}
                    {...field}
                  />
                </div>
              )}
            />
            <div className="col-span-2">
              <TextInput
                label="Detalle Topografía Recurrencia"
                {...recurrenciaForm.register("detalle_topografia_recurrencia")}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button type="button" onClick={closeModalRecurrencia}>
              Cancelar
            </Button>
            <Button
              filled
              type="submit"
              disabled={
                !tipo ||
                !detalle_topografia_recurrencia ||
                !fecha_diagnostico_recurrencia
              }
              title={
                !tipo ||
                !detalle_topografia_recurrencia ||
                !fecha_diagnostico_recurrencia
                  ? "Por favor complete todos los campos"
                  : ""
              }
            >
              Agregar Recurrencia
            </Button>
          </div>
        </form>
      </CustomDialog>

      <CustomDialog
        open={isOpenProgresion}
        onClose={closeModalProgresion}
        title="Progresión"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            progresionForm.handleSubmit(addProgresion)(e);
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-2 items-center gap-6">
            <Controller
              name="fecha_diagnostico"
              control={progresionForm.control}
              render={({ field }) => (
                <DatePicker label="Fecha Diagnóstico" {...field} />
              )}
            />
            <Checkbox
              label="Fecha Estimada"
              {...progresionForm.register("fecha_estimada")}
            />
            <Controller
              name="tipo"
              control={progresionForm.control}
              defaultValue={TipoRecurrenciaProgresion.local}
              render={({ field }) => (
                <div className="col-span-2">
                  <SelectInput
                    label={"Tipo"}
                    options={[
                      TipoRecurrenciaProgresion.local,
                      TipoRecurrenciaProgresion.regional,
                      TipoRecurrenciaProgresion.metastasis,
                      TipoRecurrenciaProgresion.peritoneal,
                      TipoRecurrenciaProgresion.sin_informacion,
                    ]}
                    {...field}
                  />
                </div>
              )}
            />
            <div className="col-span-2">
              <TextInput
                label="Detalle Topografía Progresión"
                {...progresionForm.register("detalle_topografia_progresion")}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button type="button" onClick={closeModalProgresion}>
              Cancelar
            </Button>
            <Button
              filled
              type="submit"
              disabled={
                !tipo_progresion ||
                !detalle_topografia_progresion ||
                !fecha_diagnostico_progresion
              }
              title={
                !tipo_progresion ||
                !detalle_topografia_progresion ||
                !fecha_diagnostico_progresion
                  ? "Por favor complete todos los campos"
                  : ""
              }
            >
              Agregar Progresión
            </Button>
          </div>
        </form>
      </CustomDialog>

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
        open={isOpenSign}
        onClose={closeSign}
        title="¿Estás seguro/a de firmar seguimiento?"
      >
        <form onSubmit={closeSign}>
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" onClick={closeSign}>
              Cancelar
            </Button>
            <Button filled type="submit">
              Firmar Seguimiento
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
            <Button type="button" onClick={closeModalMetastasis}>
              Cancelar
            </Button>
            <Button
              filled
              type="submit"
              disabled={
                !medico_comite || !intencion_tto_comite || !fecha_comite
              }
              title={
                !detalle_topografia || !fecha_diagnostico || !fecha_comite
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
