import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "À propos — The Vibe Experience" };

export default function APropos() {
  return (
    <div className="pgwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>À propos</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        À propos · The Vibe Company
      </div>
      <h1 className="pg-h1">
        Le parcours que <em>j&apos;aurais voulu avoir</em>.
      </h1>

      <div className="ap-hero">
        <div>
          <p className="ap-lead">
            Je suis arrivé chez The Vibe Company sans savoir coder. Pas « un peu rouillé », vraiment
            zéro.
          </p>
          <p className="ap-p">
            Je regardais les développeurs comme s&apos;ils parlaient une autre langue. Et puis
            j&apos;ai commencé à construire avec l&apos;IA. Pas à apprendre le code dans un livre, à
            construire de vraies choses, en discutant avec une IA comme je te parle là.
          </p>
          <p className="ap-p">
            Mon premier site est sorti en quelques heures. Ça a tout changé dans ma tête : ce qui me
            semblait réservé aux autres était devenu possible pour moi.
          </p>
          <p className="ap-p">
            The Vibe Experience, c&apos;est la suite logique. J&apos;apprends en construisant, et je
            construis en partageant. Chaque étape que je franchis devient un module que tu peux
            suivre. Si moi j&apos;ai pu, tu peux.
          </p>
        </div>
        <div className="ap-art">
          <Image
            src="/about.png"
            alt="Victor et la mascotte The Vibe Company dans une ambiance cosy"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="pg-sec" style={{ marginTop: "3.5rem" }}>
        <div className="label">Ce en quoi je crois</div>
        <h2 className="hh2" style={{ marginTop: ".6rem" }}>
          Trois principes, tout le temps.
        </h2>
        <div className="ap-princ">
          <div className="ap-prow">
            <span className="ap-pnum">01</span>
            <span>
              <span className="ap-ptitle">On apprend en construisant</span>
              <p className="ap-ptext">
                Pas de théorie hors-sol. Tu builds une vraie chose dès le premier jour, et tu repars
                avec quelque chose en ligne.
              </p>
            </span>
          </div>
          <div className="ap-prow">
            <span className="ap-pnum">02</span>
            <span>
              <span className="ap-ptitle">On construit en public</span>
              <p className="ap-ptext">
                Je montre ce qui rate autant que ce qui marche. Le build in public, sans filtre,
                parce que c&apos;est là qu&apos;on apprend vraiment.
              </p>
            </span>
          </div>
          <div className="ap-prow">
            <span className="ap-pnum">03</span>
            <span>
              <span className="ap-ptitle">Gratuit et ouvert</span>
              <p className="ap-ptext">
                Ce que j&apos;ai fait, tu peux le refaire. Le parcours est pensé pour ça : gratuit,
                ouvert, et fait pour les non-tech.
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="pg-fin">
        <h2>
          Construis ton premier produit <em>avec moi</em>.
        </h2>
        <p>
          Commence là où j&apos;ai commencé. Le premier module t&apos;attend, et tu n&apos;as besoin
          de rien savoir pour le suivre.
        </p>
        <Link href="/module" className="btn">
          Commence le parcours
        </Link>
      </div>
    </div>
  );
}
