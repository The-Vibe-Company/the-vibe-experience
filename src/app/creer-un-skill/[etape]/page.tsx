import Link from "next/link";
import { notFound } from "next/navigation";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import SousEtapes from "@/components/SousEtapes";
import ModuleRail from "@/components/ModuleRail";
import EtapeDone from "@/components/EtapeDone";

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

          <div className="label" style={{ margin: "2.4rem 0 1rem" }}>
            Les sous-étapes
          </div>

          <SousEtapes sous={e.sous} detailPret={e.detailPret} />

          <div className="livrable-line" style={{ marginTop: "1.5rem" }}>
            <strong>Livrable :</strong> {e.livrable}
          </div>
          <div className="reussite">
            <strong>Réussite :</strong> {e.reussite}
          </div>

          <EtapeDone
            moduleKey="/creer-un-skill"
            slug={e.slug}
            nextHref={next ? `/creer-un-skill/${next.slug}` : undefined}
            nextLabel={next ? `${next.num} · ${next.titre}` : undefined}
          />

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
