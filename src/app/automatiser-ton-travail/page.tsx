import Link from "next/link";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Automatise ton travail | The Vibe Experience" };

export default function ModuleAutomatisation() {
  const cards = etapesDetailAutomatisation.map((e) => ({
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
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <span>Automatise ton travail</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Savoir-faire
          </div>
          <h1 className="mov-h1">
            Automatise ton travail, <em>sans avoir à le demander</em>.
          </h1>
          <p className="mov-meta">5 étapes, 2 h à 2 h 45, niveau débutant.</p>
          <p className="etape-obj">
            Jusqu&apos;ici, tout commençait par une demande. Dans ce module, tu mets en place des
            actions qui se déclenchent seules : une sauvegarde automatique, un garde-fou avant une
            action risquée, ou un bilan prêt chaque vendredi. Tu réutilises les outils que tu as
            déjà.
          </p>

          <ModuleProgress
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            completionHref="/parcours"
            completionLabel="Retourner aux modules"
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards}
          />
        </div>
      </div>
    </section>
  );
}
