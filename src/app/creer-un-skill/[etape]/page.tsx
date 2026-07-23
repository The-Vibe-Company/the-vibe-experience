import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import { ModuleStepIntro } from "@/components/ModuleIntro";
import ModuleAfter from "@/components/ModuleAfter";
import ModulePrerequisites from "@/components/ModulePrerequisites";
import { skillAfter } from "@/lib/module-after-config";

export function generateStaticParams() {
  return etapesDetailSkill.map((e) => ({ etape: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etape: string }> }) {
  const { etape } = await params;
  const e = etapesDetailSkill.find((x) => x.slug === etape);
  return { title: e ? `Étape ${e.num} · ${e.titre} — The Vibe Experience` : "Étape" };
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
      <div className="etape-shell">
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
          <ModuleStepIntro etape={e} />

          {idx === 0 && <ModulePrerequisites items={e.sous[0]?.prerequis} />}

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
      </div>
    </section>
  );
}
