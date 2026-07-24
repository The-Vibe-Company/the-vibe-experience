import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailDevis } from "@/lib/module-devis";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import SaveProgressPrompt from "@/components/SaveProgressPrompt";

export function generateStaticParams() {
  return etapesDetailDevis.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailDevis.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} — The Vibe Experience` : "Étape" };
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
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetailDevis}
          currentSlug={e.slug}
          basePath="/automatiser-tes-devis"
          moduleLabel="Automatise tes devis"
        />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <Link href="/automatiser-tes-devis">Automatise tes devis</Link>
            <span className="sep">/</span>
            <span>Étape {e.num}</span>
          </div>
          <div className="etape-head" style={{ marginTop: "1.2rem" }}>
            <span className="etape-num">{e.num}</span>
            <h1 className="etape-title">{e.titre}</h1>
          </div>
          <div className="etape-meta">
            <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
            <span className="etape-dur">{e.dur}</span>
          </div>
          <p className="etape-obj">{e.obj}</p>

          <div className="label" style={{ margin: "2.4rem 0 1rem" }}>
            Les sous-étapes
          </div>

          <SousEtapes
            sous={e.sous}
            detailPret={e.detailPret}
            moduleKey="/automatiser-tes-devis"
            etapeSlug={e.slug}
            etapeNum={e.num}
            nextStep={
              next
                ? { href: `/automatiser-tes-devis/${next.slug}`, slug: next.slug, num: next.num }
                : undefined
            }
          />
          <SaveProgressPrompt
            moduleKey="/automatiser-tes-devis"
            currentHref={`/automatiser-tes-devis/${e.slug}`}
            etapeSlug={e.slug}
            substepCount={e.sous.length}
            nextStep={
              next ? { href: `/automatiser-tes-devis/${next.slug}`, slug: next.slug } : undefined
            }
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
      </div>
    </section>
  );
}
