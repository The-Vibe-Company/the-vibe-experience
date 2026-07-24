import Link from "next/link";

export default function ModuleStartGuide({
  requirement,
  prerequisitesHref,
}: {
  requirement: string;
  prerequisitesHref: string;
}) {
  return (
    <div className="module-start-guide">
      <span className="module-start-check" aria-hidden>
        ✓
      </span>
      <p>
        <strong>Aucune compétence en IA ou en code n&apos;est nécessaire.</strong> {requirement}
      </p>
      <Link href={prerequisitesHref}>Voir ce qu&apos;il faut préparer →</Link>
    </div>
  );
}
