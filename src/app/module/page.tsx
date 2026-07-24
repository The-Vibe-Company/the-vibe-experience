import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleEtapes from "@/components/ModuleEtapes";
import MarkSelectedPath from "@/components/MarkSelectedPath";

export const metadata = { title: "Module · Faire un site | The Vibe Experience" };

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
      <div className="module-overview-shell">
        <div className="module-overview">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Parcours</Link>
            <span className="sep">/</span>
            <span>Faire un site</span>
          </div>

          <div className="label" style={{ marginTop: "1.1rem" }}>
            Module · Produit
          </div>
          <h1 className="mov-h1">
            Faire un site, <em>de ton idée à sa mise en ligne</em>.
          </h1>
          <p className="mov-meta">6 étapes, 3 à 4 h, niveau débutant.</p>
          <p className="etape-obj">
            Tu construis ton propre site, du premier écran sur ta machine jusqu&apos;à sa mise en
            ligne. Tu découvres les outils au moment où tu en as besoin, avec un accompagnement pas
            à pas.
          </p>

          <ModuleProgress
            moduleKey="/module"
            basePath="/module"
            etapes={cards.map((c) => ({ slug: c.slug, num: c.num, titre: c.titre, sousCount: c.sousCount }))}
            completionHref="/juge"
            completionLabel="Faire évaluer mon site"
          />

          <div className="label mov-sec">Les étapes</div>
          <ModuleEtapes moduleKey="/module" basePath="/module" etapes={cards} />
        </div>
      </div>
    </section>
  );
}
