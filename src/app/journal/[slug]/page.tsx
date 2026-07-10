import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getJournalEntries } from "@/lib/journal";

export const revalidate = 1800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const entries = await getJournalEntries();
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getArticle(slug);
  return { title: entry ? `${entry.title} — Journal` : "Journal de bord" };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getArticle(slug);
  if (!entry) notFound();

  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/journal">Journal de bord</Link>
        <span className="sep">/</span>
        <span>{entry.dateLabel}</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        {entry.dateLabel}
      </div>
      <h1 className="pg-h1">{entry.title}</h1>

      <div className="jart">
        {entry.recul && (
          <div className="jart-recul">
            <div className="label">Avec le recul</div>
            <p>{entry.recul}</p>
          </div>
        )}

        <div
          className="jart-body"
          dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
        />

        <div className="jart-back">
          <a
            href={`https://www.thevibecompany.co/resources/articles/${entry.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="jart-read"
          >
            Voir l&apos;article sur The Vibe Company →
          </a>
        </div>
        <div className="jart-back" style={{ marginTop: "1.3rem", borderTop: "none", paddingTop: 0 }}>
          <Link href="/journal" className="jrow-read" style={{ color: "var(--orange-ink)" }}>
            ← Retour au journal
          </Link>
        </div>
      </div>
    </div>
  );
}
