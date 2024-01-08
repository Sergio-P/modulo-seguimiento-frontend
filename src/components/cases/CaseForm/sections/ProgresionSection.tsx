import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ProgresionList from "../lists/ProgresionList";
import ProgresionModal from "../modals/ProgresionModal";
import { Section, SubSection } from "../ui";
import { EntryType } from "@/types/Enums";
import SelectInput from "@/components/ui/SelectInput";

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
          <Controller
            name="posee_progresion"
            control={control}
            render={({ field }) => (
              <SelectInput
                label={"Presenta Progresión"}
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
                  {
                    id: 0,
                    name: "Desconocido",
                  },
                ]}
                onChange={e => field.onChange(e.id)}
              />
            )}
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
