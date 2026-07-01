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
  {
    cat: "outils",
    type: ["Outils", "t-product"],
    title: "Ma stack d'outils du builder",
    text: "Les outils que j'utilise vraiment pour builder avec l'IA, et à quoi sert chacun, sans jargon.",
    mod: ["Module 00 · Outils", "/parcours"],
    action: "Voir la stack →",
  },
  {
    cat: "prompts",
    type: ["Prompt", "t-build"],
    title: "Prompt de démarrage de site",
    text: "Le prompt exact pour transformer ton idée en une première page d'accueil propre, en une fois.",
    mod: ["Module 01 · Première page", "/module"],
    action: "Copier le prompt →",
  },
  {
    cat: "templates",
    type: ["Template", "t-content"],
    title: "Template de page d'accueil",
    text: "La structure d'accueil qui marche : promesse, preuve, contenu, appel à l'action. Prête à remplir.",
    mod: ["Module 01 · Première page", "/module"],
    action: "Voir le template →",
  },
  {
    cat: "templates",
    type: ["Template", "t-content"],
    title: "Template de page de contenu",
    text: "Le gabarit pour une page d'article ou de module, lisible et cohérent avec le reste du site.",
    mod: ["Module 02 · Structure", "/parcours"],
    action: "Voir le template →",
  },
  {
    cat: "outils",
    type: ["Outils", "t-product"],
    title: "Impeccable, pour un design nickel",
    text: "Le skill qu'on utilise pour rendre une interface propre et pro, sans être designer.",
    mod: ["Module 03 · Fonctionnalités", "/parcours"],
    action: "Découvrir →",
  },
  {
    cat: "outils",
    type: ["Outils", "t-product"],
    title: "Agent Browser, pour tester ton site",
    text: "Fais parcourir ton site par l'IA comme un vrai visiteur, pour repérer ce qui cloche avant de partager.",
    mod: ["Module 03 · Fonctionnalités", "/parcours"],
    action: "Découvrir →",
  },
  {
    cat: "prompts",
    type: ["Prompt", "t-build"],
    title: "Prompt pour débugger avec l'IA",
    text: "Le message type quand quelque chose casse, pour que l'IA trouve et corrige sans que tu lises le code.",
    mod: ["Module 03 · Débugge", "/parcours"],
    action: "Copier le prompt →",
  },
  {
    cat: "prompts",
    type: ["Prompt", "t-build"],
    title: "Prompt d'ajustement d'interface",
    text: "Comment demander des retouches précises (couleurs, tailles, textes) sans casser le reste de la page.",
    mod: ["Module 01 · Première page", "/module"],
    action: "Copier le prompt →",
  },
  {
    cat: "checklists",
    type: ["Checklist", "t-ship"],
    title: "Checklist de mise en ligne",
    text: "Tout ce qu'il faut vérifier avant de partager ton site : nom de domaine, mobile, liens, vitesse.",
    mod: ["Module 04 · Ship", "/parcours"],
    action: "Ouvrir la checklist →",
  },
  {
    cat: "erreurs",
    type: ["À éviter", "t-warn"],
    title: "Erreurs de débutant à éviter",
    text: "Les pièges où je suis tombé pour que tu ne perdes pas le temps que j'ai perdu.",
    mod: ["Tout le parcours", "/parcours"],
    action: "Lire la liste →",
  },
];

export default function Ressources() {
  const [active, setActive] = useState("all");
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span>Ressources</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Ressources
          </div>
          <h1>
            Les prompts et templates <em>que je réutilise</em>.
          </h1>
          <p>
            Tout ce qui m&apos;a vraiment servi à avancer, prêt à copier pour ton propre projet. Ça
            grandit au fil du parcours, à chaque fois que je trouve quelque chose qui marche.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${active === f.key ? "active" : ""}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="rgrid">
            {resources
              .filter((r) => active === "all" || r.cat === active)
              .map((r) => (
                <div className="rcard" key={r.title}>
                  <span className={`rtype tag ${r.type[1]}`}>{r.type[0]}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <div className="rcard-foot">
                    <Link className="rmod" href={r.mod[1]}>
                      {r.mod[0]}
                    </Link>
                    <a href="#" className="raction">
                      {r.action}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
