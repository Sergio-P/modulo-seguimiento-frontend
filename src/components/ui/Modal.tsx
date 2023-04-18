import clsx from "clsx";
import Image from "next/image";
import _ from "lodash";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import SelectInput from "./SelectInput";
import Button from "./Button";
import TextInput from "./TextInput";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
  disabled?: boolean;
  metastasis?: boolean;
  recurrencia?: boolean;
  progresion?: boolean;
  tratamiento?: boolean;
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
  } = props;
  let [isOpenMetastasis, setIsOpenMetastasis] = useState(false);
  let [isOpenRecurrencia, setIsOpenRecurrencia] = useState(false);
  let [isOpenProgresion, setIsOpenProgresion] = useState(false);
  let [isOpenTratamiento, setIsOpenTratamiento] = useState(false);
  const { control } = useForm();

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
                      name="Metastasis.fecha_diagnostico"
                      control={control}
                      render={({ field }) => (
                        <DatePicker label="Fecha Diagnóstico" {...field} />
                      )}
                    />
                    <Checkbox label="Fecha Estimada" />
                    <div className="col-span-2">
                      <TextInput label="Detalle Topografía"/>
                    </div>

                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button onClick={closeModalMetastasis}>Cancelar</Button>
                    <Button filled onClick={closeModalMetastasis}>
                      Agregar Metástasis
                    </Button>
                  </div>
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
                      name="RecurrenciaCreate.fecha_diagnostico"
                      control={control}
                      render={({ field }) => (
                        <DatePicker label="Fecha Diagnóstico" {...field} />
                      )}
                    />
                    <Checkbox label="Fecha Estimada" />
                    <Controller
                      name="RecurrenciaCreate.tipo"
                      control={control}
                      defaultValue={
                        "Blablablablablablablablablablablablablabalblanalnalanlanalna"
                      }
                      render={({ field }) => (
                        <div className="col-span-2">
                          <SelectInput
                            label={"Tipo"}
                            options={[
                              {
                                id: 1,
                                name: "Blablablablablablablablablablablablablabalblanalnalanlanalna",
                              },
                              { id: 2, name: "Otro" },
                            ]}
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <div className="col-span-2">
                      <TextInput label="Detalle Topografía Recurrencia"/>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button onClick={closeModalRecurrencia}>Cancelar</Button>
                    <Button filled onClick={closeModalRecurrencia}>
                      Agregar Recurrencia
                    </Button>
                  </div>
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
                      name="ProgesionCreate.fecha_diagnostico"
                      control={control}
                      render={({ field }) => (
                        <DatePicker label="Fecha Diagnóstico" {...field} />
                      )}
                    />
                    <Checkbox label="Fecha Estimada" />
                    <Controller
                      name="ProgesionCreate.tipo"
                      control={control}
                      defaultValue={
                        "Blablablablablablablablablablablablablabalblanalnalanlanalna"
                      }
                      render={({ field }) => (
                        <div className="col-span-2">
                          <SelectInput
                            label={"Tipo"}
                            options={[
                              {
                                id: 1,
                                name: "Blablablablablablablablablablablablablabalblanalnalanlanalna",
                              },
                              { id: 2, name: "Otro" },
                            ]}
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <div className="col-span-2">
                      <TextInput label="Detalle Topografía Progresión"/>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button onClick={closeModalProgresion}>Cancelar</Button>
                    <Button filled onClick={closeModalProgresion}>
                      Agregar Progresión
                    </Button>
                  </div>
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
                    <Controller
                      name="Medico"
                      control={control}
                      defaultValue={
                        "Panchito Romero Miguel Junipero Francisco Quintero Gonzalez"
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
                    <Controller
                      name="example-date"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <DatePicker label="Inicio" {...field} />
                        </div>
                      )}
                    />
                    <Controller
                      name="example-date2"
                      control={control}
                      render={({ field }) => (
                        <DatePicker label="Término" {...field} />
                      )}
                    />
                    <Checkbox label="Tratamiento" />
                  </div>
                  <div className="pt-6 pb-4">Categorización Tratamiento</div>
                  <div className="grid grid-cols-3 items-center gap-6">
                    <Controller
                      name="Categoría"
                      control={control}
                      defaultValue={
                        "Blablablablablablablablablablablablablabalblanalnalanlanalna"
                      }
                      render={({ field }) => (
                        <SelectInput
                          label={"Categoría"}
                          options={[
                            {
                              id: 1,
                              name: "Blablablablablablablablablablablablablabalblanalnalanlanalna",
                            },
                            { id: 2, name: "Otro" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="Subcategoría"
                      control={control}
                      defaultValue={
                        "Blablablablablablablablablablablablablabalblanalnalanlanalna"
                      }
                      render={({ field }) => (
                        <SelectInput
                          label={"Subcategoría"}
                          options={[
                            {
                              id: 1,
                              name: "Blablablablablablablablablablablablablabalblanalnalanlanalna",
                            },
                            { id: 2, name: "Otro" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="Intención"
                      control={control}
                      defaultValue={
                        "Blablablablablablablablablablablablablabalblanalnalanlanalna"
                      }
                      render={({ field }) => (
                        <SelectInput
                          label={"Intención"}
                          options={[
                            {
                              id: 1,
                              name: "Blablablablablablablablablablablablablabalblanalnalanlanalna",
                            },
                            { id: 2, name: "Otro" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="Descripción"
                      control={control}
                      defaultValue={
                        "PlaceholderPORQUEAQUIVATEXTOAAAAAAAAAAAAAAAAAAAAAAAAA"
                      }
                      render={({ field }) => (
                        <div className="col-span-3">
                          <SelectInput
                            label={"Descripción prestación"}
                            options={[
                              {
                                id: 1,
                                name: "PlaceholderPORQUEAQUIVATEXTOAAAAAAAAAAAAAAAAAAAAAAAAA",
                              },
                              { id: 2, name: "Otro" },
                            ]}
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <div className="col-span-3">
                      <TextInput label="Observaciones"/>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button onClick={closeModalTratamiento}>Cancelar</Button>
                    <Button filled onClick={closeModalTratamiento}>
                      Agregar Tratamiento
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
