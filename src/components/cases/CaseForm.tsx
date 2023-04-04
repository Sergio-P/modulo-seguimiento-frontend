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
          <Button className="flex items-center gap-3">
            <div className="translate-y-[1px]">
              <Image src="/icons/FileIcon.svg" width={16} height={16} alt="" />
            </div>
            <div className="text-sm font-semibold tracking-wide">
              Historial
            </div>
          </Button>
        </div>
      </div>

      <div className="px-5 pt-8">
        <div className="w-600 flex justify-between rounded-xl border-2 border-primary p-4">
          <h1 className="font-bold flex-none">{data.patient.name}</h1>
          <Foo label={"Rut"} value={data.patient.rut} />
          <Foo label={"Registro"} value={data.patient.registro} />
          <Foo label={"Ficha"} value={data.patient.ficha} />
          <div className="flex justify-between">
            <Button type="filled" className="flex items-center gap-3">
              <div className="translate-y-[1px]">
                <Image src="/icons/2cuadrados.svg" width={16} height={16} alt="" />
              </div>
            </Button>
            <Button type="filled" className="flex items-center gap-3">
              <div className="translate-y-[1px]">
                <Image src="/icons/2cuadrados.svg" width={16} height={16} alt="" />
              </div>
            </Button>
          </div>
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
