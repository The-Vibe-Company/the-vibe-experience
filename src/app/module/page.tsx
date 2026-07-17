import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import MarkSelectedPath from "@/components/MarkSelectedPath";
import SkillInstallCopyButton from "@/components/SkillInstallCopyButton";

export const metadata = { title: "Module · Faire un site — The Vibe Experience" };

type Cost = "gratuit" | "gratuit-debut" | "payant";
const costLabel: Record<Cost, string> = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

const toolbox: { n: string; d: string; cost: Cost; url?: string }[] = [
  { n: "Claude Code", d: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code pour toi.", cost: "payant", url: "https://claude.com/claude-code" },
  { n: "Homebrew", d: "L'installateur du terminal. Une commande pour installer ce qu'il te faut.", cost: "gratuit", url: "https://brew.sh" },
  { n: "GitHub", d: "Le coffre-fort de ton code. Il sauvegarde ton projet et son historique.", cost: "gratuit-debut", url: "https://github.com" },
  { n: "Vercel", d: "L'hébergeur. Il met ton site en ligne en un clic.", cost: "gratuit-debut", url: "https://vercel.com" },
  { n: "SuperWhisper (option)", d: "Pour parler à l'IA au lieu de tout taper.", cost: "payant", url: "https://superwhisper.com" },
];

const skillGifts: { n: string; d: string; href: string }[] = [
  {
    n: "Impeccable",
    d: "Rend ton interface propre et pro, et nettoie le code derrière. Tu t'en sers à l'étape 3.",
    href: "/skills/impeccable.zip",
  },
  {
    n: "Agent Browser",
    d: "Parcourt ton site comme un vrai visiteur et repère ce qui cloche. La première fois, Claude Code finit son installation tout seul. Tu le fais boucler avec Impeccable à l'étape 3.",
    href: "/skills/agent-browser.zip",
  },
];

export default function Module() {
  const cards = etapesDetail.map((e) => ({
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
        <ModuleRail etapes={etapesDetail} currentSlug="" basePath="/module" moduleLabel="Faire un site" />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Faire un site</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Produit
          </div>
          <h1 className="mov-h1">
            Faire un site, <em>de ton idée à en ligne</em>.
          </h1>
          <p className="mov-meta">6 étapes · ≈ 3 à 4 h de travail, souvent en plusieurs fois · Débutant</p>
          <p className="etape-obj">
            Le module fondateur : tu construis TON site, du premier écran en local jusqu&apos;à la
            mise en ligne, en apprenant les vrais outils au passage. On ne t&apos;impose rien, on
            t&apos;accompagne pas à pas.
          </p>

          <ModuleSidePanel
            moduleKey="/module"
            basePath="/module"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            title="Ton premier site réel"
            focus="Le but n'est pas de tout comprendre d'un coup. Tu avances étape par étape, tu vois le résultat, puis tu ajustes avec l'IA."
            facts={[
              { label: "Livrable", value: "Un site en ligne, partageable" },
              { label: "Rythme", value: "6 étapes, souvent en plusieurs sessions" },
              { label: "Budget", value: "Claude Pro surtout, le reste gratuit pour débuter" },
            ]}
            reminders={[
              "Garde Claude Code ouvert quand tu travailles.",
              "Une demande à la fois, puis tu regardes le résultat.",
              "GitHub sauvegarde ton code, Vercel le met en ligne.",
            ]}
            links={[
              { label: "Voir les ressources", href: "/ressources" },
              { label: "Évaluer mon site", href: "/juge" },
            ]}
          />

          <ModuleProgress
            moduleKey="/module"
            basePath="/module"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/module" basePath="/module" etapes={cards} />

          <div className="label mov-sec">Ta boîte à outils</div>
          <p className="mov-toolintro">
            Pour commencer, il te faut surtout Claude Pro, environ 20 €/mois. GitHub, Vercel et le
            reste sont gratuits pour débuter.
          </p>
          <div className="tfilets">
            {toolbox.map((t) => (
              <div className="tfilet" key={t.n}>
                <span className="tfilet-name">
                  {t.url ? (
                    <a href={t.url} target="_blank" rel="noreferrer" className="tfilet-link">
                      {t.n} ↗
                    </a>
                  ) : (
                    t.n
                  )}
                  <span className={`cost cost-${t.cost}`}>{costLabel[t.cost]}</span>
                </span>
                <span className="tfilet-desc">{t.d}</span>
              </div>
            ))}
          </div>

          <div className="label mov-sec">Les skills qu&apos;on t&apos;offre</div>
          <p className="mov-toolintro">
            À l&apos;étape 3, tu rends ton site propre avec deux skills. On te donne une consigne à
            copier dans Claude Code pour chacun. Tu colles, il récupère le skill et finit la mise en
            place tout seul (Agent Browser installe son outil au premier usage).
          </p>
          <div className="gfilets">
            {skillGifts.map((g) => (
              <div className="gfilet" key={g.n}>
                <span className="gfilet-body">
                  <span className="gfilet-name">Installer le skill : {g.n}</span>
                  <span className="gfilet-desc">{g.d}</span>
                </span>
                <SkillInstallCopyButton
                  href={g.href}
                  name={g.n}
                  className="btn btn-ghost gfilet-btn"
                  showHint
                />
              </div>
            ))}
          </div>

          <Link href="/juge" className="mov-cta">
            <span className="label">Le juge</span>
            <span className="mov-cta-title">Ton site est en ligne ? Fais-le évaluer par le juge. →</span>
            <span className="mov-cta-desc">
              Il visite ton site, vérifie la checklist technique du module, et te dit ce qui manque.
              Sans jugement de goût.
            </span>
          </Link>

          <div className="mov-after">
            <span className="label">Et après ?</span>
            <Link href="/creer-un-skill" className="mov-after-title">
              Créer ton premier skill →
            </Link>
            <p>
              Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Le module
              suivant, un savoir-faire, t&apos;apprend à fabriquer le tien, que tu réutiliseras dans
              ton prochain produit. C&apos;est le principe : un premier produit, puis des
              savoir-faire qui s&apos;empilent et te rendent plus fort pour le prochain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
