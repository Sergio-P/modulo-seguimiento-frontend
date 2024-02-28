import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { Metastasis, MetastasisCreate } from "@/types/Metastasis";
import _ from "lodash";
import { useContext, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import * as fns from "date-fns";
import {
  CodingMode,
  EntryType,
  estadioCategories, extensionCategories,
  poseeCategories, tnmMCategories,
  tnmNCategories,
  tnmTCategories
} from "@/types/Enums";
import { EditModalRenderProps } from "../lists/edition";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import { SeguimientoForm } from "../../CaseForm";
import TopoMorfoAutocompleteInput from "@/components/cases/TopoMorfoAutocompleteInput";
import { Reports } from "../reports/Reports";
import { ReportsModalWrapper } from "../reports/ReportsModalWrapper";
import SelectInput from "@/components/ui/SelectInput";
import useSeguimientoEntries from "@/components/cases/CaseForm/hooks/useSeguimientoEntries";
import { UpdateDataContext } from "@/components/cases/CaseForm/context/updateData";
import { all } from "axios";

interface FormValues {
  fecha_diagnostico: Date;
  fecha_estimada: boolean;
  detalle_topografia: string;
  ct: string;
  cn: string;
  cm: string;
  pt: string;
  pn: string;
  pm: string;
  estadio: string;
  extension: string;
}

export const MetastasisModalRender = ({
  edit = false,
  data: prevData,
  ...props
}: EditModalRenderProps<Metastasis>) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const { mutate: updateSeguimiento, isLoading } = useMutationUpdateSeguimiento(
    seguimiento?.id
  );
  const upperForm = useFormContext<SeguimientoForm>();
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Metastasis>(
    seguimiento,
    updateData,
    EntryType.metastasis
  );
  let compact = allData.length > 0;

  let [openExtension, setOpenExtension] = useState(false);

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fecha_estimada: prevData ? prevData.fecha_estimada : false, //
      detalle_topografia: prevData ? prevData.codigo_topografia_metastasis : "", //
      ...prevData,
      fecha_diagnostico: prevData
        ? new Date(prevData.fecha_diagnostico)
        : undefined,
    },
  });

  if (!seguimiento) {
    return <></>;
  }

  const addMetastasis: SubmitHandler<FormValues> = (data) => {
    const entryContent: MetastasisCreate = {
      updated_at: new Date().toISOString(),
      fecha_diagnostico: data.fecha_diagnostico ? fns.format(data.fecha_diagnostico, "yyyy-MM-dd") : fns.format(Date.now(), "yyyy-MM-dd"),
      fecha_estimada: data.fecha_estimada,
      codigo_topografia_metastasis: data.detalle_topografia
        .split(" ")[0]
        .replace("(", "")
        .replace(")", ""),
      descripcion_topografia_metastasis: data.detalle_topografia
        .split(" ")
        .slice(1)
        .join(" "),
      numero_seguimiento: seguimiento.numero_seguimiento,
      ct: data.ct,
      cn: data.cn,
      cm: data.cm,
      pt: data.pt,
      pn: data.pn,
      pm: data.pm,
      estadio: data.estadio,
      extension: data.extension,
    };
    const payload = {
      ...serializeSeguimientoUpdate(upperForm.getValues(), seguimiento),
      [edit && prevData ? "updated_entries" : "new_entries"]: [
        {
          entry_type: EntryType.metastasis,
          entry_content: { id: prevData?.id || undefined, ...entryContent },
        },
      ],
    };
    updateSeguimiento(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addMetastasis)(e);
        e.stopPropagation();
      }}
    >
      {!compact ? <div className="grid grid-cols-2 items-center gap-6">
        <h2 className="col-span-2">Validación de Extensión al Diagnóstico</h2>
        <div className="col-span-2 grid grid-cols-3 items-center gap-6">
          <Controller
            name="ct"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"cT"}
                options={tnmTCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
          <Controller
            name="cn"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"cN"}
                options={tnmNCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
          <Controller
            name="cm"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"cM"}
                options={tnmMCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
        </div>
        <div className="col-span-2 grid grid-cols-3 items-center gap-6">
          <Controller
            name="pt"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"pT"}
                options={tnmTCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
          <Controller
            name="pn"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"pN"}
                options={tnmNCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
          <Controller
            name="pm"
            control={form.control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectInput
                label={"pM"}
                options={tnmMCategories}
                onChange={e => field.onChange(e.id)}
              />
            )}
          />
        </div>
        <Controller
          name="estadio"
          control={form.control}
          rules={{ required: false }}
          render={({ field }) => (
            <SelectInput
              label={"Estadio"}
              options={estadioCategories}
              onChange={e => field.onChange(e.id)}
            />
          )}
        />
        <Controller
          name="extension"
          control={form.control}
          rules={{ required: false }}
          render={({ field }) => (
            <SelectInput
              label={"Extensión"}
              options={extensionCategories}
              onChange={e => field.onChange(e.id)}
            />
          )}
        />
        <div className="col-span-2">
          <Checkbox label="Agregar extensión al diagnóstico" onChange={e => setOpenExtension(e.target.checked)} />
        </div>
      </div> : null}
      {compact || openExtension ? <div className="grid grid-cols-2 items-center gap-6 mt-4">
        <Controller
          name="fecha_diagnostico"
          rules={{ required: true }}
          control={form.control}
          render={({ field }) => (
            <DatePicker label="Fecha Diagnóstico" {...field} />
          )}
        />
        <Checkbox label="Fecha Estimada" {...form.register("fecha_estimada")} />
        <div className="col-span-2">
          <Controller
            name="detalle_topografia"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TopoMorfoAutocompleteInput
                initialValue={field.value}
                mode={CodingMode.topography}
                {...field}
              />
            )}
          />
        </div>
      </div> : null}
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
          {edit ? "Editar" : "Agregar"} Extensión Diagnóstica
        </Button>
      </div>
    </form>
  );
};

const metastasisKeywords = ["metastasis", "metástasis", "extension", "extensión", "mtt",
  "diseminacion", "diseminación"];

interface MetastasisModalProps extends Partial<ModalProps> {}
export default function MetastasisModal(props: MetastasisModalProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Metastasis>(
    seguimiento,
    updateData,
    EntryType.metastasis
  );
  let compact = allData.length > 0;
  return (
    <Modal
      title="Extensión al Diagnóstico"
      icon="plus"
      width="xl"
      render={(renderProps) => (
        <ReportsModalWrapper keywords={metastasisKeywords} modtratpost>
          <MetastasisModalRender {...renderProps} />
        </ReportsModalWrapper>
      )}
      {...props}
    >
      {compact ? "Agregar" : "Validar"} Extensión al Diagnóstico
    </Modal>
  );
}
