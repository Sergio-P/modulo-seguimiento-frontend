import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import MetastasisList from "../lists/MetastasisList";
import MetastasisModal from "../modals/MetastasisModal";
import { Section, SubSection } from "../ui";
import SelectInput from "@/components/ui/SelectInput";

export default function MetastasisSection() {
  const { control, register } = useFormContext();
  const tieneMetastasis: boolean = useWatch({
    control,
    name: "posee_metastasis",
    defaultValue: false,
  });

  return (
    <Section id="metastasis" title="Metástasis">
      <SubSection>
        <div className="flex justify-between">
          <Controller
            name="posee_metastasis"
            control={control}
            render={({ field }) => (
              <SelectInput
              label={"Presenta Metástasis"}
              options={[
                {
                  id: null,
                  name: " ",
                },
                {
                  id: true,
                  name: "Sí",
                },
                {
                  id: false,
                  name: "No",
                },
              ]}
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
