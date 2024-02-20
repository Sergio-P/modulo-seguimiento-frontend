import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import MetastasisList from "../lists/MetastasisList";
import MetastasisModal from "../modals/MetastasisModal";
import { Section, SubSection } from "../ui";
import SelectInput from "@/components/ui/SelectInput";
import { poseeCategories } from "@/types/Enums";

export default function MetastasisSection() {
  const { control, register } = useFormContext();
  const tieneMetastasis: boolean | null = useWatch({
    control,
    name: "posee_metastasis",
    defaultValue: null
  });

  return (
    <Section id="metastasis" title="Extensión al Diagnóstico">
      <SubSection>
        <div className="flex justify-between">
          <Controller
            name="posee_metastasis"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              label={"Presenta Extensión al Diagnóstico"}
              options={poseeCategories}
              onChange={e => field.onChange(e.id)}
              />
            )}
          />
          <MetastasisModal disabled={!tieneMetastasis} />
        </div>

        <div className="mt-5">
          <MetastasisList />
        </div>
      </SubSection>
    </Section>
  );
}
