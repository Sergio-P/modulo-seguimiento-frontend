import clsx from "clsx";
import Image from "next/image";
import _ from "lodash";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Controller, useForm, useFormContext, useWatch, SubmitHandler } from "react-hook-form";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import SelectInput from "./SelectInput";
import Button from "./Button";
import TextInput from "./TextInput";
import { Seguimiento } from "@/types/Seguimiento";
import { Metastasis } from "@/types/Metastasis";
import { Recurrencia } from "@/types/Recurrencia";
import { Progresion } from "@/types/Progresion";
import { TratamientoEnFALP } from "@/types/TratamientoEnFALP";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
  disabled?: boolean;
  metastasis?: boolean;
  recurrencia?: boolean;
  progresion?: boolean;
  tratamiento?: boolean;
  seguimiento: Seguimiento;
  setNewMetastasisList?: any,
  setNewRecurrenciaList?: any,
  setNewProgresionList?: any,
  setNewTratamientoList?: any,
}

export default function Modal(props: ButtonProps) {
  const {
    disabled,
    filled,
    icon,
    metastasis,
    recurrencia,
    progresion,
    tratamiento,
    seguimiento,
    setNewMetastasisList,
    setNewRecurrenciaList,
    setNewProgresionList,
    setNewTratamientoList,
  } = props;
  let [isOpenMetastasis, setIsOpenMetastasis] = useState(false);
  let [isOpenRecurrencia, setIsOpenRecurrencia] = useState(false);
  let [isOpenProgresion, setIsOpenProgresion] = useState(false);
  let [isOpenTratamiento, setIsOpenTratamiento] = useState(false);
  const { control, register } = useFormContext();

  const caso = seguimiento.caso_registro_correspondiente;
  interface MetastasisValues {
    fecha_diagnostico: null | Date;
    fecha_estimada: boolean;
    detalle_topografia: null | string;
  }
  const metastasisForm = useForm<MetastasisValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      detalle_topografia: null, //
    }
  })

  interface RecurrenciaValues {
    fecha_diagnostico: null | Date;
    fecha_estimada: boolean;
    tipo: null | string;
    detalle_topografia_recurrencia: null | string;
  }

  const recurrenciaForm = useForm<RecurrenciaValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_recurrencia: null, //
    }
  })

  interface ProgresionValues {
    fecha_diagnostico: null | Date;
    fecha_estimada: boolean;
    tipo: null | string;
    detalle_topografia_progresion: null | string;
  }

  const progresionForm = useForm<ProgresionValues>({
    defaultValues: {
      fecha_diagnostico: null, //
      fecha_estimada: false, //
      tipo: null, //
      detalle_topografia_progresion: null, //
    }
  })

  interface TratamientoValues {
    medico: null | string;
    fecha_inicio: null | Date;
    fecha_fin: null | Date;
    en_tto: boolean;
    categoria_tto: null | {name: string};
    subcategoria_tto: null | {name: string};
    intencion_tto: null | {name: string};
    observaciones: null | string;
  }

  const tratamientoForm = useForm<TratamientoValues>({
    defaultValues: {
      medico: null, //
      fecha_inicio: null, //
      fecha_fin: null, //
      en_tto: false, //
      categoria_tto: null, //
      subcategoria_tto: null, //
      intencion_tto: null, //
      observaciones: null, //
    }
  })

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

  const addMetastasis: SubmitHandler<MetastasisValues> = (data) => {
    if (data.fecha_diagnostico !== null && data.detalle_topografia !== null) {
      const newMetastasis: Metastasis = {
        id: caso?.metastasis ? caso.metastasis.length +1  : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id ,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia: data.detalle_topografia
      }
      setNewMetastasisList((prev: Metastasis[]) => {
        return [...prev, newMetastasis]
      });
      closeModalMetastasis()
    }
    // TODO: this shouldn't close the modal, instead it should show an error
    closeModalMetastasis()
  }

  const addRecurrencia: SubmitHandler<RecurrenciaValues> = (data) => {
    if (data.fecha_diagnostico !== null && data.tipo !== null && data.detalle_topografia_recurrencia !== null) {
      const newRecurrencia: Recurrencia = {
        id: caso?.recurrencias ? caso.recurrencias.length +1  : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id ,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_recurrencia: data.detalle_topografia_recurrencia
      }
      setNewRecurrenciaList((prev: Recurrencia[]) => {
        return [...prev, newRecurrencia]
      });
      closeModalRecurrencia()
    }
  }

  const addProgresion: SubmitHandler<ProgresionValues> = (data) => {
    if (data.fecha_diagnostico !== null && data.tipo !== null && data.detalle_topografia_progresion !== null) {
      const newProgresion: Progresion = {
        id: caso?.progresiones ? caso.progresiones.length +1  : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id ,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        tipo: data.tipo,
        fecha_diagnostico: data.fecha_diagnostico,
        detalle_topografia_progresion: data.detalle_topografia_progresion
      }
      setNewProgresionList((prev: Progresion[]) => {
        return [...prev, newProgresion]
      });
      closeModalProgresion()
    }
  }


  const addTratamiento: SubmitHandler<TratamientoValues> = (data) => {
    if (data.fecha_inicio !== null && data.fecha_fin !== null && data.categoria_tto !== null && data.subcategoria_tto !== null && data.intencion_tto !== null && data.medico !== null && data.observaciones !== null) {
      const newTratamiento: TratamientoEnFALP = {
        id: caso?.tratamientos_en_falp ? caso.tratamientos_en_falp.length +1  : 1,
        seguimiento_id: seguimiento.id,
        caso_registro_id: seguimiento.caso_registro_id ,
        created_at: new Date(),
        updated_at: new Date(),
        ...data,
        medico: data.medico,
        observaciones: data.observaciones,
        fecha_de_inicio: data.fecha_inicio,
        fecha_de_termino: data.fecha_fin,
        categoria_tto: data.categoria_tto.name,
        subcategoria_tto: data.subcategoria_tto.name,
        intencion_tto: data.intencion_tto.name,
        descripcion_de_la_prestacion: "no esta este campo en el formulario"
      }
      setNewTratamientoList((prev: TratamientoEnFALP[]) => {
        return [...prev, newTratamiento]
      });
      closeModalTratamiento()
    }
  }


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
          "setNewMetastasisList",
          "setNewRecurrenciaList",
          "setNewProgresionList",
          "setNewTratamientoList",
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
      <Transition appear show={isOpenMetastasis} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={closeModalMetastasis}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-visible rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={metastasisForm.handleSubmit(addMetastasis)}>
                    <div className="flex justify-between">
                      <Dialog.Title
                        as="h3"
                        className="pb-6 text-3xl font-bold leading-6 text-font"
                      >
                        Metástasis
                      </Dialog.Title>
                      <Button icon="cross" clear onClick={closeModalMetastasis} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-6">
                      <Controller
                        name="fecha_diagnostico"
                        control={metastasisForm.control}
                        render={({ field }) => (
                          <DatePicker label="Fecha Diagnóstico" {...field} />
                        )}
                      />
                      <Checkbox label="Fecha Estimada" {...metastasisForm.register("fecha_estimada")} />
                      <div className="col-span-2">
                        <TextInput label="Detalle Topografía" {...metastasisForm.register("detalle_topografia")}/>
                      </div>

                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button onClick={closeModalMetastasis}>Cancelar</Button>
                      <Button filled type="submit">
                        Agregar Metástasis
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenRecurrencia} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={closeModalRecurrencia}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-visible rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={recurrenciaForm.handleSubmit(addRecurrencia)}>
                    <div className="flex justify-between">
                      <Dialog.Title
                        as="h3"
                        className="pb-6 text-3xl font-bold leading-6 text-font"
                      >
                        Recurrencia
                      </Dialog.Title>
                      <Button
                        icon="cross"
                        clear
                        onClick={closeModalRecurrencia}
                      />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-6">
                      <Controller
                        name="fecha_diagnostico"
                        control={recurrenciaForm.control}
                        render={({ field }) => (
                          <DatePicker label="Fecha Diagnóstico" {...field} />
                        )}
                      />
                      <Checkbox label="Fecha Estimada" {...recurrenciaForm.register("fecha_estimada")} />
                      <Controller
                        name="tipo"
                        control={recurrenciaForm.control}
                        defaultValue={
                          "Local"
                        }
                        render={({ field }) => (
                          <div className="col-span-2">
                            <SelectInput
                              label={"Tipo"}
                              options={[
                                {
                                  id: 1,
                                  name: "Local",
                                },
                                { id: 2, name: "Regional" },
                                { id: 3, name: "Metástasis" },
                                { id: 4, name: "Peritoneal" },
                                { id: 5, name: "Sin información" },
                              ]}
                              {...field}
                            />
                          </div>
                        )}
                      />
                      <div className="col-span-2">
                        <TextInput label="Detalle Topografía Recurrencia" {...recurrenciaForm.register("detalle_topografia_recurrencia")}/>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button onClick={closeModalRecurrencia}>Cancelar</Button>
                      <Button filled type="submit">
                        Agregar Recurrencia
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenProgresion} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={closeModalProgresion}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-visible rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={progresionForm.handleSubmit(addProgresion)}>
                    <div className="flex justify-between">
                      <Dialog.Title
                        as="h3"
                        className="pb-6 text-3xl font-bold leading-6 text-font"
                      >
                        Progresión
                      </Dialog.Title>
                      <Button icon="cross" clear onClick={closeModalProgresion} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-6">
                      <Controller
                        name="fecha_diagnostico"
                        control={progresionForm.control}
                        render={({ field }) => (
                          <DatePicker label="Fecha Diagnóstico" {...field} />
                        )}
                      />
                      <Checkbox label="Fecha Estimada" {...progresionForm.register("fecha_estimada")} />
                      <Controller
                        name="tipo"
                        control={progresionForm.control}
                        defaultValue={
                          "Local"
                        }
                        render={({ field }) => (
                          <div className="col-span-2">
                            <SelectInput
                              label={"Tipo"}
                              options={[
                                {
                                  id: 1,
                                  name: "Local",
                                },
                                { id: 2, name: "Regional" },
                                { id: 3, name: "Metástasis" },
                                { id: 4, name: "Peritoneal" },
                                { id: 5, name: "Sin información" },
                              ]}
                              {...field}
                            />
                          </div>
                        )}
                      />
                      <div className="col-span-2">
                        <TextInput label="Detalle Topografía Progresión" {...progresionForm.register("detalle_topografia_progresion")}/>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button onClick={closeModalProgresion}>Cancelar</Button>
                      <Button filled type="submit">
                        Agregar Progresión
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenTratamiento} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={closeModalTratamiento}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-visible rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={tratamientoForm.handleSubmit(addTratamiento)}>
                    <div className="flex justify-between">
                      <Dialog.Title
                        as="h3"
                        className="pb-6 text-3xl font-bold leading-6 text-font"
                      >
                        Tratamientos
                      </Dialog.Title>
                      <Button
                        icon="cross"
                        clear
                        onClick={closeModalTratamiento}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-6">
                      {/*
                        <Controller
                          name="medico"
                          control={tratamientoForm.control}
                          defaultValue={
                            {name: "Panchito Romero Miguel Junipero Francisco Quintero Gonzalez"}
                          }
                          render={({ field }) => (
                            <div className="col-span-3">
                              <SelectInput
                                label={"Médico"}
                                options={[
                                  {
                                    id: 1,
                                    name: "Panchito Romero Miguel Junipero Francisco Quintero Gonzalez",
                                  },
                                  { id: 2, name: "Otro" },
                                ]}
                                {...field}
                              />
                            </div>
                          )}
                        />
                      */}
                      <div className="col-span-3">
                        <TextInput label="Médico" {...tratamientoForm.register("medico")}/>
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
                        name="fecha_fin"
                        control={tratamientoForm.control}
                        render={({ field }) => (
                          <DatePicker label="Término" {...field} />
                        )}
                      />
                      <Checkbox label="Tratamiento" {...tratamientoForm.register("en_tto")} />
                    </div>
                    <div className="pt-6 pb-4">Categorización Tratamiento</div>
                    <div className="grid grid-cols-3 items-center gap-6">
                      <Controller
                        name="categoria_tto"
                        control={tratamientoForm.control}
                        defaultValue={
                          {name: "Cirugía o procedimiento quirúrgico"}
                        }
                        render={({ field }) => (
                          <SelectInput
                            label={"Categoría"}
                            options={[
                              { id: 1, name: "Cirugía o procedimiento quirúrgico"},
                              { id: 2, name: "Terapia sistémica" },
                              { id: 3, name: "Radioterapia" },
                              { id: 4, name: "Otro" },
                              
                            ]}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="subcategoria_tto"
                        control={tratamientoForm.control}
                        defaultValue={
                          {name: "Cirugía"}
                        }
                        render={({ field }) => (
                          <SelectInput
                            label={"Subcategoría"}
                            options={[
                              {
                                id: 1,
                                name: "Cirugía",
                              },
                              { id: 2, name: "Resección endoscópica" },
                              { id: 3, name: "Biopsia excisional o ampliación de márgenes" },
                              { id: 4, name: "Desconocido" },
                            ]}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="intencion_tto"
                        control={tratamientoForm.control}
                        defaultValue={
                          {name: "Curativo"}
                        }
                        render={({ field }) => (
                          <SelectInput
                            label={"Intención"}
                            options={[
                              {
                                id: 1,
                                name: "Curativo",
                              },
                              { id: 2, name: "Paliativo" },
                              { id: 3, name: "Desconocido" },
                            ]}
                            {...field}
                          />
                        )}
                      />
                      {/* 
                      <Controller
                        name="tratamiento.descripcion_de_la_prestacion"
                        control={control}
                        defaultValue={
                          "Menú de busqueda"
                        }
                        render={({ field }) => (
                          <div className="col-span-3">
                            <SelectInput
                              label={"Descripción prestación"}
                              options={[
                                {
                                  id: 1,
                                  name: "Menú de busqueda",
                                },
                                { id: 2, name: "Otro" },
                              ]}
                              {...field}
                            />
                          </div>
                        )}
                      />
                      */}
                      <div className="col-span-3">
                        <TextInput label="Observaciones" {...tratamientoForm.register("observaciones")}/>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button onClick={closeModalTratamiento}>Cancelar</Button>
                      <Button filled type="submit">
                        Agregar Tratamiento
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
