import Link from "next/link";
import { entries, liveEntries } from "@/lib/journal";

export const metadata = { title: "Journal de bord — The Vibe Experience" };

export default function Journal() {
  const feat = liveEntries[0];
  const rest = entries.filter((e) => e.slug !== feat?.slug);

  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Journal de bord</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Journal de bord
      </div>
      <h1 className="pg-h1">
        Ce que j&apos;apprends, <em>en direct</em>.
      </h1>
      <p className="pg-lead">
        Mes articles, du parcours réel. Chaque entrée, c&apos;est l&apos;article que j&apos;ai écrit,
        et surtout ce que j&apos;en retiens avec le recul. Rien n&apos;est lissé, les erreurs sont
        dedans aussi.
      </p>

      {feat && (
        <Link href={`/journal/${feat.slug}`} className="jfeat">
          <span className="jfeat-cap">À la une</span>
          <span className="jfeat-title">{feat.title}</span>
          <span className="jfeat-text">{feat.lead}</span>
          <span className="jfeat-link">Lire l&apos;entrée →</span>
        </Link>
      )}

      <div className="jfil">
        {rest.map((e) =>
          e.body && e.body.length > 0 ? (
            <Link className="jrow" href={`/journal/${e.slug}`} key={e.slug}>
              <span className="jrow-date">{e.date}</span>
              <span>
                <span className="jrow-title">{e.title}</span>
                <span className="jrow-text">{e.lead}</span>
              </span>
              <span className="jrow-read">{e.read}</span>
            </Link>
          ) : (
            <div className="jrow soon" key={e.slug}>
              <span className="jrow-date">{e.date}</span>
              <span>
                <span className="jrow-title">{e.title}</span>
                <span className="jrow-text">{e.lead}</span>
              </span>
              <span className="jrow-read">Bientôt</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
