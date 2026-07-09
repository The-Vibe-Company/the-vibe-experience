import Link from "next/link";

export const metadata = { title: "Les modules — The Vibe Experience" };

export default function Parcours() {
  return (
    <div className="pgwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Modules</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Les modules
      </div>
      <h1 className="pg-h1">
        Choisis <em>ce que tu veux créer</em>.
      </h1>
      <p className="pg-lead">
        Deux familles de modules. Les produits, ce que tu construis (un site, une app, un jeu). Les
        savoir-faire, les briques réutilisables (créer un skill, automatiser) qui te servent dans tes
        produits. On alterne : tu apprends une brique, tu l&apos;appliques tout de suite.
      </p>

      <div className="fam-grid">
        <div>
          <div className="label">Produits · ce que tu crées</div>
          <div className="fam-list">
            <Link className="frow" href="/module">
              <span>
                <span className="frow-n">Faire un site</span>
                <span className="frow-s">De ton idée à en ligne · 6 étapes</span>
              </span>
              <span className="frow-badge ok">Disponible</span>
            </Link>
            <div className="frow">
              <span>
                <span className="frow-n">Faire une app</span>
                <span className="frow-s">Comptes, données, vraies fonctionnalités</span>
              </span>
              <span className="frow-badge">À venir</span>
            </div>
            <div className="frow">
              <span>
                <span className="frow-n">Faire un jeu</span>
                <span className="frow-s">Simple, rapide, très ludique</span>
              </span>
              <span className="frow-badge">À venir</span>
            </div>
            <div className="frow">
              <span>
                <span className="frow-n">Faire ta DA</span>
                <span className="frow-s">Ton identité visuelle, ta mascotte</span>
              </span>
              <span className="frow-badge">À venir</span>
            </div>
          </div>
        </div>

        <div>
          <div className="label">Savoir-faire · tes briques réutilisables</div>
          <div className="fam-list">
            <Link className="frow" href="/creer-un-skill">
              <span>
                <span className="frow-n">Créer ton premier skill</span>
                <span className="frow-s">Le fabriquer, le tester, le réutiliser · 5 étapes</span>
              </span>
              <span className="frow-badge ok">Disponible</span>
            </Link>
            <div className="frow">
              <span>
                <span className="frow-n">Automatiser une tâche</span>
                <span className="frow-s">Faire faire à l&apos;IA ce qui se répète</span>
              </span>
              <span className="frow-badge">À venir</span>
            </div>
            <div className="frow">
              <span>
                <span className="frow-n">Bien prompter</span>
                <span className="frow-s">Obtenir de bien meilleurs résultats</span>
              </span>
              <span className="frow-badge">À venir</span>
            </div>
          </div>
        </div>
      </div>

      <p style={{ color: "var(--muted-2)", fontSize: ".9rem", marginTop: "1.8rem" }}>
        La liste grandit au fil de l&apos;aventure. On commence par « Faire un site », le module
        fondateur.
      </p>

      <div className="pg-fin">
        <h2>
          On commence par <em>ton premier site</em> ?
        </h2>
        <p>De ton idée à un site en ligne, pas à pas. C&apos;est là que tout démarre.</p>
        <Link href="/module" className="btn">
          Ouvrir « Faire un site »
        </Link>
      </div>
    </div>
  );
}
