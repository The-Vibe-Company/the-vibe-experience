import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetail } from "@/lib/module-faire-un-site";
import SousEtapes from "./SousEtapes";

export function generateStaticParams() {
  return etapesDetail.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetail.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} — The Vibe Experience` : "Étape" };
}

export default async function EtapePage({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetail.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetail.indexOf(e);
  const prev = etapesDetail[idx - 1];
  const next = etapesDetail[idx + 1];

  return (
    <>
      <header className="phead">
        <div className="wrap-narrow">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/module">Faire un site</Link>
            <span className="sep">/</span>
            <span>Étape {e.num}</span>
          </div>
          <div className="etape-head" style={{ marginTop: "1.2rem" }}>
            <span className="etape-num">{e.num}</span>
            <h1 style={{ fontSize: "clamp(1.8rem,3.4vw,2.6rem)", letterSpacing: "-0.03em", fontWeight: 800, lineHeight: 1.05, flex: 1, margin: 0 }}>
              {e.titre}
            </h1>
          </div>
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center", marginTop: ".8rem" }}>
            <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
            <span className="etape-dur">{e.dur}</span>
          </div>
          <p style={{ marginTop: "1rem" }}>{e.obj}</p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1rem" }}>
        <div className="wrap-narrow">
          <div className="label" style={{ marginBottom: ".6rem" }}>
            Les sous-étapes
          </div>
          <p style={{ color: "var(--muted-2)", fontSize: ".9rem", marginBottom: "1rem" }}>
            Clique sur une sous-étape pour la déplier et voir le détail.
          </p>

          <SousEtapes sous={e.sous} detailPret={e.detailPret} />

          <div className="livrable-line" style={{ marginTop: "1.5rem" }}>
            <strong>Livrable :</strong> {e.livrable}
          </div>
          <div className="reussite">
            <strong>Réussite :</strong> {e.reussite}
          </div>

          <div className="pager">
            {prev ? (
              <Link href={`/module/${prev.slug}`}>
                <div className="dir">← Étape précédente</div>
                <div className="pt">
                  {prev.num} · {prev.titre}
                </div>
              </Link>
            ) : (
              <Link href="/module">
                <div className="dir">←</div>
                <div className="pt">Retour au module</div>
              </Link>
            )}
            {next ? (
              <Link href={`/module/${next.slug}`} className="next">
                <div className="dir">Étape suivante →</div>
                <div className="pt">
                  {next.num} · {next.titre}
                </div>
              </Link>
            ) : (
              <Link href="/module" className="next">
                <div className="dir">Fin du module</div>
                <div className="pt">Retour au module →</div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
