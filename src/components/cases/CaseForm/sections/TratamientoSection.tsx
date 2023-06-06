import SelectInput from "@/components/ui/SelectInput";
import { EntryType } from "@/types/Enums";
import TratamientoEnFALPList from "../lists/TratamientoEnFALPList";
import TratamienPostFALPList from "../lists/TratamientoPostFALPList";
import TratamientoAntesFALPList from "../lists/TratamientoAntesFALPList";
import TratamientoModal from "../modals/TratamientoModal";
import { Section, SubSection } from "../ui";
import { useWatch, useFormContext, Controller } from "react-hook-form";

export default function TratamientoSection() {
  const { control } = useFormContext();
  const selectedTreatment = useWatch({
    control,
    name: "treatmentOption",
    defaultValue: { id: EntryType.tratamiento_en_falp, name: "Tratamiento En FALP" },
  });
  console.log("TratamientoSection selectedTreatment: ", selectedTreatment);

  return (
    <Section id="tratamiento" title="Antecedentes Tratamiento">
      <SubSection title="">
        <div className="grid max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div>
            <Controller
              name="treatmentOption"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label={"Agregar Tratamiento"}
                  defaultValue={{
                    id: EntryType.tratamiento_en_falp,
                    name: "Tratamiento En FALP",
                  }}
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
                  {...field}
                />
              )}
            />
          </div>
          <TratamientoModal className="max-w-[115px]" />
        </div>
        <div className="mt-5">
          {
            selectedTreatment === undefined || selectedTreatment.id === EntryType.tratamiento_en_falp ? 
            <TratamientoEnFALPList /> :
            selectedTreatment.id === EntryType.tratamiento_post_durante_falp ?
            <TratamienPostFALPList /> :
            selectedTreatment.id === EntryType.tratamiento_antes_falp ?
            <TratamientoAntesFALPList /> :
            <></>
          }
        </div>
      </SubSection>
    </Section>
  );
}
