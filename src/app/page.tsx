import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="label">Le fil rouge · The Vibe Company</div>
            <h1>
              Deviens builder avec l&apos;IA. <em>En partant de zéro.</em>
            </h1>
            <p className="lead">
              Le parcours réel de quelqu&apos;un qui n&apos;avait jamais codé, qui construit un
              vrai produit avec l&apos;IA, et te montre exactement comment refaire la même chose.
            </p>
            <div className="hero-cta">
              <Link href="/parcours" className="btn">
                Commence le parcours
              </Link>
              <Link href="/parcours" className="btn btn-ghost">
                Voir les modules
              </Link>
            </div>
            <div className="hero-note">
              <span className="dot" /> Gratuit et ouvert. On construit en public, erreurs comprises.
            </div>
          </div>
          <div className="art">
            <Image
              src="/hero.png"
              alt="Victor en train de builder son site avec la mascotte The Vibe Company à ses côtés"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="wrap strip-grid">
          <div className="stat">
            <div className="num">0</div>
            <div className="cap">ligne de code au départ</div>
          </div>
          <div className="stat">
            <div className="num">5</div>
            <div className="cap">modules pas à pas</div>
          </div>
          <div className="stat">
            <div className="num">1</div>
            <div className="cap">vrai produit en ligne</div>
          </div>
          <div className="stat">
            <div className="num">100%</div>
            <div className="cap">construit avec l&apos;IA</div>
          </div>
        </div>
      </div>

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="label">Le parcours</div>
            <h2>Tu apprends en construisant.</h2>
            <p>
              Chaque module est une étape réelle de construction du site. Tu ne regardes pas une
              théorie, tu builds, et à la fin tu as quelque chose en ligne.
            </p>
          </div>
          <div className="modules">
            <Link className="mod" href="/parcours">
              <div className="mod-top">
                <span className="mod-num">Module 00</span>
                <span className="tag t-setup">Setup</span>
              </div>
              <h3>Prends en main tes outils</h3>
              <p>
                Installe ton environnement et comprends comment parler à l&apos;IA pour construire.
                Sans les bons outils, on ne va nulle part.
              </p>
              <div className="mod-foot">Objectif : prêt à builder →</div>
            </Link>
            <Link className="mod" href="/module">
              <div className="mod-top">
                <span className="mod-num">Module 01</span>
                <span className="tag t-build">Build</span>
              </div>
              <h3>Construis ta première page</h3>
              <p>
                Pars de ton idée et fais-en une vraie page à l&apos;écran, du prompt au résultat,
                sans écrire une ligne de code.
              </p>
              <div className="mod-foot">Le module complet de la V0 →</div>
            </Link>
            <Link className="mod" href="/parcours">
              <div className="mod-top">
                <span className="mod-num">Module 02</span>
                <span className="tag t-build">Build</span>
              </div>
              <h3>Structure ton site</h3>
              <p>
                Passe d&apos;une seule page à un vrai site multi-pages, avec un menu et une
                navigation qui se tiennent.
              </p>
              <div className="mod-foot">Ton site prend de l&apos;ampleur →</div>
            </Link>
            <Link className="mod" href="/parcours">
              <div className="mod-top">
                <span className="mod-num">Module 03</span>
                <span className="tag t-product">Produit</span>
              </div>
              <h3>Rends-le vivant et débugge</h3>
              <p>
                Ajoute de vraies fonctionnalités (avec des outils comme Impeccable ou Agent Browser)
                et apprends à réparer avec l&apos;IA quand ça casse.
              </p>
              <div className="mod-foot">Tu gagnes en autonomie →</div>
            </Link>
            <Link className="mod" href="/parcours">
              <div className="mod-top">
                <span className="mod-num">Module 04</span>
                <span className="tag t-ship">Ship</span>
              </div>
              <h3>Mets-le en ligne et partage</h3>
              <p>Nom de domaine, déploiement propre, et tu partages ton produit au monde.</p>
              <div className="mod-foot">Tu deviens builder →</div>
            </Link>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap teasers">
          <div className="teaser">
            <div className="label">Journal de bord</div>
            <h3>Ce que j&apos;apprends, en direct.</h3>
            <p>Les vraies étapes, les blocages, les déclics. Rien n&apos;est lissé.</p>
            <div className="journal-item">
              <span className="jn">Sem. 12</span>
              <span className="jt">Comment j&apos;ai posé les bases du fil rouge</span>
            </div>
            <div className="journal-item">
              <span className="jn">Sem. 10</span>
              <span className="jt">Mon premier site, du prompt à la mise en ligne</span>
            </div>
            <div className="journal-item">
              <span className="jn">Sem. 08</span>
              <span className="jt">Les outils que j&apos;utilise pour builder sans savoir coder</span>
            </div>
          </div>
          <div className="teaser">
            <div className="label">Ressources</div>
            <h3>Les prompts et templates que je réutilise.</h3>
            <p>Tout ce qui m&apos;a servi à avancer, prêt à copier pour ton propre projet.</p>
            <div className="res-list">
              <span className="chip">Prompts de démarrage</span>
              <span className="chip">Templates de page</span>
              <span className="chip">Checklist déploiement</span>
              <span className="chip">Ma stack d&apos;outils</span>
              <span className="chip">Erreurs à éviter</span>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <h2>
              Prêt à builder ton <em>premier produit</em> ?
            </h2>
            <p>Commence le Module 0 maintenant. Dans une heure, tu as quelque chose en ligne.</p>
            <Link href="/parcours" className="btn btn-inv">
              Commence le parcours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
