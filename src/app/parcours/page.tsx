import Link from "next/link";

export const metadata = { title: "Parcours — The Vibe Experience" };

export default function Parcours() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span>Parcours</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Le parcours
          </div>
          <h1>
            Cinq modules pour passer de zéro à <em>ton premier produit en ligne</em>.
          </h1>
          <p>
            Chaque module est une étape réelle de construction du site. Tu le fais dans l&apos;ordre,
            tu builds à chaque fois, et à la fin de chaque module tu as un livrable concret. Aucun
            prérequis technique, juste l&apos;envie de construire.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1rem" }}>
        <div className="wrap-narrow">
          <div className="path">
            <Link className="mcard" href="/parcours">
              <div className="mcard-idx">00</div>
              <div className="mcard-body">
                <h3>
                  Prends en main tes outils <span className="tag t-setup">Setup</span>
                </h3>
                <p>
                  Installe ton environnement (éditeur, IA, hébergement) et comprends comment parler à
                  l&apos;IA pour construire. Un premier écran en ligne dès le jour 1.
                </p>
              </div>
              <div className="mcard-meta">
                <span className="dur">≈ 1 h · Débutant</span>
                <span className="mcard-cta">Livrable : prêt à builder →</span>
              </div>
            </Link>

            <Link className="mcard" href="/module">
              <div className="mcard-idx">01</div>
              <div className="mcard-body">
                <h3>
                  Construis ta première page <span className="tag t-build">Build</span>
                </h3>
                <p>
                  Pars de ton idée, garde-la simple, et fais-en une vraie page à l&apos;écran. Du
                  prompt au résultat, sans écrire une ligne de code. On construit le tien, pas une
                  copie.
                </p>
              </div>
              <div className="mcard-meta">
                <span className="dur">≈ 3 h · Débutant</span>
                <span className="mcard-cta">Livrable : ta première page →</span>
              </div>
            </Link>

            <Link className="mcard" href="/parcours">
              <div className="mcard-idx">02</div>
              <div className="mcard-body">
                <h3>
                  Structure ton site <span className="tag t-build">Build</span>
                </h3>
                <p>
                  Passe d&apos;une seule page à un vrai site multi-pages, avec un menu et une
                  navigation qui se tiennent.
                </p>
              </div>
              <div className="mcard-meta">
                <span className="dur">≈ 3 h · Débutant</span>
                <span className="mcard-cta">Livrable : un site multi-pages →</span>
              </div>
            </Link>

            <Link className="mcard" href="/parcours">
              <div className="mcard-idx">03</div>
              <div className="mcard-body">
                <h3>
                  Rends-le vivant et débugge <span className="tag t-product">Produit</span>
                </h3>
                <p>
                  Ajoute de vraies fonctionnalités à ton site, avec les outils qu&apos;on utilise
                  pour de vrai (Impeccable pour le design, Agent Browser pour tester), et apprends à
                  réparer avec l&apos;IA quand ça casse.
                </p>
              </div>
              <div className="mcard-meta">
                <span className="dur">≈ 4 h · Intermédiaire</span>
                <span className="mcard-cta">Livrable : une fonctionnalité qui marche →</span>
              </div>
            </Link>

            <Link className="mcard" href="/parcours">
              <div className="mcard-idx">04</div>
              <div className="mcard-body">
                <h3>
                  Mets-le en ligne et partage <span className="tag t-ship">Ship</span>
                </h3>
                <p>
                  Nom de domaine, déploiement propre, et tu partages ton produit au monde. Tu es
                  officiellement builder.
                </p>
              </div>
              <div className="mcard-meta">
                <span className="dur">≈ 2 h · Intermédiaire</span>
                <span className="mcard-cta">Livrable : ton site public →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <h2>
              On commence par le <em>Module 0</em> ?
            </h2>
            <p>
              Le plus dur, c&apos;est de se lancer. Installe tes outils et mets ton premier site en
              ligne aujourd&apos;hui.
            </p>
            <Link href="/module" className="btn btn-inv">
              Ouvrir le premier module
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
