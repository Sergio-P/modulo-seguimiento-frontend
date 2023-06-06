import Checkbox from "@/components/ui/Checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import ProgresionList from "../lists/ProgresionList";
import ProgresionModal from "../modals/ProgresionModal";
import { Section, SubSection } from "../ui";

export default function ProgresionSection() {
  const { control, register } = useFormContext();
  const tieneProgresion: boolean = useWatch({
    control,
    name: "posee_progresion",
    defaultValue: false,
  });

  return (
    <Section id="progresion" title="Progresión">
      <SubSection>
        <div className="flex justify-between">
          <Checkbox
            {...register("posee_progresion")}
            label="Presenta Progresión"
          />
          <ProgresionModal disabled={!tieneProgresion} />
        </div>
      </SubSection>
      <div className="mt-5">
        <ProgresionList />
      </div>
    </Section>
  );
}
