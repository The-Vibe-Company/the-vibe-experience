import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import EtapeNeeds from "@/components/EtapeNeeds";
import EtapeSummary from "@/components/EtapeSummary";
import ModuleAfter from "@/components/ModuleAfter";
import { skillAfter } from "@/lib/module-after-config";
import { skillOverview } from "@/lib/module-overview-config";

export function generateStaticParams() {
  return etapesDetailSkill.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailSkill.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} | The Vibe Experience` : "Étape" };
}

export default async function EtapeSkillPage({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailSkill.find((x) => x.slug === etape);
  if (!e) notFound();

  const idx = etapesDetailSkill.indexOf(e);
  const prev = etapesDetailSkill[idx - 1];
  const next = etapesDetailSkill[idx + 1];

  return (
    <section className="etape-section">
      <div className="etape-shell etape-shell-with-context">
        <ModuleRail
          etapes={etapesDetailSkill}
          currentSlug={e.slug}
          basePath="/creer-un-skill"
          moduleLabel="Créer ton premier skill"
        />

        <div className="ecol">
          <div className="crumb">
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <Link href="/creer-un-skill">Créer ton premier skill</Link>
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
              moduleKey="/creer-un-skill"
              etapeSlug={e.slug}
              etapeNum={e.num}
            />
          </section>

          <EtapeSummary
            livrable={e.livrable}
            reussite={e.reussite}
          />

          {!next && <ModuleAfter content={skillAfter} />}

          <div className="pager">
            {prev ? (
              <Link href={`/creer-un-skill/${prev.slug}`}>
                <div className="dir">← Étape précédente</div>
                <div className="pt">
                  {prev.num} · {prev.titre}
                </div>
              </Link>
            ) : (
              <Link href="/creer-un-skill">
                <div className="dir">←</div>
                <div className="pt">Retour au module</div>
              </Link>
            )}
            {next ? (
              <Link href={`/creer-un-skill/${next.slug}`} className="next">
                <div className="dir">Étape suivante →</div>
                <div className="pt">
                  {next.num} · {next.titre}
                </div>
              </Link>
            ) : (
              <Link href="/creer-un-skill" className="next">
                <div className="dir">Fin du module</div>
                <div className="pt">Retour au module →</div>
              </Link>
            )}
          </div>
        </div>

        <ModuleSidePanel
          moduleKey="/creer-un-skill"
          basePath="/creer-un-skill"
          etapes={etapesDetailSkill.map(({ slug, num, titre, sous }) => ({
            slug,
            num,
            titre,
            sousCount: sous.length,
          }))}
          facts={skillOverview.facts}
          finishedHref={skillOverview.finishedHref}
          finishedLabel={skillOverview.finishedLabel}
        />
      </div>
    </section>
  );
}
