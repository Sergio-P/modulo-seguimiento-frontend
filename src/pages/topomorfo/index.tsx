import CaseTimeline from "@/components/cases/CaseTimeline";
import AuthProtected from "@/components/auth/AuthProtected";
import TopoMorfoAutocompleteInput from "@/components/ui/TopoMorfoAutocompleteInput";
import {CodingMode} from "@/types/Enums";

export default function TopoMorfoPage() {
  return (
    <AuthProtected>
      <>
        <h1 className="text-2xl font-bold">TopoMorfo Autocomplete Input example</h1>
        <TopoMorfoAutocompleteInput mode={CodingMode.topography} />
      </>
    </AuthProtected>
  );
}