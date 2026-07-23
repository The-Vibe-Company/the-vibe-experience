import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailFacture } from "@/lib/module-facture";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import ModuleAfter from "@/components/ModuleAfter";
import ModulePrerequisites from "@/components/ModulePrerequisites";
import EtapeSummary from "@/components/EtapeSummary";
import { invoiceAfter } from "@/lib/module-after-config";
import { invoiceOverview } from "@/lib/module-overview-config";

export function generateStaticParams() {
  return etapesDetailFacture.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailFacture.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} | The Vibe Experience` : "Étape" };
}

export default async function EtapeFacturePage({
  params,
}: {
  params: Promise<{ etape: string }>;
}) {
  const { etape } = await params;
  const e = etapesDetailFacture.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetailFacture.indexOf(e);
  const prev = etapesDetailFacture[idx - 1];
  const next = etapesDetailFacture[idx + 1];

  return (
    <section className="etape-section">
      <div className="etape-shell etape-shell-with-context">
        <ModuleRail
          etapes={etapesDetailFacture}
          currentSlug={e.slug}
          basePath="/automatiser-tes-factures"
          moduleLabel="Automatise tes factures"
        />

        <div className="ecol">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/automatiser-tes-factures">Automatise tes factures</Link>
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
              moduleKey="/automatiser-tes-factures"
              etapeSlug={e.slug}
              etapeNum={e.num}
            />
          </section>

          <EtapeSummary livrable={e.livrable} reussite={e.reussite} />

          {!next && <ModuleAfter content={invoiceAfter} />}

          <div className="pager">
            {prev ? (
              <Link href={`/automatiser-tes-factures/${prev.slug}`}>
                <div className="dir">← Étape précédente</div>
                <div className="pt">
                  {prev.num} · {prev.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-tes-factures">
                <div className="dir">←</div>
                <div className="pt">Retour au module</div>
              </Link>
            )}
            {next ? (
              <Link href={`/automatiser-tes-factures/${next.slug}`} className="next">
                <div className="dir">Étape suivante →</div>
                <div className="pt">
                  {next.num} · {next.titre}
                </div>
              </Link>
            ) : (
              <Link href="/automatiser-tes-factures" className="next">
                <div className="dir">Fin du module</div>
                <div className="pt">Retour au module →</div>
              </Link>
            )}
          </div>
        </div>

        <ModuleSidePanel
          moduleKey="/automatiser-tes-factures"
          basePath="/automatiser-tes-factures"
          etapes={etapesDetailFacture.map(({ slug, num, titre, sous }) => ({
            slug,
            num,
            titre,
            sousCount: sous.length,
          }))}
          facts={invoiceOverview.facts}
          finishedHref={invoiceOverview.finishedHref}
          finishedLabel={invoiceOverview.finishedLabel}
        />
      </div>
    </section>
  );
}
