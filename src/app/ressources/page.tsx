import Link from "next/link";
import RessourcesList from "@/components/RessourcesList";

export const metadata = { title: "Ressources — The Vibe Experience" };

export default function Ressources() {
  return (
    <div className="pgwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Ressources</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Ressources
      </div>
      <h1 className="pg-h1">
        Les outils, les skills et les prompts <em>du parcours</em>.
      </h1>
      <p className="pg-lead">
        Tout vient des modules : les outils avec leur vrai coût, les skills qu&apos;on te donne, et
        les prompts exacts qu&apos;on utilise dedans, prêts à copier. Rien d&apos;inventé, et ça
        grandit à mesure que le parcours avance.
      </p>

      <RessourcesList />
    </div>
  );
}
