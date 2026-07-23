import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import ModuleSidePanel from "@/components/ModuleSidePanel";
import { ModuleOverviewIntro } from "@/components/ModuleIntro";
import MarkSelectedPath from "@/components/MarkSelectedPath";
import { siteOverview } from "@/lib/module-overview-config";

export const metadata = { title: "Module · Faire un site — The Vibe Experience" };

export default function Module() {
  const cards = etapesDetail.map((e) => ({
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
      <MarkSelectedPath path="construire" />
      <div className="etape-shell module-overview-shell">
        <ModuleRail etapes={etapesDetail} currentSlug="" basePath="/module" moduleLabel="Faire un site" />

        <div className="ecol module-overview-main">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Faire un site</span>
          </div>

          <ModuleOverviewIntro
            eyebrow="Module · Produit"
            title={<>Faire un site, <em>de ton idée à en ligne</em>.</>}
            meta="6 étapes · ≈ 3 à 4 h de travail, souvent en plusieurs fois · Débutant"
          >
            Le module fondateur : tu construis TON site, du premier écran en local jusqu&apos;à la
            mise en ligne, en apprenant les vrais outils au passage.
          </ModuleOverviewIntro>

          <ModuleProgress
            moduleKey="/module"
            basePath="/module"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/module" basePath="/module" etapes={cards} />
        </div>

        <ModuleSidePanel
          moduleKey="/module"
          basePath="/module"
          etapes={cards}
          facts={siteOverview.facts}
          finishedHref={siteOverview.finishedHref}
          finishedLabel={siteOverview.finishedLabel}
        />
      </div>
    </section>
  );
}
