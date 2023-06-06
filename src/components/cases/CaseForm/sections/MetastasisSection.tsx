import Checkbox from "@/components/ui/Checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import MetastasisList from "../lists/MetastasisList";
import MetastasisModal from "../modals/MetastasisModal";
import { Section, SubSection } from "../ui";

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
          <Checkbox
            {...register("posee_metastasis")}
            label="Presenta Metástasis"
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
