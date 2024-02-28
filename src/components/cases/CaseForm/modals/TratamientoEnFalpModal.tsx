import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { CategoriaTTO, CodingMode, EntryType, IntencionTTO } from "@/types/Enums";
import {
  SubcategoriaTTO,
  TratamientoEnFALP,
  TratamientoEnFALPCreate,
} from "@/types/TratamientoEnFALP";
import { subcategoriaTTOForCategoriaTTO } from "@/utils/categorias";
import * as fns from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { SeguimientoForm } from "../../CaseForm";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { SeguimientoUpdate } from "@/types/Seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import { EditModalRenderProps } from "../lists/edition";
import _ from "lodash";
import { ReportsModalWrapper } from "../reports/ReportsModalWrapper";
import TopoMorfoAutocompleteInput from "@/components/cases/TopoMorfoAutocompleteInput";

interface FormValues {
  medico: string;
  fecha_de_inicio: Date;
  fecha_de_termino: Date | null;
  en_tto: boolean;
  categoria_tto: CategoriaTTO;
  subcategoria_tto: SubcategoriaTTO;
  intencion_tto: IntencionTTO;
  observaciones: string;
  descripcion_de_la_prestacion: string | null;
}

export const TratamientoEnFalpModalRender = (
  props: EditModalRenderProps<TratamientoEnFALP>
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    defaultValues: {
      en_tto: false,
      ...props.data,
      fecha_de_inicio: props.data
        ? new Date(props.data.fecha_de_inicio + " 12:00:00")
        : undefined,
      fecha_de_termino:
        props.data && props.data.fecha_de_termino
          ? new Date(props.data.fecha_de_termino + " 12:00:00")
          : undefined,
    },
  });
  const { mutate, isLoading } = useMutationUpdateSeguimiento(seguimiento?.id);

  const { watch } = form;
  const categoria_tto = watch("categoria_tto");
  const en_tto = watch("en_tto");
  const subcategoria_TTO_options =
    subcategoriaTTOForCategoriaTTO(categoria_tto);

  useEffect(() => {
    let data = JSON.parse(props.report?.extra || "{}");
    data = data[0];
    if(!data){
      return;
    }
    console.log(data, props.report);
    let fi = data["FECHA_INICIO"] || data["inicio"] || props.report?.fecha;
    form.setValue("fecha_de_inicio", fi ? new Date(fi) : null);
    let ft = data["FECHA_FIN"] || data["fin"];
    form.setValue("fecha_de_termino", ft ? new Date(ft) : null);
    form.setValue("medico", data["PRIMER_CIRUJANO"] || data["medico"]);
    form.setValue("descripcion_de_la_prestacion", data["DESC CGIA PRINCIPAL"] || props.report?.informe);
    let ttos = {
      "QUIMIOTERAPIA": CategoriaTTO.terapia_sistemica,
      "PROTOCOLO OPERATORIO": CategoriaTTO.cirugia_o_procedimiento_quirurgico,
    };
    form.setValue("categoria_tto", ttos[props.report?.tipo]);
  }, [form, props.report])

  if (!seguimiento) {
    return <></>;
  }

  const addTratamiento: SubmitHandler<FormValues> = (data) => {
    const entryContent: TratamientoEnFALPCreate = {
      ...data,
      updated_at: new Date().toISOString(),
      fecha_de_inicio: fns.format(data.fecha_de_inicio as Date, "yyyy-MM-dd"),
      fecha_de_termino:
        data.fecha_de_termino &&
        fns.format(data.fecha_de_termino as Date, "yyyy-MM-dd"),
    };

    if (en_tto) {
      entryContent.fecha_de_termino = null;
    }

    const payload: SeguimientoUpdate = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [props.edit && props.data ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.tratamiento_en_falp,
          entry_content: { id: props.data?.id || undefined, ...entryContent },
        },
      ],
    };
    mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  console.log(props.data);
  console.log("watch", watch());

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
          <Controller
            name="medico"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TopoMorfoAutocompleteInput
                initialValue={field.value}
                mode={CodingMode.practitioner}
                {...field}
              />
            )}
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
          rules={{ required: !en_tto }}
          render={({ field }) => (
            <DatePicker label="Término" disabled={en_tto} {...field} />
          )}
        />
        <Controller
          name="en_tto"
          control={form.control}
          render={({ field }) => (
            <Checkbox
              label="En Tratamiento"
              {..._.omit(field, "value")}
              checked={field.value}
            />
          )}
        />
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
          <TextArea
            label="Descripción de la prestación"
            {...form.register("descripcion_de_la_prestacion", {
              required: false,
            })}
          />
        </div>

        <div className="col-span-3">
          <TextArea
            label="Observaciones"
            {...form.register("observaciones", { required: true })}
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
          loading={isLoading}
        >
          {props.edit ? "Editar" : "Agregar"} Tratamiento
        </Button>
      </div>
    </form>
  );
};

export default function TratamientoEnFalpModal(props: Partial<ModalProps>) {
  let [fReport, setFReport] = useState(null);
  let copyTreatment = (report) => {
    setFReport(report);
  }
  let clearReport = () => {
    setFReport(null);
    return true;
  }
  return (
    <Modal
      title="Tratamientos"
      icon="plus"
      width="xl"
      render={(renderProps) => (
        <ReportsModalWrapper modtraten onCopy={copyTreatment}>
          <TratamientoEnFalpModalRender {...renderProps} report={fReport} />
        </ReportsModalWrapper>
      )}
      {...props}
    >
      Agregar
    </Modal>
  );
}
