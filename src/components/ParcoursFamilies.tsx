"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import ParcoursModule1 from "@/components/ParcoursModule1";

type Branche = "construire" | "automatiser";
const RECO_KEY = "tve_quiz_reco";
const RECO_EVENT = "tve-quiz-reco";

const businessSoon = [
  {
    titre: "Automatiser mes devis",
    desc: "Ton devis prêt en quelques minutes au lieu d'une heure, au bon format à chaque fois.",
  },
  {
    titre: "Automatiser mes factures",
    desc: "Tes factures générées et suivies sans que tu y penses.",
  },
  {
    titre: "Tenir ma compta",
    desc: "Le récap qui sort tout seul, chaque mois, prêt à envoyer au comptable.",
  },
  { titre: "Gérer mes mails", desc: "Trier, répondre, retrouver, sans y passer ta matinée." },
  { titre: "Gérer mon agenda", desc: "Tes rendez-vous et tes rappels organisés à ta place." },
];

function readRecoBranch(): Branche | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(RECO_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw);
    return r.branche === "construire" || r.branche === "automatiser" ? r.branche : null;
  } catch {
    return null;
  }
}

function subscribeReco(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(RECO_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(RECO_EVENT, callback);
  };
}

function clearRecommendedBranch() {
  try {
    const raw = localStorage.getItem(RECO_KEY);
    if (!raw) return;
    const record = JSON.parse(raw);
    if (!record?.branche) return;
    delete record.branche;
    localStorage.setItem(RECO_KEY, JSON.stringify(record));
    window.dispatchEvent(new CustomEvent(RECO_EVENT));
  } catch {
    // La recommandation est un confort d'affichage, pas un état critique.
  }
}

export default function ParcoursFamilies() {
  const branche = useSyncExternalStore(subscribeReco, readRecoBranch, () => null);

  const construireCol = (
    <div
      className={branche === "construire" ? "pc-col pc-col-reco" : "pc-col"}
      key="construire"
    >
      {branche === "construire" && <span className="pc-reco-tag">Parcours conseillé</span>}
      <div className="pc-col-head">
        <h2 className="pc-family-title">Apprendre à construire</h2>
      </div>
      <p className="pc-col-intro">
        Tu apprends à fabriquer tes propres trucs, pas à pas, et tu montes en compétence. Le chemin
        fait partie de la valeur.
      </p>
      <div className="pc-col-list">
        <ParcoursModule1 onChooseModule={clearRecommendedBranch} />
        <Link className="pc-mc" href="/creer-un-skill" onClick={clearRecommendedBranch}>
          <div className="pc-mc-head">
            <span className="label">Module 02 · Savoir-faire</span>
            <span className="pc-mc-status">Disponible →</span>
          </div>
          <span className="pc-mc-title">Créer ton premier skill</span>
          <p className="pc-mc-desc">
            Tu as utilisé des skills tout faits ; celui-ci t&apos;apprend à fabriquer le tien,
            réutilisable dans ton prochain produit.
          </p>
          <span className="pc-mc-meta">Savoir-faire · après le module 1</span>
        </Link>
      </div>
    </div>
  );

  const automatiserCol = (
    <div
      className={branche === "automatiser" ? "pc-col pc-col-reco" : "pc-col"}
      key="automatiser"
    >
      {branche === "automatiser" && <span className="pc-reco-tag">Parcours conseillé</span>}
      <div className="pc-col-head">
        <h2 className="pc-family-title">Automatiser ton business</h2>
        <span className="pc-fam-soon">En préparation</span>
      </div>
      <p className="pc-col-intro">
        Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps. Des skills prêts à
        l&apos;emploi, tu apprends juste à t&apos;en servir. Pour ceux qui veulent un résultat, pas
        forcément apprendre à tout construire.
      </p>
      <div className="pc-col-list">
        {businessSoon.map((m) => (
          <div className="pc-mc pc-mc-soon" key={m.titre}>
            <div className="pc-mc-head">
              <span className="pc-mc-status">Bientôt</span>
            </div>
            <span className="pc-mc-title">{m.titre}</span>
            <p className="pc-mc-desc">{m.desc}</p>
            <div className="pc-soon-bar" aria-disabled="true">
              Bientôt disponible
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const cols =
    branche === "automatiser" ? [automatiserCol, construireCol] : [construireCol, automatiserCol];

  return <div className={branche ? "pc-cols pc-cols-hasreco" : "pc-cols"}>{cols}</div>;
}
