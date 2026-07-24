import Link from "next/link";
import { etapesDetailFacture } from "@/lib/module-facture";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleStartGuide from "@/components/ModuleStartGuide";
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
      <div className="etape-shell module-overview-shell">
        <ModuleRail
          etapes={etapesDetailFacture}
          currentSlug=""
          basePath="/automatiser-tes-factures"
          moduleLabel="Automatise tes factures"
        />

        <div className="ecol module-overview-main">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise tes factures</span>
          </div>

          <header className="module-intro">
            <div className="label">Module · Résultat · En écriture</div>
            <h1 className="mov-h1">
              Automatise tes factures, <em>ton devis signé devient facture</em>.
            </h1>
            <p className="mov-meta">5 étapes · ≈ 30 min, setup compris une seule fois · Débutant</p>
            <p className="etape-obj">
              Le cas magique : « le devis DEV-2026-012 est accepté, facture d&apos;acompte de
              30 % », et la facture sort, sans rien ressaisir. Le skill sait faire les quatre
              documents de la vraie vie : la facture classique, l&apos;acompte, le solde qui déduit
              tout seul, et l&apos;avoir quand il faut corriger. Et si tu ne fais pas de devis, il
              fait aussi tes factures de zéro.
            </p>
            <ModuleStartGuide
              requirement="Il te faut seulement un ordinateur, Claude Pro et les informations de facturation de ton entreprise."
              prerequisitesHref={`/automatiser-tes-factures/${cards[0]?.slug}#prerequis`}
            />
          </header>

          <ModuleProgress
            moduleKey="/automatiser-tes-factures"
            basePath="/automatiser-tes-factures"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            completionHref="/parcours"
            completionLabel="Choisir le prochain module"
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes
            moduleKey="/automatiser-tes-factures"
            basePath="/automatiser-tes-factures"
            etapes={cards}
          />
        </div>
      </div>
    </section>
  );
}
