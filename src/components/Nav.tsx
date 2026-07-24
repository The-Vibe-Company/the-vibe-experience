import NavClient from "@/components/NavClient";
import type { ProgressCatalog } from "@/components/ContinueLearningLink";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import { etapesDetailDevis } from "@/lib/module-devis";
import { etapesDetailFacture } from "@/lib/module-facture";

export default function Nav() {
  const entries = {
    "/module": etapesDetail,
    "/creer-un-skill": etapesDetailSkill,
    "/automatiser-ton-travail": etapesDetailAutomatisation,
    "/automatiser-tes-devis": etapesDetailDevis,
    "/automatiser-tes-factures": etapesDetailFacture,
  };
  const modules: ProgressCatalog = Object.fromEntries(
    Object.entries(entries).map(([moduleKey, etapes]) => [
      moduleKey,
      etapes.map(({ slug, num, titre, sous }) => ({
        slug,
        num,
        titre,
        sousCount: sous.length,
      })),
    ]),
  );

  return <NavClient modules={modules} />;
}
