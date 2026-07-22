import Link from "next/link";
import { etapesDetailFacture, prerequisFacture } from "@/lib/module-facture";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Automatise tes factures — The Vibe Experience" };

export default function ModuleFacture() {
  const cards = etapesDetailFacture.map((e) => ({
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
          etapes={etapesDetailFacture}
          currentSlug=""
          basePath="/automatiser-tes-factures"
          moduleLabel="Automatise tes factures"
        />

        <div className="ecol ecol-with-side">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise tes factures</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Résultat · En écriture
          </div>
          <h1 className="mov-h1">
            Automatise tes factures, <em>ton devis signé devient facture</em>.
          </h1>
          <p className="mov-meta">5 étapes · ≈ 30 min (setup compris, une seule fois) · Débutant</p>
          <p className="etape-obj">
            Le cas magique : « le devis DEV-2026-012 est accepté, facture d&apos;acompte de
            30 % », et la facture sort, sans rien ressaisir. Le skill sait faire les quatre
            documents de la vraie vie : la facture classique, l&apos;acompte, le solde qui déduit
            tout seul, et l&apos;avoir quand il faut corriger. Et si tu ne fais pas de devis, il
            fait aussi tes factures de zéro.
          </p>

          <ModuleSidePanel
            moduleKey="/automatiser-tes-factures"
            basePath="/automatiser-tes-factures"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            facts={[
              { label: "Livrable", value: "Tes factures conformes, en une phrase" },
              { label: "Durée", value: "5 étapes · ≈ 30 min" },
              { label: "Outil", value: "Claude Code + le skill offert" },
            ]}
            jugeHref="/parcours"
            jugeLabel="Retourne au parcours choisir la suite"
          />

          <ModuleProgress
            moduleKey="/automatiser-tes-factures"
            basePath="/automatiser-tes-factures"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes
            moduleKey="/automatiser-tes-factures"
            basePath="/automatiser-tes-factures"
            etapes={cards}
          />

          <div className="label mov-sec">Ce qu&apos;il te faut sous la main</div>
          <p className="mov-toolintro">
            Rassemble ça avant de commencer. Si tu utilises déjà le skill devis, il récupère la
            plupart de ces informations tout seul : il ne te restera que les trois premières.
          </p>
          <div className="tfilets">
            {prerequisFacture.map((p) => (
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

          <div className="label mov-sec">Ta boîte à outils</div>
          <p className="mov-toolintro">
            Un outil payant, un skill offert. Aucun logiciel de facturation, aucun abonnement en
            plus.
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
                Générer une facture
                <span className="cost cost-gratuit">Gratuit</span>
              </span>
              <span className="tfilet-desc">
                Notre skill, compagnon du skill devis : configuration partagée, zéro ressaisie.
                Il marche aussi tout seul.
              </span>
            </div>
          </div>

          <Link href="/parcours" className="mov-cta">
            <span className="label">Et après ?</span>
            <span className="mov-cta-title">Retourne au parcours choisir la suite →</span>
            <span className="mov-cta-desc">
              La compta, les mails, l&apos;agenda : les prochains modules de la famille
              « Automatiser ton business » suivent le même principe, un skill prêt à
              l&apos;emploi et un résultat immédiat. Et si le chemin te plaît, la famille
              « Apprendre à construire » t&apos;apprend à fabriquer les tiens.
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
