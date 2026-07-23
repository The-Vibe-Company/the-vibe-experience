import Link from "next/link";
import { etapesDetailDevis } from "@/lib/module-devis";
import ModuleRail from "@/components/ModuleRail";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import { ModuleOverviewIntro } from "@/components/ModuleIntro";
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

        <div className="ecol">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Automatise tes devis</span>
          </div>

          <ModuleOverviewIntro
            eyebrow="Module · Résultat · En écriture"
            title={<>Automatise tes devis, <em>une phrase, un devis conforme</em>.</>}
            meta="5 étapes · ≈ 35 min (dont 10 de setup, une seule fois) · Débutant"
          >
            Tu dis « devis pour Madame Martin, remplacement du chauffe-eau, 980 euros », et tu
            obtiens un devis professionnel conforme au droit français, numéroté, prêt à imprimer
            en PDF. Ici, tu n&apos;apprends pas à construire : tu installes un skill prêt à
            l&apos;emploi et tu repars avec tes devis en 2 à 3 minutes au lieu de 20 à
            40 à bricoler un vieux fichier Word.
          </ModuleOverviewIntro>

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
        </div>
      </div>
    </section>
  );
}
