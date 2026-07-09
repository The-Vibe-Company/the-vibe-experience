import Link from "next/link";
import JugeForm from "./JugeForm";

export const metadata = { title: "Le juge — The Vibe Experience" };

export default function Juge() {
  return (
    <>
      <header className="phead">
        <div className="wrap-narrow">
          <div className="crumb">
            <Link href="/module">Faire un site</Link>
            <span className="sep">/</span>
            <span>Le juge</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Validation
          </div>
          <h1>
            Le juge <em>visite ton site</em>.
          </h1>
          <p>
            Il vérifie les critères techniques du module, sans jamais juger ton goût. S&apos;il
            manque quelque chose, il te dit quoi et à quelle étape revenir. Ce n&apos;est pas une
            note, juste un coup de main pour finir proprement.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <JugeForm />
        </div>
      </section>
    </>
  );
}
