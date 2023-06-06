import Checkbox from "@/components/ui/Checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import RecurrenciaList from "../lists/RecurrenciaList";
import RecurrenciaModal from "../modals/RecurrenciaModal";
import { Section, SubSection } from "../ui";

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
          <Checkbox
            {...register("posee_recurrencia")}
            label="Presenta Recurrencia"
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
