import Link from "next/link";
import Quiz from "./Quiz";
import SkipQuizLink from "@/components/SkipQuizLink";

export const metadata = { title: "Démarrer — The Vibe Experience" };

export default function Demarrer() {
  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Démarrer</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        En 2 minutes
      </div>
      <h1 className="pg-h1">
        On t&apos;oriente vers <em>ton point de départ</em>.
      </h1>
      <p className="pg-lead">
        Sept petites questions pour comprendre ton envie, ton objectif et ton niveau. À la fin, on te
        recommande par où commencer. Le quiz est optionnel, tu peux aussi choisir directement.
      </p>
      <div className="quiz-skip">
        <div>
          <span className="quiz-skip-title">Tu veux aller plus vite ?</span>
          <p>Va directement aux parcours. Tu pourras revenir faire le quiz plus tard.</p>
        </div>
        <SkipQuizLink className="btn btn-ghost">
          Passer le quiz →
        </SkipQuizLink>
      </div>
      <div style={{ marginTop: "2.4rem" }}>
        <Quiz />
      </div>
    </div>
  );
}
