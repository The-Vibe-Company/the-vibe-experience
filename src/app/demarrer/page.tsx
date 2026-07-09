import Link from "next/link";
import Quiz from "./Quiz";

export const metadata = { title: "Démarrer — The Vibe Experience" };

export default function Demarrer() {
  return (
    <>
      <header className="phead">
        <div className="wrap-narrow">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span>Démarrer</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            En 2 minutes
          </div>
          <h1>
            On t&apos;oriente vers <em>ton point de départ</em>.
          </h1>
          <p>
            Sept petites questions pour comprendre ton envie, ton objectif et ton niveau. À la fin,
            on te recommande par où commencer. Tu restes libre : rien n&apos;est verrouillé.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <Quiz />
        </div>
      </section>
    </>
  );
}
