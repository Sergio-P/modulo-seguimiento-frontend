import { useContext } from "react";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import { UpdateDataContext } from "./CaseForm/context/updateData";
import { Disclosure, Transition, Tab } from "@headlessui/react";
import MetastasisList from "./CaseForm/lists/MetastasisList";
import RecurrenciaList from "./CaseForm/lists/RecurrenciaList";
import ProgresionList from "./CaseForm/lists/ProgresionList";
import ComiteList from "./CaseForm/lists/ComiteList";
import TratamientoEnFALPList from "./CaseForm/lists/TratamientoEnFALPList";
import CustomListDisplay from "../ui/CustomListDisplay";

interface TimeLineProps {}

export default function TimeLine(props: TimeLineProps) {
  const seguimiento = useContext(SeguimientoContext);
  console.log("numero de seguimiento", seguimiento?.numero_seguimiento);
  console.log("seguimiento", seguimiento);

  const generateCustomListDisplay = () => {
    let display = [];
    if (seguimiento) {
      for (let i = seguimiento?.numero_seguimiento; i >= 0; i--) {
        display.push(<CustomListDisplay origen={i === 0 ? null : i} key={i} />);
      }
    }
    return display;
  };

  return (
    <SeguimientoContext.Provider value={seguimiento}>
      <div>
        <div className="flex justify-between pr-2">
          <h2 className="text-2xl font-bold">LÍNEA DE TIEMPO</h2>
          <div className="flex">
            <h3 className="pr-1 font-bold">Ultimo Contacto:</h3>
            <h3>{seguimiento?.ultimo_contacto}</h3>
          </div>
        </div>
        <div className="mx-auto w-full rounded-2xl bg-white p-2">
        {seguimiento && generateCustomListDisplay()}
        </div>
      </div>
    </SeguimientoContext.Provider>
  );
}
