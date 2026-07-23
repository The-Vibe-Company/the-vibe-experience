import Link from "next/link";
import { etapesDetailFacture } from "@/lib/module-facture";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import MarkSelectedPath from "@/components/MarkSelectedPath";
import { invoiceShell } from "@/lib/module-shell-config";

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
            facts={invoiceShell.facts}
            resources={invoiceShell.resources}
            jugeHref={invoiceShell.finishedHref}
            jugeLabel={invoiceShell.finishedLabel}
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
        </div>
      </div>
    </section>
  );
}
