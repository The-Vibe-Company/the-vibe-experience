import Link from "next/link";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Créer ton premier skill | The Vibe Experience" };

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
      <div className="module-overview-shell">
        <div className="module-overview">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Créer ton premier skill</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Savoir-faire
          </div>
          <h1 className="mov-h1">
            Créer ton premier skill, <em>pour le réutiliser partout</em>.
          </h1>
          <p className="mov-meta">5 étapes, 1 h 40 à 2 h, niveau débutant.</p>
          <p className="etape-obj">
            Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Là, tu
            fabriques le tien : une façon de faire que tu apprends une fois à l&apos;IA et
            qu&apos;elle peut ensuite réutiliser sur tous tes projets.
          </p>

          <ModuleProgress
            moduleKey="/creer-un-skill"
            basePath="/creer-un-skill"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            completionHref="/juge-skill"
            completionLabel="Faire évaluer mon skill"
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/creer-un-skill" basePath="/creer-un-skill" etapes={cards} />
        </div>
      </div>
    </section>
  );
}
