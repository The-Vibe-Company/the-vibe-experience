"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParcoursModule1 from "@/components/ParcoursModule1";

type Branche = "construire" | "automatiser";

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

export default function ParcoursFamilies() {
  const [branche, setBranche] = useState<Branche | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tve_quiz_reco");
      if (raw) {
        const r = JSON.parse(raw);
        if (r.branche === "construire" || r.branche === "automatiser") setBranche(r.branche);
      }
    } catch {}
  }, []);

  const construireCol = (
    <div className="pc-col" key="construire">
      <div className="pc-col-head">
        <span className="label">Apprendre à construire</span>
        {branche === "construire" && <span className="pc-fam-reco">Ta reco</span>}
      </div>
      <p className="pc-col-intro">
        Tu apprends à fabriquer tes propres trucs, pas à pas, et tu montes en compétence. Le chemin
        fait partie de la valeur.
      </p>

      <div className="pc-col-list">
        <ParcoursModule1 />

        <Link className="pc-mc" href="/creer-un-skill">
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
    <div className="pc-col" key="automatiser">
      <div className="pc-col-head">
        <span className="label">Automatiser ton business</span>
        {branche === "automatiser" ? (
          <span className="pc-fam-reco">Ta reco</span>
        ) : (
          <span className="pc-fam-soon">En préparation</span>
        )}
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
  const className = branche ? "pc-cols pc-cols-reco" : "pc-cols";

  return <div className={className}>{cols}</div>;
}
