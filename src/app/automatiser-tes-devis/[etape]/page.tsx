import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailDevis } from "@/lib/module-devis";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import ModuleAfter from "@/components/ModuleAfter";
import ModulePrerequisites from "@/components/ModulePrerequisites";
import EtapeSummary from "@/components/EtapeSummary";
import { quoteAfter } from "@/lib/module-after-config";
import { quoteOverview } from "@/lib/module-overview-config";

export function generateStaticParams() {
  return etapesDetailDevis.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailDevis.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} | The Vibe Experience` : "Étape" };
}

export default async function EtapeDevisPage({
  params,
}: {
  params: Promise<{ etape: string }>;
}) {
  const { etape } = await params;
  const e = etapesDetailDevis.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetailDevis.indexOf(e);
  const prev = etapesDetailDevis[idx - 1];
  const next = etapesDetailDevis[idx + 1];

  return (
    <section className="etape-section">
      <div className="etape-shell etape-shell-with-context">
        <ModuleRail
          etapes={etapesDetailDevis}
          currentSlug={e.slug}
          basePath="/automatiser-tes-devis"
          moduleLabel="Automatise tes devis"
        />

        <div className="ecol">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/automatiser-tes-devis">Automatise tes devis</Link>
            <span className="sep">/</span>
            <span>Étape {e.num}</span>
          </div>
          <div className="etape-head etape-page-head">
            <span className="etape-num">{e.num}</span>
            <h1 className="etape-page-title">{e.titre}</h1>
          </div>
          <div className="etape-page-meta">
            <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
            <span className="etape-dur">{e.dur}</span>
          </div>
          <p className="etape-obj">{e.obj}</p>

          {idx === 0 && <ModulePrerequisites items={e.sous[0]?.prerequis} />}

          <section className="substeps-section">
            <div className="label substeps-label">Les sous-étapes</div>
            <SousEtapes
              sous={e.sous}
              detailPret={e.detailPret}
              moduleKey="/automatiser-tes-devis"
              etapeSlug={e.slug}
              etapeNum={e.num}
            />
          </section>

          <EtapeSummary livrable={e.livrable} reussite={e.reussite} />

          {!next && <ModuleAfter content={quoteAfter} />}

          <div className="pager">
            {prev ? (
              <Link href={`/automatiser-tes-devis/${prev.slug}`}>
                <div className="dir">← Étape précédente</div>
                <div className="pt">
                  {prev.num} · {prev.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-tes-devis">
                <div className="dir">←</div>
                <div className="pt">Retour au module</div>
              </Link>
            )}
            {next ? (
              <Link href={`/automatiser-tes-devis/${next.slug}`} className="next">
                <div className="dir">Étape suivante →</div>
                <div className="pt">
                  {next.num} · {next.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-tes-devis" className="next">
                <div className="dir">Fin du module</div>
                <div className="pt">Retour au module →</div>
              </Link>
            )}
          </div>
        </div>

        <ModuleSidePanel
          moduleKey="/automatiser-tes-devis"
          basePath="/automatiser-tes-devis"
          etapes={etapesDetailDevis.map(({ slug, num, titre, sous }) => ({
            slug,
            num,
            titre,
            sousCount: sous.length,
          }))}
          facts={quoteOverview.facts}
          finishedHref={quoteOverview.finishedHref}
          finishedLabel={quoteOverview.finishedLabel}
        />
      </div>
    </section>
  );
}
