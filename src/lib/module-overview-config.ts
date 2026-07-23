export type ModuleOverviewConfig = {
  facts: { label: string; value: string }[];
  finishedHref: string;
  finishedLabel: string;
};

export const siteOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Un site en ligne, partageable" },
    { label: "Durée", value: "3 à 4 h, souvent en plusieurs fois" },
    { label: "Budget", value: "Claude Pro (~20 €/mois), le reste gratuit" },
  ],
  finishedHref: "/juge",
  finishedLabel: "Fais évaluer ton site par le juge",
};

export const skillOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Un skill que Claude Code peut réutiliser" },
    { label: "Durée", value: "1 h 40 à 2 h" },
    { label: "Outil", value: "Claude Code, rien de neuf à installer" },
  ],
  finishedHref: "/juge-skill",
  finishedLabel: "Fais évaluer ton skill par le juge",
};

export const automationOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Des automatisations qui se déclenchent seules" },
    { label: "Durée", value: "2 h à 2 h 45" },
    { label: "Outil", value: "Claude Code, rien de neuf à installer" },
  ],
  finishedHref: "/juge-automatisation",
  finishedLabel: "Fais évaluer ton automatisation par le juge",
};

export const quoteOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Tes devis conformes, en une phrase" },
    { label: "Durée", value: "Environ 35 min" },
    { label: "Outil", value: "Claude Code et le skill offert" },
  ],
  finishedHref: "/automatiser-tes-factures",
  finishedLabel: "Enchaîne avec tes factures",
};

export const invoiceOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Tes factures conformes, en une phrase" },
    { label: "Durée", value: "Environ 30 min" },
    { label: "Outil", value: "Claude Code et le skill offert" },
  ],
  finishedHref: "/parcours",
  finishedLabel: "Retourne au parcours choisir la suite",
};
