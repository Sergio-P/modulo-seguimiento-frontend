import Checkbox from "@/components/ui/Checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import ComiteList from "../lists/ComiteList";
import ComiteModal from "../modals/ComiteModal";
import { Section, SubSection } from "../ui";

export default function ComiteSection() {
  const { control, register } = useFormContext();
  const tieneComite: boolean = useWatch({
    control,
    name: "posee_comite",
    defaultValue: false,
  });

  return (
    <Section id="comite" title="Comité Oncológico">
      <SubSection>
        <div className="flex justify-between">
          <Checkbox
            {...register("tiene_comite_oncologico")}
            label="Presenta Comité Oncológico"
          />
          <ComiteModal disabled={!tieneComite} />
        </div>
      </SubSection>
      <div className="mt-5">
        <ComiteList />
      </div>
    </Section>
  );
}
