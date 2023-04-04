import clsx from "clsx";
import Image from "next/image";
import Button from "../ui/Button";

interface CaseFormProps {
  caseId: string;
}

export default function CaseForm(props: CaseFormProps) {
  const { caseId } = props;
  const data = {
    patient: {
      rut: "10.233.456-8",
      name: "Marcelo Donoso R.",
      registro: "0000000",
      ficha: "094321223",
    },
  };
  return (
    <div>
      <div className="sticky">
        <div className="flex gap-7 border-b py-6 px-5 pb-3">
          <h1 className="text-4xl font-bold text-font-title">
            Seguimiento de Casos
          </h1>
          <Button icon="GeoLocate" filled className="flex items-center gap-2">
            Seguimientos
          </Button>
          <Button>Historial</Button>
        </div>
      </div>

      <div className="px-5 pt-8">
        <div className="w-600 grid grid-cols-4 gap-4 rounded-xl border-2 border-primary p-4">
          <h1 className="font-bold">{data.patient.name}</h1>
          <Foo label={"Rut"} value={data.patient.rut} />
          <Foo label={"Registro"} value={data.patient.registro} />
          <Foo label={"Ficha"} value={data.patient.ficha} />
        </div>
      </div>
    </div>
  );
}

function Foo(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <div className="flex gap-1">
      <div className="font-bold">{label}: </div> <div>{value}</div>
    </div>
  );
}
