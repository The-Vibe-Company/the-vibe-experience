import Link from "next/link";
import JugeSkillForm from "./JugeSkillForm";

export const metadata = { title: "Le juge des skills — The Vibe Experience" };

export default function JugeSkill() {
  return (
    <>
      <header className="phead">
        <div className="wrap-narrow">
          <div className="crumb">
            <Link href="/creer-un-skill">Créer ton premier skill</Link>
            <span className="sep">/</span>
            <span>Le juge</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Validation
          </div>
          <h1>
            Le juge <em>lit ton skill</em>.
          </h1>
          <p>
            Colle le contenu de ton fichier SKILL.md. Le juge vérifie qu&apos;il est bien formé : un
            nom, une description qui dit quand l&apos;utiliser, et des instructions. S&apos;il manque
            quelque chose, il te dit quoi et à quelle étape revenir. Ce n&apos;est pas une note, juste
            un coup de main pour finir proprement.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <JugeSkillForm />
        </div>
      </section>
    </>
  );
}
