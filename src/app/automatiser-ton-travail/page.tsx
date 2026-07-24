import Link from "next/link";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Automatise ton travail — The Vibe Experience" };

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
      <div className="etape-shell module-overview-shell">
        <ModuleRail
          etapes={etapesDetailAutomatisation}
          currentSlug=""
          basePath="/automatiser-ton-travail"
          moduleLabel="Automatise ton travail"
        />

        <div className="ecol module-overview-main">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <span>Automatise ton travail</span>
          </div>

          <header className="module-intro">
            <div className="label">Module · Savoir-faire · En écriture</div>
            <h1 className="mov-h1">
              Automatise ton travail, <em>ce qui se répète se fait tout seul</em>.
            </h1>
            <p className="mov-meta">5 étapes · ≈ 2 h à 2 h 45 · Débutant</p>
            <p className="etape-obj">
              Jusqu&apos;ici, il se passait des choses parce que tu demandais. Dans ce module, il va se
              passer des choses parce que c&apos;est déclenché : une sauvegarde qui part toute seule,
              un garde-fou qui t&apos;empêche de casser, un bilan qui t&apos;attend chaque vendredi.
              Rien de neuf à installer : tu branches ce que tu as déjà.
            </p>
          </header>

          <ModuleProgress
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            completionHref="/juge-automatisation"
            completionLabel="Faire évaluer mon automatisation"
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
