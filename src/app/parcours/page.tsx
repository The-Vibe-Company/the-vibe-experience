import Link from "next/link";

export const metadata = { title: "Les modules — The Vibe Experience" };

export default function Parcours() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span>Modules</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Les modules
          </div>
          <h1>
            Choisis <em>ce que tu veux créer</em>.
          </h1>
          <p>
            Deux familles de modules. Les <strong>Produits</strong>, ce que tu construis (un site,
            une app, un jeu…). Les <strong>Savoir-faire</strong>, les briques réutilisables (créer un
            skill, automatiser…) qui te servent dans tes produits. On alterne les deux : tu
            apprends une brique, tu l&apos;appliques tout de suite.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="families">
            <div className="family">
              <div className="label">Produits · ce que tu crées</div>
              <Link className="mrow" href="/module">
                <div>
                  <div className="mn">Faire un site</div>
                  <div className="ms">De ton idée à en ligne · 5 étapes</div>
                </div>
                <span className="badge badge-ok">Disponible</span>
              </Link>
              <div className="mrow">
                <div>
                  <div className="mn">Faire une app</div>
                  <div className="ms">Comptes, données, vraies fonctionnalités</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
              <div className="mrow">
                <div>
                  <div className="mn">Faire un jeu</div>
                  <div className="ms">Simple, rapide, très ludique</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
              <div className="mrow">
                <div>
                  <div className="mn">Faire ta DA</div>
                  <div className="ms">Ton identité visuelle, ta mascotte</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
            </div>

            <div className="family">
              <div className="label">Savoir-faire · tes briques réutilisables</div>
              <div className="mrow">
                <div>
                  <div className="mn">Créer ton premier skill</div>
                  <div className="ms">Le fabriquer, le tester, le réutiliser</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
              <div className="mrow">
                <div>
                  <div className="mn">Automatiser une tâche</div>
                  <div className="ms">Faire faire à l&apos;IA ce qui se répète</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
              <div className="mrow">
                <div>
                  <div className="mn">Bien prompter</div>
                  <div className="ms">Obtenir de bien meilleurs résultats</div>
                </div>
                <span className="badge badge-soon">À venir</span>
              </div>
            </div>
          </div>

          <p style={{ color: "var(--muted-2)", fontSize: ".9rem", marginTop: "1.5rem" }}>
            La liste grandit au fil de l&apos;aventure. On commence par « Faire un site », le module
            fondateur.
          </p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="cta-band">
            <h2>
              On commence par <em>ton premier site</em> ?
            </h2>
            <p>
              Le module fondateur : de ton idée à un site en ligne, pas à pas. C&apos;est là que tout
              démarre.
            </p>
            <Link href="/module" className="btn btn-inv">
              Ouvrir « Faire un site »
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
