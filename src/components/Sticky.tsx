import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import Button from "./ui/Button";
import { SeguimientoContext } from "./cases/CaseForm/context/seguimiento";
import MoreInfoModal from "./cases/CaseForm/modals/MoreInfoModal";
import TimeLineModal from "./cases/CaseForm/modals/TimeLineModal";
import { Subtitle, BoldElement } from "./cases/CaseForm/ui";
import SelectInput from "./ui/SelectInput";
import BoundingBox from "./ui/layout/BoundingBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import sleep from "@/utils/sleep";
import {
  serializeSeguimientoUpdate,
  unserializeSeguimiento,
} from "./cases/CaseForm/serialization/serialization";
import { useForm, useFormContext } from "react-hook-form";
import { SeguimientoForm } from "./cases/CaseForm";
import { UpdateDataContext } from "./cases/CaseForm/context/updateData";

const sections = [
  { id: "metastasis", name: "Metástasis" },
  { id: "recurrencia", name: "Recurrencia" },
  { id: "progresion", name: "Progresión" },
  { id: "tratamiento", name: "Tratamiento" },
  { id: "comite", name: "Comité" },
  { id: "validacion", name: "Validación Antecedentes" },
];
console.log("hola");

// header selection

const [selectedSection, setSelectedSection] = useState(sections[0]);
const headerHeight = 251;
const handleSectionSelect = (value: { id: string; name: string }) => {
  const element = document.getElementById(value.id);
  element?.scrollIntoView({
    behavior: "auto",
  });
  window.scroll(0, window.scrollY - headerHeight);
  setSelectedSection(value);
};

interface StickyProps {
  formbool: boolean;
  caseId: string;
}


export default function Sticky(props: StickyProps) {
  console.log("holas");
  const { caseId: seguimientoId } = props;
  const seguimiento = useContext(SeguimientoContext);
  const queryClient = useQueryClient();
  const caso = useMemo(
    () => seguimiento?.caso_registro_correspondiente,
    [seguimiento]
  );

  const form = useForm<SeguimientoForm>({
    defaultValues: async () =>
      unserializeSeguimiento(await api.getSeguimiento(seguimientoId)),
  });
  const { newEntries, setNewEntries } = useContext(UpdateDataContext);

  const saveMutation = useMutation(
    async () => {
      if (!seguimiento) return;
      const requestBody = serializeSeguimientoUpdate(
        form.getValues(),
        seguimiento
      );
      requestBody.new_entries = newEntries;
      await api.updateSeguimiento(seguimiento.id, requestBody);
      await sleep(500);
    },
    {
      onSuccess: () => {
        setNewEntries([]);
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
      },
    }
  );

  if (!seguimiento) {
    return <></>;
  }

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
        <h1 className="text-4xl font-bold text-font-title">
          <Link href="/">Seguimiento de Casos</Link>
        </h1>
        <div className="flex items-center">
          <div className="mr-14 w-72">
            <SelectInput
              options={sections}
              label={"Sección"}
              value={selectedSection}
              onChange={handleSectionSelect}
            />
          </div>
          <TimeLineModal seguimientoId={seguimiento?.id} />
          <div className="flex justify-center gap-4">
            <Button icon="FileIcon" className="">
              Historial
            </Button>
            <Button
              title="Duplicar Caso"
              type="button"
              icon="2cuadrados"
              filled
            />
            <Button title="Comentar" type="button" icon="chatbubble" filled />
            <Button
              icon="SaveIcon"
              filled
              loading={saveMutation.isLoading}
              type="button"
              title="Guardar"
              onClick={() => saveMutation.mutate()}
            />
            <Link href="../../">
              <Button icon="GeoLocate" filled>
                Seguimientos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <BoundingBox thin className="m-4 border-background-dark">
          <div className="flex place-items-center justify-around">
            <div className="flex-col items-center justify-center">
              <h2 className="text-2xl font-bold">
                {caso?.nombre} {caso?.apellido}
              </h2>
              <Subtitle
                label={"Seguimiento"}
                value={seguimiento?.numero_seguimiento?.toString() || ""}
              />
            </div>
            <BoldElement label={"RUT"} value={caso?.rut_dni || ""} />
            <BoldElement label={"Ficha"} value={caso?.ficha.toString() || ""} />
            <BoldElement
              label={"Subcategoría"}
              value={caso?.subcategoria || ""}
            />
            <BoldElement
              label={"Lateralidad"}
              value={caso?.lateralidad || ""}
            />
            <MoreInfoModal seguimiento={seguimiento} />
          </div>
        </BoundingBox>
      </div>
    </div>
  );
}
