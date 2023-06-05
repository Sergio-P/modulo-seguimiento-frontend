import SelectInput from "@/components/ui/SelectInput";
import { EntryType } from "@/types/Enums";
import TratamientoList from "../lists/TratamientoList";
import TratamientoModal from "../modals/TratamientoModal";
import { Section, SubSection } from "../ui";

export default function TratamientoSection() {
  return (
    <Section id="tratamiento" title="Antecedentes Tratamiento">
      <SubSection title="">
        <div className="grid max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div>
            <SelectInput
              label={"Agregar Tratamiento"}
              options={[
                {
                  id: EntryType.tratamiento_antes_falp,
                  name: "Tratamiento Antes de FALP",
                },
                {
                  id: EntryType.tratamiento_en_falp,
                  name: "Tratamiento En FALP",
                },
                {
                  id: EntryType.tratamiento_post_durante_falp,
                  name: "Tratamiento Post/Durante FALP",
                },
              ]}
            />
          </div>
          <TratamientoModal className="max-w-[115px]" />
        </div>
        <div className="mt-5">
          <TratamientoList />
        </div>
      </SubSection>
    </Section>
  );
}
