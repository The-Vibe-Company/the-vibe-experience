import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";

export const metadata = { title: "Module · Faire un site — The Vibe Experience" };

const toolbox = [
  { n: "Éditeur IA (Claude Code / Cursor)", d: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code." },
  { n: "Homebrew", d: "L'installateur du terminal. Une commande pour installer ce qu'il te faut." },
  { n: "GitHub", d: "Le coffre-fort de ton code. Il sauvegarde ton projet et son historique." },
  { n: "Vercel", d: "L'hébergeur. Il met ton site en ligne en un clic." },
  { n: "SuperWhisper (option)", d: "Pour parler à l'IA au lieu de tout taper." },
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
            <span>5 étapes</span>
            <span>≈ 5 à 6 h au total</span>
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
            À installer une fois, avant tout. Ça te resservira pour tous tes projets.
          </p>
          <div className="toolbox">
            {toolbox.map((t) => (
              <div className="tool" key={t.n}>
                <h4>{t.n}</h4>
                <p>{t.d}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            Les étapes
          </h2>

          <div className="path">
            {etapesDetail.map((e) => (
              <Link className="mcard" href={`/module/${e.slug}`} key={e.slug}>
                <div className="mcard-idx">{e.num}</div>
                <div className="mcard-body">
                  <h3>
                    {e.titre} <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
                  </h3>
                  <p>{e.obj}</p>
                </div>
                <div className="mcard-meta">
                  <span className="dur">{e.dur}</span>
                  <span className="mcard-cta">Ouvrir l&apos;étape →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="after">
            <div className="label">Et après ?</div>
            <h3>Créer ton premier skill</h3>
            <p>
              Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Le module
              suivant, un savoir-faire, t&apos;apprend à fabriquer le tien, que tu réutiliseras dans
              ton prochain produit. C&apos;est l&apos;alternance : un produit, un savoir-faire, et on
              recommence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
