import Link from "next/link";
import { etapesDetailSkill, skillToolbox, skillGifts } from "@/lib/module-creer-un-skill";
import ModuleProgress from "@/components/ModuleProgress";

export const metadata = { title: "Module · Créer ton premier skill — The Vibe Experience" };

const costLabel: Record<string, string> = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

export default function ModuleSkill() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Créer ton premier skill</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Module · Savoir-faire
          </div>
          <h1>
            Créer ton premier skill, <em>construit une fois, réutilisé partout</em>.
          </h1>
          <p>
            Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Là, tu
            fabriques le tien : une compétence que tu apprends une fois à l&apos;IA et qu&apos;elle
            réutilise ensuite toute seule, sur tous tes projets.
          </p>
          <div className="mtotal">
            <span>5 étapes (avec l&apos;étape 0)</span>
            <span>≈ 1 h 30, en une ou deux sessions</span>
            <span>Niveau : débutant</span>
          </div>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: ".4rem" }}>
            Ta boîte à outils
          </h2>
          <p style={{ color: "var(--muted)", fontSize: ".97rem", marginBottom: 0 }}>
            Rien de neuf à installer : tu réutilises l&apos;outil de ton premier projet.
          </p>
          <div className="toolbox">
            {skillToolbox.map((t) => (
              <div className="tool" key={t.n}>
                <div className="tool-head">
                  <h4>{t.n}</h4>
                  <span className={`cost cost-${t.cost}`}>{costLabel[t.cost]}</span>
                </div>
                <p>{t.d}</p>
                {t.costNote && <p className="tool-costnote">{t.costNote}</p>}
              </div>
            ))}
          </div>

          <div className="gifts">
            <div className="label">Les skills qu&apos;on t&apos;offre</div>
            <p className="gifts-intro">
              Tu peux très bien créer un skill juste en le demandant à Claude Code, sans rien de
              plus. Mais pour t&apos;aider à le faire nickel, on te donne nos deux vrais outils, en
              option : le premier crée un skill au bon format, le second le passe en revue et propose
              des améliorations. Un plus, surtout si tu n&apos;es pas technique. Tu les télécharges,
              tu les déposes dans tes skills, et tu t&apos;en sers aux étapes 2 et 3.
            </p>
            <div className="gifts-grid">
              {skillGifts.map((g) => (
                <div className="gift" key={g.slug}>
                  <h4>{g.n}</h4>
                  <p>{g.d}</p>
                  <a className="btn btn-ghost" href={g.href} download>
                    Télécharger ({g.slug})
                  </a>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            Les étapes
          </h2>

          <ModuleProgress
            moduleKey="/creer-un-skill"
            basePath="/creer-un-skill"
            etapes={etapesDetailSkill.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sous.length }))}
          />

          <div className="path">
            {etapesDetailSkill.map((e) => (
              <Link className="mcard" href={`/creer-un-skill/${e.slug}`} key={e.slug}>
                <div className="mcard-idx">{e.num}</div>
                <div className="mcard-body">
                  <h3>
                    {e.titre} <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
                  </h3>
                </div>
                <div className="mcard-meta">
                  <span className="dur">{e.dur}</span>
                  <span className="mcard-cta">Ouvrir l&apos;étape →</span>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/juge-skill" className="juge-cta">
            <div>
              <div className="label">La validation</div>
              <h3>Ton skill est prêt ? Fais-le lire par le juge.</h3>
              <p>
                Tu colles ton fichier SKILL.md, il vérifie qu&apos;il est bien formé (un nom, une
                description qui dit quand l&apos;utiliser, des instructions) et te dit ce qui manque.
                Sans jugement de goût.
              </p>
            </div>
            <span className="juge-cta-arrow" aria-hidden>
              →
            </span>
          </Link>

          <div className="after">
            <div className="label">Et après ?</div>
            <h3>Ton prochain produit</h3>
            <p>
              Tu viens de fabriquer un savoir-faire, et surtout d&apos;acquérir le réflexe. Le
              module suivant est un produit : tu y créeras les skills dont tu as besoin, maintenant
              que tu sais faire. C&apos;est l&apos;alternance : un produit, un savoir-faire, et on
              recommence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
