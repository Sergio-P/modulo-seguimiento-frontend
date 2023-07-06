import CaseTimeline from "@/components/cases/CaseTimeline";
import AuthProtected from "@/components/auth/AuthProtected";
import TopoMorfoAutocompleteInput from "@/components/ui/TopoMorfoAutocompleteInput";
import {CodingMode} from "@/types/Enums";

export default function TopoMorfoPage() {
  return (
    <AuthProtected>
      <TopoMorfoAutocompleteInput mode={CodingMode.topography} onChange={(value) => value}/>
    </AuthProtected>
  );
}