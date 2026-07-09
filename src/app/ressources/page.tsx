"use client";

import Link from "next/link";
import { useState } from "react";

const filters = [
  { key: "all", label: "Tout" },
  { key: "prompts", label: "Prompts" },
  { key: "templates", label: "Templates" },
  { key: "checklists", label: "Checklists" },
  { key: "outils", label: "Outils" },
  { key: "erreurs", label: "Erreurs à éviter" },
];

const resources = [
  { cat: "outils", type: "Outils", title: "Ma stack d'outils du builder", text: "Les outils que j'utilise vraiment pour builder avec l'IA, et à quoi sert chacun, sans jargon.", action: "Voir la stack →" },
  { cat: "prompts", type: "Prompt", title: "Prompt de démarrage de site", text: "Le prompt exact pour transformer ton idée en une première page d'accueil propre, en une fois.", action: "Copier le prompt →" },
  { cat: "templates", type: "Template", title: "Template de page d'accueil", text: "La structure d'accueil qui marche : promesse, preuve, contenu, appel à l'action. Prête à remplir.", action: "Voir le template →" },
  { cat: "templates", type: "Template", title: "Template de page de contenu", text: "Le gabarit pour une page d'article ou de module, lisible et cohérent avec le reste du site.", action: "Voir le template →" },
  { cat: "outils", type: "Outils", title: "Impeccable, pour un design nickel", text: "Le skill qu'on utilise pour rendre une interface propre et pro, sans être designer.", action: "Découvrir →" },
  { cat: "outils", type: "Outils", title: "Agent Browser, pour tester ton site", text: "Fais parcourir ton site par l'IA comme un vrai visiteur, pour repérer ce qui cloche avant de partager.", action: "Découvrir →" },
  { cat: "prompts", type: "Prompt", title: "Prompt pour débugger avec l'IA", text: "Le message type quand quelque chose casse, pour que l'IA trouve et corrige sans que tu lises le code.", action: "Copier le prompt →" },
  { cat: "prompts", type: "Prompt", title: "Prompt d'ajustement d'interface", text: "Comment demander des retouches précises (couleurs, tailles, textes) sans casser le reste de la page.", action: "Copier le prompt →" },
  { cat: "checklists", type: "Checklist", title: "Checklist de mise en ligne", text: "Tout ce qu'il faut vérifier avant de partager ton site : nom de domaine, mobile, liens, vitesse.", action: "Ouvrir la checklist →" },
  { cat: "erreurs", type: "À éviter", title: "Erreurs de débutant à éviter", text: "Les pièges où je suis tombé pour que tu ne perdes pas le temps que j'ai perdu.", action: "Lire la liste →" },
];

export default function Ressources() {
  const [active, setActive] = useState("all");
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
        Les prompts et templates <em>que je réutilise</em>.
      </h1>
      <p className="pg-lead">
        Tout ce qui m&apos;a vraiment servi à avancer, prêt à copier pour ton propre projet. Ça
        grandit au fil du parcours, à chaque fois que je trouve quelque chose qui marche.
      </p>

      <div className="rfilters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`rfilter ${active === f.key ? "active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rfil">
        {resources
          .filter((r) => active === "all" || r.cat === active)
          .map((r) => (
            <div className="rrow" key={r.title}>
              <div className="rrow-body">
                <div className="rrow-type">{r.type}</div>
                <div className="rrow-title">{r.title}</div>
                <div className="rrow-text">{r.text}</div>
              </div>
              <a href="#" className="rrow-action">
                {r.action}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
