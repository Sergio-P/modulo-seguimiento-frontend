import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ComiteList from "../lists/ComiteList";
import ComiteModal from "../modals/ComiteModal";
import { Section, SubSection } from "../ui";

export default function ComiteSection() {
  const { control, register } = useFormContext();
  const tieneComite: boolean = useWatch({
    control,
    name: "tiene_comite_oncologico",
    defaultValue: false,
  });

  return (
    <Section id="comite" title="Comité Oncológico">
      <SubSection>
        <div className="flex justify-between">
          <Controller
            name="posee_metastasis"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...register("tiene_comite_oncologico")}
                label="Presenta Comité Oncológico"
                checked={field.value}
              />
            )}
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
