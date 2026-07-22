import Link from "next/link";
import { etapesDetailDevis, prerequisDevis } from "@/lib/module-devis";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Automatise tes devis — The Vibe Experience" };

export default function ModuleDevis() {
  const cards = etapesDetailDevis.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    obj: e.obj,
    tagLabel: e.tag[0],
    dur: e.dur,
    sousCount: e.sous.length,
  }));

  return (
    <section className="etape-section">
      <MarkSelectedPath path="automatiser" />
      <div className="etape-shell">
        <ModuleRail
          etapes={etapesDetailDevis}
          currentSlug=""
          basePath="/automatiser-tes-devis"
          moduleLabel="Automatise tes devis"
        />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise tes devis</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Résultat · En écriture
          </div>
          <h1 className="mov-h1">
            Automatise tes devis, <em>une phrase, un devis conforme</em>.
          </h1>
          <p className="mov-meta">5 étapes · ≈ 35 min (dont 10 de setup, une seule fois) · Débutant</p>
          <p className="etape-obj">
            Tu dis « devis pour Madame Martin, remplacement du chauffe-eau, 980 euros », et tu
            obtiens un devis professionnel conforme au droit français, numéroté, prêt à imprimer
            en PDF. Ici, tu n&apos;apprends pas à construire : tu installes un skill prêt à
            l&apos;emploi, offert, et tu repars avec tes devis en 2 à 3 minutes au lieu de 20 à
            40 à bricoler un vieux fichier Word.
          </p>

          {/* Volontairement AVANT les étapes : la personne rassemble ses papiers
              une fois, puis déroule le module sans être coupée au milieu du setup. */}
          <div className="label mov-sec">Ce qu&apos;il te faut sous la main</div>
          <p className="mov-toolintro">
            Rassemble ça avant de commencer : on te le demandera une seule fois, au setup, et tu
            dérouleras ensuite sans avoir à te lever.
          </p>
          <div className="tfilets">
            {prerequisDevis.map((p) => (
              <div className="tfilet" key={p.quoi}>
                <span className="tfilet-name">
                  {p.quoi}
                  <span className={p.niveau === "obligatoire" ? "cost cost-payant" : "cost cost-gratuit"}>
                    {p.niveau === "obligatoire" ? "Obligatoire" : "Conseillé"}
                  </span>
                </span>
                <span className="tfilet-desc">{p.ou}</span>
              </div>
            ))}
          </div>

          <ModuleSidePanel
            moduleKey="/automatiser-tes-devis"
            basePath="/automatiser-tes-devis"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            facts={[
              { label: "Livrable", value: "Tes devis conformes, en une phrase" },
              { label: "Durée", value: "5 étapes · ≈ 35 min" },
              { label: "Outil", value: "Claude Code + le skill offert" },
            ]}
            jugeHref="/automatiser-tes-factures"
            jugeLabel="Enchaîne : Automatise tes factures"
          />

          <ModuleProgress
            moduleKey="/automatiser-tes-devis"
            basePath="/automatiser-tes-devis"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes
            moduleKey="/automatiser-tes-devis"
            basePath="/automatiser-tes-devis"
            etapes={cards}
          />

          <div className="label mov-sec">Ta boîte à outils</div>
          <p className="mov-toolintro">
            Un outil payant, un skill offert. Aucun logiciel de devis, aucun abonnement en plus.
          </p>
          <div className="tfilets">
            <div className="tfilet">
              <span className="tfilet-name">
                Claude Code
                <span className="cost cost-payant">Payant</span>
              </span>
              <span className="tfilet-desc">
                L&apos;app où vit le skill. L&apos;abonnement Pro (environ 20 € par mois) suffit.
              </span>
            </div>
            <div className="tfilet">
              <span className="tfilet-name">
                Générer un devis
                <span className="cost cost-gratuit">Gratuit</span>
              </span>
              <span className="tfilet-desc">
                Notre skill, éprouvé sur banc d&apos;essai et testé avec une vraie débutante.
                Mentions légales à jour, vérifiées sur les sources officielles.
              </span>
            </div>
          </div>

          <Link href="/automatiser-tes-factures" className="mov-cta">
            <span className="label">Et après ?</span>
            <span className="mov-cta-title">Automatise tes factures →</span>
            <span className="mov-cta-desc">
              Quand un devis est accepté, son compagnon prend le relais : le module suivant
              installe le skill facture, qui transforme ton devis signé en facture d&apos;acompte
              ou de solde sans une seule ressaisie. Ta configuration d&apos;ici lui servira telle
              quelle.
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
