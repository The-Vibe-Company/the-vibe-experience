import Link from "next/link";
import ParcoursModule1 from "@/components/ParcoursModule1";

export const metadata = { title: "Le parcours — The Vibe Experience" };

// Famille « Automatiser ton business » : catalogue en préparation. Skills prêts
// à l'emploi, pas encore livrés, donc pas cliquables (aucun lien mort).
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
  {
    titre: "Gérer mes mails",
    desc: "Trier, répondre, retrouver, sans y passer ta matinée.",
  },
  {
    titre: "Gérer mon agenda",
    desc: "Tes rendez-vous et tes rappels organisés à ta place.",
  },
];

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
        Choisis <em>ce que tu veux faire</em>.
      </h1>
      <p className="pg-lead">
        Deux familles. Apprendre à construire tes propres produits, ou automatiser les tâches qui te
        bouffent du temps. Commence par celle qui te parle.
      </p>

      {/* Famille 1 : Apprendre à construire */}
      <div className="pc-fam">
        <div className="pc-fam-head">
          <span className="label">Apprendre à construire</span>
        </div>
        <p className="pc-fam-intro">
          Tu apprends à fabriquer tes propres trucs, pas à pas, et tu montes en compétence. Le chemin
          fait partie de la valeur.
        </p>

        <ParcoursModule1 />

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
        </div>
      </div>

      {/* Famille 2 : Automatiser ton business */}
      <div className="pc-fam">
        <div className="pc-fam-head">
          <span className="label">Automatiser ton business</span>
          <span className="pc-fam-soon">En préparation</span>
        </div>
        <p className="pc-fam-intro">
          Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps. Des skills prêts à
          l&apos;emploi, tu apprends juste à t&apos;en servir. Pour ceux qui veulent un résultat, pas
          forcément apprendre à tout construire.
        </p>

        <div className="pc-suite-list">
          {businessSoon.map((m) => (
            <div className="pc-srow pc-srow-soon" key={m.titre}>
              <span>
                <span className="pc-srow-title">{m.titre}</span>
                <span className="pc-srow-desc">{m.desc}</span>
              </span>
              <span className="pc-srow-status">Bientôt</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pc-orient">
        <div>
          <span className="pc-orient-t">Tu ne sais pas par où commencer ?</span>
          <p>Quelques questions, deux minutes : on te dit par où démarrer, selon ce que tu veux.</p>
        </div>
        <Link href="/demarrer" className="btn btn-ghost">
          On t&apos;oriente →
        </Link>
      </div>
    </div>
  );
}
