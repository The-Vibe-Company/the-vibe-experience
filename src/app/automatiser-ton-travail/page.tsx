import Link from "next/link";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
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
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetailAutomatisation}
          currentSlug=""
          basePath="/automatiser-ton-travail"
          moduleLabel="Automatise ton travail"
        />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise ton travail</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Savoir-faire · En écriture
          </div>
          <h1 className="mov-h1">
            Automatise ton travail, <em>déclenché, pas demandé</em>.
          </h1>
          <p className="mov-meta">5 étapes · ≈ 2 h à 2 h 45 · Débutant</p>
          <p className="etape-obj">
            Jusqu&apos;ici, il se passait des choses parce que tu demandais. Dans ce module, il va se
            passer des choses parce que c&apos;est déclenché : une sauvegarde qui part toute seule,
            un garde-fou qui t&apos;empêche de casser, un bilan qui t&apos;attend chaque vendredi.
            Rien de neuf à installer : tu branches ce que tu as déjà.
          </p>

          <ModuleSidePanel
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            facts={[
              { label: "Livrable", value: "Des automatisations qui se déclenchent seules" },
              { label: "Durée", value: "5 étapes · ≈ 2 h à 2 h 45" },
              { label: "Outil", value: "Claude Code, rien de neuf à installer" },
            ]}
            jugeHref="/parcours"
            jugeLabel="Retourner aux modules"
          />

          <ModuleProgress
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes
            moduleKey="/automatiser-ton-travail"
            basePath="/automatiser-ton-travail"
            etapes={cards}
          />

          <div className="label mov-sec">Ta boîte à outils</div>
          <p className="mov-toolintro">
            Rien de neuf à installer : tes automatisations vivent dans l&apos;outil que tu as déjà.
          </p>
          <div className="tfilets">
            <div className="tfilet">
              <span className="tfilet-name">
                Claude Code
                <span className="cost cost-payant">Payant</span>
              </span>
              <span className="tfilet-desc">
                Toujours lui. Tes automatisations vivent dedans : il les installe, les liste et les
                retire quand tu le demandes.
              </span>
            </div>
          </div>

          <div className="mov-after">
            <span className="label">Et après ?</span>
            <span className="mov-after-title">Ton prochain produit</span>
            <p>
              Tu repars avec un produit en ligne, un skill à toi, et des automatisations qui
              travaillent pendant que tu fais autre chose. Ton prochain produit profitera de tout
              ça. Et un cran plus loin, il existe des automatisations qui tournent dans le cloud,
              sans ton Mac : c&apos;est le monde de la famille « Automatiser ton business », qui
              arrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
