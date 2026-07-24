import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import SaveProgressPrompt from "@/components/SaveProgressPrompt";
import EtapeNeeds from "@/components/EtapeNeeds";
import EtapeSummary from "@/components/EtapeSummary";
import ModuleAfter from "@/components/ModuleAfter";
import { automationAfter } from "@/lib/module-after-config";

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
            <Link href="/parcours">Parcours</Link>
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

          <section className="substeps-section">
            <div className="label substeps-label">Les sous-étapes</div>
            <SousEtapes
              sous={e.sous}
              detailPret={e.detailPret}
              moduleKey="/automatiser-ton-travail"
              etapeSlug={e.slug}
              etapeNum={e.num}
              nextStep={
                next
                  ? {
                      href: `/automatiser-ton-travail/${next.slug}`,
                      slug: next.slug,
                      num: next.num,
                    }
                  : undefined
              }
            />
            <SaveProgressPrompt
              moduleKey="/automatiser-ton-travail"
              currentHref={`/automatiser-ton-travail/${e.slug}`}
              etapeSlug={e.slug}
              substepCount={e.sous.length}
              nextStep={
                next
                  ? { href: `/automatiser-ton-travail/${next.slug}`, slug: next.slug }
                  : undefined
              }
            />
          </section>

          <EtapeSummary
            livrable={e.livrable}
            reussite={e.reussite}
          />

          {!next && <ModuleAfter content={automationAfter} />}

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
