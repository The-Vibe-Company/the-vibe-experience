import InscriptionForm from "./InscriptionForm";
import { safeNextPath } from "@/lib/safe-next-path";

export default async function Inscription({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const rawNext = (await searchParams).next;
  const nextPath = safeNextPath(Array.isArray(rawNext) ? rawNext[0] : rawNext);

  return <InscriptionForm nextPath={nextPath} />;
}
