import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "À propos — The Vibe Experience" };

export default function APropos() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span>À propos</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            À propos
          </div>
          <h1>
            Je m&apos;appelle Victor, et je <em>n&apos;avais jamais codé</em>.
          </h1>
          <p>
            The Vibe Experience, ce n&apos;est pas un cours écrit par un expert. C&apos;est le
            parcours réel de quelqu&apos;un qui est parti de zéro, raconté au fur et à mesure. Voici
            pourquoi je le fais.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap hero-grid">
          <div>
            <p
              className="lead"
              style={{ color: "var(--fg)", fontWeight: 600, fontSize: "1.3rem", marginBottom: "1.2rem" }}
            >
              Je suis arrivé chez The Vibe Company sans savoir coder. Pas « un peu rouillé », vraiment
              zéro.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginBottom: "1rem", lineHeight: 1.65 }}>
              Je regardais les développeurs comme s&apos;ils parlaient une autre langue. Et puis
              j&apos;ai commencé à construire avec l&apos;IA. Pas à apprendre le code dans un livre, à
              construire de vraies choses, en discutant avec une IA comme je te parle là.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginBottom: "1rem", lineHeight: 1.65 }}>
              Mon premier site est sorti en quelques heures. Ça a tout changé dans ma tête : ce qui me
              semblait réservé aux autres était devenu possible pour moi.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.65 }}>
              The Vibe Experience, c&apos;est la suite logique. J&apos;apprends en construisant, et je
              construis en partageant. Chaque étape que je franchis devient un module que tu peux
              suivre. Si moi j&apos;ai pu, tu peux.
            </p>
          </div>
          <div className="art">
            <Image
              src="/about.png"
              alt="Victor et la mascotte The Vibe Company dans une ambiance cosy"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band" style={{ textAlign: "left", padding: "4rem" }}>
            <div className="label" style={{ color: "#ff8a3d", marginBottom: "1rem" }}>
              Pourquoi je partage tout ça
            </div>
            <h2 style={{ maxWidth: "24ch" }}>
              Le plus dur, ce n&apos;est pas la technique. <em>C&apos;est de croire que c&apos;est possible.</em>
            </h2>
            <p style={{ marginLeft: 0, maxWidth: "46ch" }}>
              Alors je montre le vrai chemin, erreurs comprises, pour que tu n&apos;aies pas à
              deviner. Pas de démo parfaite et trompeuse, juste ce qui marche vraiment quand on part
              de zéro.
            </p>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="label">Ce en quoi je crois</div>
            <h2>Trois principes, tout le temps.</h2>
          </div>
          <div className="modules">
            <div className="mod">
              <div className="mod-top">
                <span className="mod-num">01</span>
                <span className="tag t-warn">Honnête</span>
              </div>
              <h3>Erreurs comprises</h3>
              <p>
                Je montre ce qui rate autant que ce qui marche. Le build in public, sans filtre,
                parce que c&apos;est là qu&apos;on apprend vraiment.
              </p>
            </div>
            <div className="mod">
              <div className="mod-top">
                <span className="mod-num">02</span>
                <span className="tag t-build">Concret</span>
              </div>
              <h3>On apprend en construisant</h3>
              <p>
                Pas de théorie hors-sol. Tu builds une vraie chose dès le premier jour, et tu repars
                avec quelque chose en ligne.
              </p>
            </div>
            <div className="mod">
              <div className="mod-top">
                <span className="mod-num">03</span>
                <span className="tag t-ship">Ouvert</span>
              </div>
              <h3>Reproductible pour tous</h3>
              <p>
                Ce que j&apos;ai fait, tu peux le refaire. Le parcours est pensé pour ça : gratuit,
                ouvert, et fait pour les non-tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <h2>
              Prêt à écrire <em>ta propre histoire</em> ?
            </h2>
            <p>
              Commence là où j&apos;ai commencé. Le premier module t&apos;attend, et tu n&apos;as
              besoin de rien savoir pour le suivre.
            </p>
            <Link href="/parcours" className="btn btn-inv">
              Commence le parcours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
