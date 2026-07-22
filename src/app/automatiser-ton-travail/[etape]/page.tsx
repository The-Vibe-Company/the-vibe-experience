import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import ModuleSidePanel from "@/components/ModuleSidePanel";

export function generateStaticParams() {
  return etapesDetailAutomatisation.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailAutomatisation.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} — The Vibe Experience` : "Étape" };
}

export default async function EtapeAutomatisationPage({
  params,
}: {
  params: Promise<{ etape: string }>;
}) {
  const { etape } = await params;
  const e = etapesDetailAutomatisation.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetailAutomatisation.indexOf(e);
  const prev = etapesDetailAutomatisation[idx - 1];
  const next = etapesDetailAutomatisation[idx + 1];

  return (
    <section className="etape-section">
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetailAutomatisation}
          currentSlug={e.slug}
          basePath="/automatiser-ton-travail"
          moduleLabel="Automatise ton travail"
        />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/automatiser-ton-travail">Automatise ton travail</Link>
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
          <p className="etape-obj">{e.obj}</p>

          <ModuleSidePanel
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={etapesDetailAutomatisation.map((x) => ({ slug: x.slug, num: x.num, titre: x.titre, sousCount: x.sous.length }))}
            facts={[
              { label: "Livrable", value: "Des automatisations qui se déclenchent seules" },
              { label: "Durée", value: "5 étapes · ≈ 2 h à 2 h 45" },
            ]}
            jugeHref="/juge-automatisation"
            jugeLabel="Fais évaluer ton automatisation par le juge"
          />

          <div className="label" style={{ margin: "2.4rem 0 1rem" }}>
            Les sous-étapes
          </div>

          <SousEtapes
            sous={e.sous}
            detailPret={e.detailPret}
            moduleKey="/automatiser-ton-travail"
            etapeSlug={e.slug}
            etapeNum={e.num}
          />

          <div className="livret">
            <div className="livret-row">
              <span className="se-l">Livrable</span>
              <p>{e.livrable}</p>
            </div>
            <div className="livret-row">
              <span className="se-l">Réussite</span>
              <p>{e.reussite}</p>
            </div>
          </div>

          <div className="pager">
            {prev ? (
              <Link href={`/automatiser-ton-travail/${prev.slug}`}>
                <div className="dir">← Étape précédente</div>
                <div className="pt">
                  {prev.num} · {prev.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-ton-travail">
                <div className="dir">←</div>
                <div className="pt">Retour au module</div>
              </Link>
            )}
            {next ? (
              <Link href={`/automatiser-ton-travail/${next.slug}`} className="next">
                <div className="dir">Étape suivante →</div>
                <div className="pt">
                  {next.num} · {next.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-ton-travail" className="next">
                <div className="dir">Fin du module</div>
                <div className="pt">Retour au module →</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
