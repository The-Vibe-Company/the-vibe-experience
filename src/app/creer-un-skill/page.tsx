import Link from "next/link";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Créer ton premier skill — The Vibe Experience" };

export default function ModuleSkill() {
  const cards = etapesDetailSkill.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    obj: e.obj,
    tagLabel: e.tag[0],
    dur: e.dur,
    sousCount: e.sous.length,
  }));

  return (
    <section className="etape-section">
      <MarkSelectedPath path="construire" />
      <div className="etape-shell module-overview-shell">
        <ModuleRail
          etapes={etapesDetailSkill}
          currentSlug=""
          basePath="/creer-un-skill"
          moduleLabel="Créer ton premier skill"
        />

        <div className="ecol module-overview-main">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <span>Créer ton premier skill</span>
          </div>

          <header className="module-intro">
            <div className="label">Module · Savoir-faire</div>
            <h1 className="mov-h1">
              Crée ton premier skill, <em>réutilisable sur tous tes projets</em>.
            </h1>
            <p className="mov-meta">5 étapes · ≈ 1 h 40 à 2 h · Débutant</p>
            <p className="etape-obj">
              Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Là, tu
              fabriques le tien : une compétence que tu apprends une fois à l&apos;IA et qu&apos;elle
              réutilise ensuite toute seule, sur tous tes projets.
            </p>
          </header>

          <ModuleProgress
            moduleKey="/creer-un-skill"
            basePath="/creer-un-skill"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/creer-un-skill" basePath="/creer-un-skill" etapes={cards} />
        </div>

        <ModuleSidePanel
          moduleKey="/creer-un-skill"
          basePath="/creer-un-skill"
          etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          facts={[
            { label: "Livrable", value: "Un skill que Claude Code peut réutiliser" },
            { label: "Durée", value: "1 h 40 à 2 h environ" },
            { label: "Outil", value: "Claude Code, plus les deux skills offerts" },
          ]}
          jugeHref="/juge-skill"
          jugeLabel="Fais évaluer ton skill par le juge"
        />
      </div>
    </section>
  );
}
