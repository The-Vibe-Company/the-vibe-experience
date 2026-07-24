import ConnexionForm from "./ConnexionForm";
import { safeNextPath } from "@/lib/safe-next-path";

export default async function Connexion({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string | string[];
    confirmation?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const rawNext = params.next;
  const rawConfirmation = params.confirmation;
  const nextPath = safeNextPath(Array.isArray(rawNext) ? rawNext[0] : rawNext);
  const confirmationError =
    (Array.isArray(rawConfirmation) ? rawConfirmation[0] : rawConfirmation) === "error";

  return <ConnexionForm nextPath={nextPath} confirmationError={confirmationError} />;
}
