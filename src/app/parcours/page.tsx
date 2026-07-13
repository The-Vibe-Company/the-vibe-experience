import Link from "next/link";
import ParcoursFamilies from "@/components/ParcoursFamilies";

export const metadata = { title: "Le parcours — The Vibe Experience" };

export default function Parcours() {
  return (
    <div className="pgwrap">
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
        Deux façons d&apos;avancer. Apprendre à construire tes propres produits, ou automatiser les
        tâches qui te bouffent du temps. Commence par celle qui te parle.
      </p>

      <ParcoursFamilies />

      <div className="pc-orient">
        <div>
          <span className="pc-orient-t">Tu ne sais pas par où commencer ?</span>
          <p>Quelques questions, deux minutes : on te dit par où démarrer, selon ce que tu veux.</p>
        </div>
        <Link href="/demarrer" className="btn btn-ghost">
          On t&apos;oriente →
        </Link>
      </div>
    </div>
  );
}
