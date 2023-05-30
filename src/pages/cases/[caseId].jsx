import { useRouter } from "next/router";
import CaseForm from "@/components/cases/CaseForm";
import AuthProtected from "@/components/auth/AuthProtected";

export default function CaseDetailPage() {
  const router = useRouter();
  const { caseId } = router.query;
  return (
    <AuthProtected>
      <CaseForm caseId={caseId} />
    </AuthProtected>
  );
}
