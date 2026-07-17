"use client";

import ParcoursModuleCard from "@/components/ParcoursModuleCard";
import { etapesDetail } from "@/lib/module-faire-un-site";

// Carte compacte du module 01 pour la bibliothèque du parcours.
export default function ParcoursModule1({ onChooseModule }: { onChooseModule?: () => void }) {
  return (
    <ParcoursModuleCard
      moduleKey="/module"
      href="/module"
      etapes={etapesDetail}
      label="Module 01 · Produit"
      title="Faire un site"
      description="De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au passage."
      lead
      onChooseModule={onChooseModule}
    />
  );
}
