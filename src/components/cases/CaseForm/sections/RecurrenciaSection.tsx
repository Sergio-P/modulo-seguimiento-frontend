import Checkbox from "@/components/ui/Checkbox";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import RecurrenciaList from "../lists/RecurrenciaList";
import RecurrenciaModal from "../modals/RecurrenciaModal";
import { Section, SubSection } from "../ui";
import SelectInput from "@/components/ui/SelectInput";

export default function RecurrenciaSection() {
  const { control, register } = useFormContext();
  const tieneRecurrencia: boolean = useWatch({
    control,
    name: "posee_recurrencia",
    defaultValue: false,
  });

  return (
    <Section id="recurrencia" title="Recurrencia">
      <SubSection>
        <div className="flex justify-between">
          <Controller
            name="posee_recurrencia"
            control={control}
            render={({ field }) => (
              <SelectInput
                label={"Presenta Recurrencia"}
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
          <RecurrenciaModal disabled={!tieneRecurrencia} />
        </div>
      </SubSection>
      <div className="mt-5">
        <RecurrenciaList />
      </div>
    </Section>
  );
}
