import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import ModuleProgress from "@/components/ModuleProgress";

export const metadata = { title: "Module · Faire un site — The Vibe Experience" };

type Cost = "gratuit" | "gratuit-debut" | "payant";

const costLabel: Record<Cost, string> = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

const toolbox: { n: string; d: string; cost: Cost; costNote?: string }[] = [
  { n: "Claude Code", d: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code pour toi.", cost: "payant", costNote: "Abonnement Claude Pro, ~20 $/mois. Suffit pour ton premier site." },
  { n: "Homebrew", d: "L'installateur du terminal. Une commande pour installer ce qu'il te faut.", cost: "gratuit" },
  { n: "GitHub", d: "Le coffre-fort de ton code. Il sauvegarde ton projet et son historique.", cost: "gratuit-debut", costNote: "L'offre gratuite suffit largement" },
  { n: "Vercel", d: "L'hébergeur. Il met ton site en ligne en un clic.", cost: "gratuit-debut", costNote: "L'offre gratuite suffit pour mettre en ligne" },
  { n: "SuperWhisper (option)", d: "Pour parler à l'IA au lieu de tout taper.", cost: "payant", costNote: "Optionnel, tu peux t'en passer" },
];

export default function Module() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Faire un site</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Module · Produit
          </div>
          <h1>
            Faire un site, <em>de ton idée à en ligne</em>.
          </h1>
          <p>
            Le module fondateur : tu construis TON site, du premier écran en local jusqu&apos;à la
            mise en ligne, en apprenant les vrais outils au passage. On ne t&apos;impose rien, on
            t&apos;accompagne pas à pas.
          </p>
          <div className="mtotal">
            <span>6 étapes (avec l&apos;étape 0 de prépa)</span>
            <span>≈ 4 à 5 h, en plusieurs sessions</span>
            <span>Niveau : débutant</span>
          </div>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <div className="cost-clear">
            <div className="label">Combien ça coûte</div>
            <p className="cost-headline">
              Pour commencer : <strong>environ 20 $/mois</strong>.
            </p>
            <p className="cost-sub">
              Juste l&apos;abonnement Claude Pro. GitHub, Vercel et les autres outils sont gratuits
              pour débuter.
            </p>
            <details className="cost-details">
              <summary>Voir les outils et le détail du coût</summary>
              <div className="toolbox">
                {toolbox.map((t) => (
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
              <p className="cost-why">
                <strong>Claude Pro ou Max ?</strong> Pour ton premier site, Claude Pro (environ
                20 $/mois) suffit largement. Le Max (à partir de 100 $/mois) n&apos;est utile que si
                tu enchaînes beaucoup de projets dans la journée. Le plan gratuit ne donne pas accès
                à Claude Code. SuperWhisper est optionnel, tu peux t&apos;en passer.
              </p>
            </details>
          </div>

          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            Les étapes
          </h2>

          <ModuleProgress
            moduleKey="/module"
            basePath="/module"
            etapes={etapesDetail.map((e) => ({ slug: e.slug, num: e.num }))}
          />

          <div className="path">
            {etapesDetail.map((e) => (
              <Link className="mcard" href={`/module/${e.slug}`} key={e.slug}>
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

          <Link href="/juge" className="juge-cta">
            <div>
              <div className="label">La validation</div>
              <h3>Ton site est en ligne ? Fais-le évaluer par le juge.</h3>
              <p>
                Il visite ton site, vérifie la checklist technique du module, et te dit ce qui
                manque. Sans jugement de goût.
              </p>
            </div>
            <span className="juge-cta-arrow" aria-hidden>
              →
            </span>
          </Link>

          <Link href="/creer-un-skill" className="after after-link">
            <div className="label">Et après ?</div>
            <h3>Créer ton premier skill →</h3>
            <p>
              Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Le module
              suivant, un savoir-faire, t&apos;apprend à fabriquer le tien, que tu réutiliseras dans
              ton prochain produit. C&apos;est l&apos;alternance : un produit, un savoir-faire, et on
              recommence.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
