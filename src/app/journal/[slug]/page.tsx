import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, liveEntries } from "@/lib/journal";

export function generateStaticParams() {
  return liveEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  return { title: entry ? `${entry.title} — Journal` : "Journal de bord" };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry || !entry.body || entry.body.length === 0) notFound();

  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/journal">Journal de bord</Link>
        <span className="sep">/</span>
        <span>{entry.date}</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        {entry.date}
        {entry.read ? ` · ${entry.read}` : ""}
      </div>
      <h1 className="pg-h1">{entry.title}</h1>

      <div className="jart">
        {entry.recul && (
          <div className="jart-recul">
            <div className="label">Avec le recul</div>
            <p>{entry.recul}</p>
          </div>
        )}
        <div className="jart-body">
          {entry.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="jart-back">
          <Link href="/journal" className="jrow-read" style={{ color: "var(--orange-ink)" }}>
            ← Retour au journal
          </Link>
        </div>
      </div>
    </div>
  );
}
