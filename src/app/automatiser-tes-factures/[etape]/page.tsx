import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailFacture } from "@/lib/module-facture";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import { ModuleStepIntro } from "@/components/ModuleIntro";
import ModuleAfter from "@/components/ModuleAfter";
import ModulePrerequisites from "@/components/ModulePrerequisites";
import { invoiceAfter } from "@/lib/module-after-config";

export function generateStaticParams() {
  return etapesDetailFacture.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailFacture.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} — The Vibe Experience` : "Étape" };
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
      <div className="etape-shell">
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
          <ModuleStepIntro etape={e} />

          {idx === 0 && <ModulePrerequisites items={e.sous[0]?.prerequis} />}

          <div className="label" style={{ margin: "2.4rem 0 1rem" }}>
            Les sous-étapes
          </div>

          <SousEtapes
            sous={e.sous}
            detailPret={e.detailPret}
            moduleKey="/automatiser-tes-factures"
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
      </div>
    </section>
  );
}
