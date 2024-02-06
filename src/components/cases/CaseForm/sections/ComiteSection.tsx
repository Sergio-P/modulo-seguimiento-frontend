import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ComiteList from "../lists/ComiteList";
import ComiteModal from "../modals/ComiteModal";
import { Section, SubSection } from "../ui";
import SelectInput from "@/components/ui/SelectInput";
import { poseeCategories } from "@/types/Enums";

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
          <Controller
            name="posee_comite"
            control={control}
            render={({ field }) => (
              <SelectInput
                label={"Tiene Comité Oncológico"}
                options={poseeCategories}
                onChange={e => field.onChange(e.id)}
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
