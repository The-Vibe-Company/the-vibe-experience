import Link from "next/link";
import JugeSkillForm from "./JugeSkillForm";

export const metadata = { title: "Le juge des skills | The Vibe Experience" };

export default function JugeSkill() {
  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/creer-un-skill">Créer ton premier skill</Link>
        <span className="sep">/</span>
        <span>Le juge</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Le juge des skills
      </div>
      <h1 className="pg-h1">
        Le juge <em>lit ton skill</em>.
      </h1>
      <p className="pg-lead">
        Colle le contenu de ton fichier SKILL.md. Le juge vérifie qu&apos;il est bien formé : un nom,
        une description qui dit quand l&apos;utiliser, et des instructions. S&apos;il manque quelque
        chose, il te dit quoi et à quelle étape revenir. Ce n&apos;est pas une note, juste un coup de
        main pour finir proprement.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <JugeSkillForm />
      </div>
    </div>
  );
}
