import Link from "next/link";
import { etapesDetailFacture } from "@/lib/module-facture";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import { ModuleOverviewIntro } from "@/components/ModuleIntro";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Automatise tes factures | The Vibe Experience" };

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
      <div className="module-overview-shell">
        <div className="module-overview">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise tes factures</span>
          </div>

          <ModuleOverviewIntro
            eyebrow="Module · Résultat · En écriture"
            title={<>Automatise tes factures, <em>ton devis signé devient facture</em>.</>}
            meta="5 étapes · ≈ 30 min (setup compris, une seule fois) · Débutant"
          >
            Le cas magique : « le devis DEV-2026-012 est accepté, facture d&apos;acompte de
            30 % », et la facture sort, sans rien ressaisir. Le skill sait faire les quatre
            documents de la vraie vie : la facture classique, l&apos;acompte, le solde qui déduit
            tout seul, et l&apos;avoir quand il faut corriger. Et si tu ne fais pas de devis, il
            fait aussi tes factures de zéro.
          </ModuleOverviewIntro>

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
