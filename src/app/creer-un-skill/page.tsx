import Link from "next/link";
import { etapesDetailSkill, skillToolbox, skillGifts } from "@/lib/module-creer-un-skill";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Créer ton premier skill — The Vibe Experience" };

const costLabel: Record<string, string> = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

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
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetailSkill}
          currentSlug=""
          basePath="/creer-un-skill"
          moduleLabel="Créer ton premier skill"
        />

        <div className="ecol">
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
            Créer ton premier skill, <em>construit une fois, réutilisé partout</em>.
          </h1>
          <p className="mov-meta">5 étapes · ≈ 1 h 40 · Débutant</p>
          <p className="etape-obj">
            Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Là, tu
            fabriques le tien : une compétence que tu apprends une fois à l&apos;IA et qu&apos;elle
            réutilise ensuite toute seule, sur tous tes projets.
          </p>

          <ModuleProgress
            moduleKey="/creer-un-skill"
            basePath="/creer-un-skill"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/creer-un-skill" basePath="/creer-un-skill" etapes={cards} />

          <div className="label mov-sec">Ta boîte à outils</div>
          <p className="mov-toolintro">
            Rien de neuf à installer : tu réutilises l&apos;outil de ton premier projet.
          </p>
          <div className="tfilets">
            {skillToolbox.map((t) => (
              <div className="tfilet" key={t.n}>
                <span className="tfilet-name">
                  {t.n}
                  <span className={`cost cost-${t.cost}`}>{costLabel[t.cost]}</span>
                </span>
                <span className="tfilet-desc">{t.d}</span>
              </div>
            ))}
          </div>

          <div className="label mov-sec">Les skills qu&apos;on t&apos;offre</div>
          <p className="mov-toolintro">
            Tu peux créer un skill juste en le demandant à Claude Code. Mais pour t&apos;aider à le
            faire nickel, on te donne nos deux vrais outils, en option : le premier crée un skill au
            bon format, le second le passe en revue. Tu les télécharges et tu t&apos;en sers aux
            étapes 2 et 3.
          </p>
          <div className="gfilets">
            {skillGifts.map((g) => (
              <div className="gfilet" key={g.slug}>
                <span className="gfilet-body">
                  <span className="gfilet-name">{g.n}</span>
                  <span className="gfilet-desc">{g.d}</span>
                </span>
                <a className="btn btn-ghost gfilet-btn" href={g.href} download>
                  Télécharger
                </a>
              </div>
            ))}
          </div>

          <Link href="/juge-skill" className="mov-cta">
            <span className="label">La validation</span>
            <span className="mov-cta-title">Ton skill est prêt ? Fais-le lire par le juge. →</span>
            <span className="mov-cta-desc">
              Tu colles ton fichier SKILL.md, il vérifie qu&apos;il est bien formé et te dit ce qui
              manque. Sans jugement de goût.
            </span>
          </Link>

          <div className="mov-after">
            <span className="label">Et après ?</span>
            <span className="mov-after-title">Ton prochain produit</span>
            <p>
              Tu viens de fabriquer un savoir-faire, et surtout d&apos;acquérir le réflexe. Le module
              suivant est un produit : tu y créeras les skills dont tu as besoin, maintenant que tu
              sais faire. C&apos;est l&apos;alternance : un produit, un savoir-faire, et on recommence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
