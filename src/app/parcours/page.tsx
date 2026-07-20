import Link from "next/link";
import ParcoursFamilies from "@/components/ParcoursFamilies";
import ParcoursSidePanel from "@/components/ParcoursSidePanel";

export const metadata = { title: "Le parcours — The Vibe Experience" };

const principes = [
  {
    t: "Un vrai livrable",
    d: "Chaque module se termine par un truc qui existe : ton site en ligne, ton skill qui tourne. Pas un quiz de fin, pas un certificat.",
  },
  {
    t: "Des sous-étapes à cocher",
    d: "Chaque module est découpé en étapes, puis en sous-étapes que tu coches en avançant. Tu sais toujours où tu en es et ce qui te reste.",
  },
  {
    t: "À ton rythme",
    d: "Tu peux t'arrêter en plein milieu et revenir plus tard : ta progression est gardée ici, et sur ton compte si tu en crées un.",
  },
];

export default function Parcours() {
  return (
    <div className="pgwrap pcx-grid">
      <div className="pcx-head">
        <div className="crumb">
          <Link href="/">Accueil</Link>
          <span className="sep">/</span>
          <span>Parcours</span>
        </div>
        <div className="label" style={{ marginTop: "1.1rem" }}>
          Le parcours
        </div>
        <h1 className="pg-h1">
          Choisis <em>ce que tu veux faire</em>.
        </h1>
        <p className="pg-lead">
          Deux façons d&apos;avancer. Apprendre à construire tes propres produits, ou automatiser
          les tâches qui te bouffent du temps. Commence par celle qui te parle. Le quiz peut
          t&apos;aider, mais il n&apos;est pas obligatoire.
        </p>
      </div>

      <ParcoursFamilies />

      <ParcoursSidePanel />

      <div className="pcx-principe">
        <div className="label">Le principe</div>
        <div className="tfilets">
          {principes.map((p) => (
            <div className="tfilet" key={p.t}>
              <span className="tfilet-name">{p.t}</span>
              <span className="tfilet-desc">{p.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
