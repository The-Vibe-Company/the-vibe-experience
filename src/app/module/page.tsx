import Link from "next/link";

export const metadata = { title: "Module 01 · Construis ta première page — The Vibe Experience" };

export default function Module() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <span>Module 01</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Module 01 · Build
          </div>
          <h1>
            Construis ta première page, <em>du prompt à l&apos;écran</em>.
          </h1>
          <p>
            Tu pars de ton idée, tu la gardes simple, et tu en fais une vraie page que tu peux voir
            dans ton navigateur. Pas une copie d&apos;un site existant, la tienne. On la construit
            ensemble, étape par étape.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap mdetail">
          <div className="mbody">
            <h2>Ce que tu vas construire</h2>
            <p>
              La première page de ton propre projet : un titre qui accroche, un sous-titre, un
              bouton, et quelques blocs de contenu. Tu décris ce que tu veux en langage normal,
              l&apos;IA le construit, tu ajustes jusqu&apos;à ce que ça te ressemble. Pour te montrer
              le principe, je te partage comment j&apos;ai fait le mien, mais c&apos;est bien ta page
              à toi que tu construis ici.
            </p>

            <h2 id="etapes">Les étapes</h2>
            <ol className="steps">
              <li>
                <h4>Choisis et cadre ton idée</h4>
                <p>
                  Décide quoi construire et garde-le simple. Une idée claire et réalisable vaut mieux
                  qu&apos;un projet énorme jamais fini.
                </p>
              </li>
              <li>
                <h4>Décris ta page en langage normal</h4>
                <p>
                  Explique à l&apos;IA ce que tu veux voir, comme si tu parlais à un développeur en
                  face de toi.
                </p>
              </li>
              <li>
                <h4>Génère la première version</h4>
                <p>Laisse l&apos;IA produire ta page, puis regarde le résultat en vrai dans ton navigateur.</p>
              </li>
              <li>
                <h4>Ajuste par petites touches</h4>
                <p>
                  Change les textes, les couleurs, la mise en page, une demande à la fois, jusqu&apos;à
                  ce que ça te plaise.
                </p>
              </li>
              <li>
                <h4>Vérifie que ça tient</h4>
                <p>
                  Regarde ta page sur ordinateur et sur mobile, corrige ce qui dépasse. Ta première
                  page est prête.
                </p>
              </li>
            </ol>

            <h2>L&apos;exercice</h2>
            <div className="box accent">
              <div className="box-label">À toi de jouer</div>
              <h3>Construis la première page de ton idée.</h3>
              <p>
                Prends ton idée et fais-en une vraie page à l&apos;écran. Pas la copie d&apos;un site
                existant, la tienne. L&apos;objectif n&apos;est pas la perfection, c&apos;est
                d&apos;avoir une page qui te ressemble et que tu es fier de montrer.
              </p>
            </div>

            <h2>Le livrable</h2>
            <div className="box">
              <div className="box-label">Ce que tu obtiens</div>
              <h3>La première page de ton projet, en vrai.</h3>
              <p>
                Ta propre idée, devenue une page que tu peux montrer. C&apos;est le premier vrai
                morceau de ton produit. On la mettra en ligne et on la fera grandir dans les modules
                suivants.
              </p>
            </div>

            <h2>Les prompts réutilisables</h2>
            <div className="prompt">
              <span className="plabel">Prompt de démarrage</span>
              Crée la page d&apos;accueil de mon projet : [décris ton idée en une phrase]. Une section
              héro avec un grand titre, un sous-titre et un bouton, puis trois blocs en dessous. Style
              [deux mots], couleurs chaudes et lisibles.
            </div>
            <div className="prompt">
              <span className="plabel">Prompt d&apos;ajustement</span>
              Sur cette page, rends le titre plus gros, change le bouton en orange, et remplace le
              texte du héro par [ton texte]. Garde le reste identique.
            </div>

            <div className="pager">
              <Link href="/parcours">
                <div className="dir">← Module précédent</div>
                <div className="pt">00 · Prends en main tes outils</div>
              </Link>
              <Link href="/parcours" className="next">
                <div className="dir">Module suivant →</div>
                <div className="pt">02 · Structure ton site</div>
              </Link>
            </div>
          </div>

          <aside className="mside">
            <div className="mside-card">
              <span className="k">Infos du module</span>
              <div className="mside-row">
                <span>Durée</span>
                <span className="v">≈ 3 h</span>
              </div>
              <div className="mside-row">
                <span>Niveau</span>
                <span className="v">Débutant</span>
              </div>
              <div className="mside-row">
                <span>Prérequis</span>
                <span className="v">Module 00</span>
              </div>
              <div className="mside-row">
                <span>Livrable</span>
                <span className="v">Ta première page</span>
              </div>
              <div className="mside-row">
                <span>Outils</span>
                <span className="v">Éditeur IA + hébergement</span>
              </div>
            </div>
            <div className="mside-card">
              <span className="k">Dans ce module</span>
              <div className="mside-row">
                <a href="#etapes">Les étapes</a>
              </div>
              <div className="mside-row">
                <span>L&apos;exercice</span>
              </div>
              <div className="mside-row">
                <span>Le livrable</span>
              </div>
              <div className="mside-row">
                <span>Les prompts</span>
              </div>
            </div>
            <a href="#etapes" className="btn" style={{ justifyContent: "center" }}>
              Commencer le module
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
