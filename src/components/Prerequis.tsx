import type { Prerequis } from "@/lib/module-faire-un-site";

// « Ce qu'il te faut sous la main » : la liste de ce qu'on doit rassembler AVANT
// de commencer. Rendue sur chaque page de module, juste après l'intro et avant
// les étapes, et pointée depuis le panneau latéral par l'ancre ce-quil-te-faut.
// Réutilise les fiches de la boîte à outils, donc aucun style spécifique.
export default function PrerequisSection({
  items,
  intro,
}: {
  items: Prerequis[];
  intro: string;
}) {
  return (
    <>
      <div className="label mov-sec" id="ce-quil-te-faut">
        Ce qu&apos;il te faut sous la main
      </div>
      <p className="mov-toolintro">{intro}</p>
      <div className="tfilets">
        {items.map((p) => (
          <div className="tfilet" key={p.quoi}>
            <span className="tfilet-name">
              {p.quoi}
              <span
                className={p.niveau === "obligatoire" ? "cost cost-payant" : "cost cost-gratuit"}
              >
                {p.niveau === "obligatoire" ? "Obligatoire" : "Conseillé"}
              </span>
            </span>
            <span className="tfilet-desc">{p.ou}</span>
          </div>
        ))}
      </div>
    </>
  );
}
