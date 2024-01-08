import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import {
  CodingMode,
  EntryType,
  QualityReportTypes,
} from "@/types/Enums";
import { QualityReport, QualityReportCreate } from "@/types/QualityReport";
import * as fns from "date-fns";
import _ from "lodash";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SeguimientoContext } from "../context/seguimiento";
import { EditModalRenderProps } from "../lists/edition";
import { SeguimientoForm } from "../../CaseForm";
import { useMutationUpdateSeguimiento } from "@/hooks/seguimiento";
import { SeguimientoUpdate } from "@/types/Seguimiento";
import { serializeSeguimientoUpdate } from "../serialization/serialization";
import TopoMorfoAutocompleteInput from "@/components/cases/TopoMorfoAutocompleteInput";
import { ReportsModalWrapper } from "../reports/ReportsModalWrapper";
import { postComentario } from "@/api/api";

interface QualityReportModalProps extends Partial<ModalProps> {}

interface FormValues {
  patient_data: boolean;
  tumor_data: boolean;
  comite_data: boolean;
  treatment_data: boolean;
  progression_data: boolean;
  vital_data: boolean;
  justificacion: string;
}

export const QualityReportModalRender = (
  props: EditModalRenderProps<QualityReport>
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);
  const upperForm = useFormContext<SeguimientoForm>();
  const form = useForm<FormValues>({
    defaultValues: {
      patient_data: false,
      tumor_data: false,
      comite_data: false,
      treatment_data: false,
      progression_data: false,
      vital_data: false,
      justificacion: undefined,
    },
  });

  if (!seguimiento) {
    return <></>;
  }

  const addQualityReport: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    let request = Object.keys(data).reduce((v,e) => {
      if(v) {
        return v;
      }
      else if(data[e] == true && QualityReportTypes[e]) {
        return QualityReportTypes[e];
      }
      else {
        return null;
      }
    }, null);

    if(!request){
      alert("Debe seleccionar una opción");
      return;
    }

    const payload = {
      comentario: `Se ha reportado una revisión de calidad para este caso. ${request}: ${data.justificacion}`,
      type: "quality_report",
      data: JSON.stringify(data),
    };

    await postComentario(seguimiento.id, payload);
    handleClose();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(addQualityReport)(e);
        e.stopPropagation();
      }}
    >
      <div className="grid grid-cols-2 items-center gap-6">
        <div className="col-span-2">
          <span>Seleccione la/s opciones que se deben corregir en el formulario de registro</span>
        </div>
        { Object.keys(QualityReportTypes).map(q =>
          (<Checkbox label={QualityReportTypes[q]} key={q} {...form.register(q)} />)
        ) }
        <div className="col-span-2 mt-2">
          <span>Describa el error, los datos nuevos a ingresar y el lugar de obtención de la información</span>
          <TextArea
            label="Descripción"
            rows={3}
            {...form.register("justificacion", { required: true })}
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
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default function QualityReportModal(props: QualityReportModalProps) {
  return (
    <Modal
      title="Revisión Calidad"
      icon="review"
      width="lg"
      render={(renderProps) => (
        <QualityReportModalRender {...renderProps} />
      )}
      {..._.omit(props)}
    >
      Revisión Calidad
    </Modal>
  );
}
