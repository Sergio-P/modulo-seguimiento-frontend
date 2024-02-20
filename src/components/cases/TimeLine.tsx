import { useContext } from "react";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import CustomListDisplay from "./Timeline/CustomListDisplay";

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
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-font-title">
            LÍNEA DE TIEMPO
          </h2>
          <div className="flex items-center rounded-2xl border border-primary px-2 font-semibold text-primary">
            <h4 className="pr-1">FECHA ÚLTIMO CONTACTO : </h4>
            <h4>{seguimiento?.ultimo_contacto}</h4>
          </div>
        </div>
        <div className="mx-auto w-full rounded-2xl bg-white py-2">
          {seguimiento && generateCustomListDisplay()}
        </div>
      </div>
    </SeguimientoContext.Provider>
  );
}
