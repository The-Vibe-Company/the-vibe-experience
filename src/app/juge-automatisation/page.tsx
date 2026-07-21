import Link from "next/link";
import JugeAutomatisationForm from "./JugeAutomatisationForm";

export const metadata = { title: "Le juge des automatisations — The Vibe Experience" };

export default function JugeAutomatisation() {
  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/automatiser-ton-travail">Automatise ton travail</Link>
        <span className="sep">/</span>
        <span>Le juge</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Le juge des automatisations
      </div>
      <h1 className="pg-h1">
        Le juge <em>lit ta consigne</em>.
      </h1>
      <p className="pg-lead">
        Colle la consigne de ton automatisation : le texte que tu as donné à Claude Code (celle de
        ton usine, ou n&apos;importe laquelle). Le juge vérifie les trois morceaux de l&apos;étape
        0 : un déclencheur clair, une action claire, un garde-fou. S&apos;il en manque un, il te
        dit lequel et où le reprendre. Ce n&apos;est pas une note, juste un coup de main pour
        finir solide.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <JugeAutomatisationForm />
      </div>
    </div>
  );
}
