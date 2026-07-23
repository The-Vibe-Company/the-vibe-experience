import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetail } from "@/lib/module-faire-un-site";
import SousEtapes from "./SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import EtapeNeeds from "@/components/EtapeNeeds";
import EtapeSummary from "@/components/EtapeSummary";
import ModuleAfter from "@/components/ModuleAfter";
import { siteAfter } from "@/lib/module-after-config";

export function generateStaticParams() {
  return etapesDetail.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetail.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} | The Vibe Experience` : "Étape" };
}

export default async function EtapePage({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetail.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetail.indexOf(e);
  const prev = etapesDetail[idx - 1];
  const next = etapesDetail[idx + 1];

  return (
    <section className="etape-section">
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetail}
          currentSlug={e.slug}
          basePath="/module"
          moduleLabel="Faire un site"
        />

        <div className="ecol">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/module">Faire un site</Link>
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
              moduleKey="/module"
              etapeSlug={e.slug}
              etapeNum={e.num}
            />
          </section>

          <EtapeSummary
            livrable={e.livrable}
            reussite={e.reussite}
          />

          {!next && <ModuleAfter content={siteAfter} />}

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
      </div>
    </section>
  );
}
