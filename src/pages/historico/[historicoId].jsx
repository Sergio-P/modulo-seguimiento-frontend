import { useRouter } from "next/router";
import CaseTimeline from "@/components/cases/CaseTimeline";
import AuthProtected from "@/components/auth/AuthProtected";

export default function CaseDetailPage() {
  const router = useRouter();
  const { historicoId } = router.query;
  return (
    <AuthProtected>
      <CaseTimeline caseId={historicoId} />
    </AuthProtected>
  );
}
