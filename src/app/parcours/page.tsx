import Link from "next/link";
import ParcoursModule1 from "@/components/ParcoursModule1";

export const metadata = { title: "Le parcours — The Vibe Experience" };

export default function Parcours() {
  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Parcours</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Le parcours
      </div>
      <h1 className="pg-h1">
        Choisis <em>ce que tu veux créer</em>.
      </h1>
      <p className="pg-lead">
        Un produit, puis un savoir-faire, et on recommence. Commence par le module qui te donne
        envie.
      </p>

      <ParcoursModule1 />

      <div className="pc-suite">
        <div className="label">La suite</div>
        <div className="pc-suite-list">
          <Link className="pc-srow" href="/creer-un-skill">
            <span className="pc-srow-n">02</span>
            <span>
              <span className="pc-srow-title">Créer ton premier skill</span>
              <span className="pc-srow-desc">
                Tu as utilisé des skills tout faits ; celui-ci t&apos;apprend à fabriquer le tien,
                réutilisable dans ton prochain produit.
              </span>
              <span className="pc-srow-meta">Savoir-faire · après le module 1</span>
            </span>
            <span className="pc-srow-status">Disponible →</span>
          </Link>
          <div className="pc-srow pc-srow-dots">
            <span className="pc-srow-n">…</span>
            <span className="pc-srow-tail">
              Et on recommence : un produit, un savoir-faire, un produit. La suite s&apos;écrit en
              public.
            </span>
          </div>
        </div>
      </div>

      <div className="pc-orient">
        <div>
          <span className="pc-orient-t">Tu ne sais pas par où commencer ?</span>
          <p>Sept petites questions, deux minutes : on te recommande ton point de départ.</p>
        </div>
        <Link href="/demarrer" className="btn btn-ghost">
          On t&apos;oriente →
        </Link>
      </div>
    </div>
  );
}
