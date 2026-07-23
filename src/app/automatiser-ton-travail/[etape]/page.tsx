import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import EtapeNeeds from "@/components/EtapeNeeds";
import EtapeSummary from "@/components/EtapeSummary";

export function generateStaticParams() {
  return etapesDetailAutomatisation.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailAutomatisation.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} | The Vibe Experience` : "Étape" };
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

        <div className="ecol">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/automatiser-ton-travail">Automatise ton travail</Link>
            <span className="sep">/</span>
            <span>Étape {e.num}</span>
          </div>
          <div className="etape-head etape-page-head">
            <span className="etape-num">{e.num}</span>
            <h1 className="etape-page-title">
              {e.titre}
            </h1>
          </div>
          <div className="etape-page-meta">
            <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
            <span className="etape-dur">{e.dur}</span>
          </div>
          <p className="etape-obj">{e.obj}</p>

          <EtapeNeeds items={e.ceQuilTeFaut} />

          <div className="label etape-substeps-title">
            Les sous-étapes
          </div>

          <SousEtapes
            sous={e.sous}
            detailPret={e.detailPret}
            moduleKey="/automatiser-ton-travail"
            etapeSlug={e.slug}
            etapeNum={e.num}
          />

          <EtapeSummary
            livrable={e.livrable}
            reussite={e.reussite}
          />

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
