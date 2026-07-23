type ToolCost = "gratuit" | "gratuit-debut" | "payant";

export type ModuleOverviewConfig = {
  facts: { label: string; value: string }[];
  intro: string;
  tools: {
    name: string;
    description: string;
    cost: ToolCost;
    href?: string;
  }[];
  finishedHref: string;
  finishedLabel: string;
};

export const siteOverview: ModuleOverviewConfig = {
  facts: [
    { label: "Livrable", value: "Un site en ligne, partageable" },
    { label: "Durée", value: "3 à 4 h, souvent en plusieurs fois" },
    { label: "Budget", value: "Claude Pro (~20 €/mois), le reste gratuit" },
  ],
  intro:
    "Pour commencer, il te faut surtout Claude Pro, environ 20 €/mois. GitHub, Vercel et le reste sont gratuits pour débuter.",
  tools: [
    {
      name: "Claude Code",
      description: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code pour toi.",
      cost: "payant",
      href: "https://claude.com/claude-code",
    },
    {
      name: "Homebrew",
      description: "L'installateur du terminal. Une commande pour installer ce qu'il te faut.",
      cost: "gratuit",
      href: "https://brew.sh",
    },
    {
      name: "GitHub",
      description: "Le coffre-fort de ton code. Il sauvegarde ton projet et son historique.",
      cost: "gratuit-debut",
      href: "https://github.com",
    },
    {
      name: "Vercel",
      description: "L'hébergeur. Il met ton site en ligne en un clic.",
      cost: "gratuit-debut",
      href: "https://vercel.com",
    },
    {
      name: "SuperWhisper (option)",
      description: "Pour parler à l'IA au lieu de tout taper.",
      cost: "payant",
      href: "https://superwhisper.com",
    },
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
  intro: "Rien de neuf à installer : tu réutilises l'outil de ton premier projet.",
  tools: [
    {
      name: "Claude Code",
      description: "Le seul outil du module. Tu l'as déjà depuis ton premier projet.",
      cost: "payant",
    },
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
  intro: "Rien de neuf à installer : tes automatisations vivent dans l'outil que tu as déjà.",
  tools: [
    {
      name: "Claude Code",
      description: "Tes automatisations vivent dedans : il les installe, les liste et les retire.",
      cost: "payant",
    },
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
  intro: "Un outil payant, un skill offert. Aucun logiciel de devis, aucun abonnement en plus.",
  tools: [
    {
      name: "Claude Code",
      description: "L'app où vit le skill. L'abonnement Pro suffit.",
      cost: "payant",
    },
    {
      name: "Générer un devis",
      description: "Notre skill avec les mentions légales à jour, vérifiées sur les sources officielles.",
      cost: "gratuit",
    },
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
  intro:
    "Un outil payant, un skill offert. Aucun logiciel de facturation, aucun abonnement en plus.",
  tools: [
    {
      name: "Claude Code",
      description: "L'app où vit le skill. L'abonnement Pro suffit.",
      cost: "payant",
    },
    {
      name: "Générer une facture",
      description: "Le compagnon du skill devis : configuration partagée et zéro ressaisie.",
      cost: "gratuit",
    },
  ],
  finishedHref: "/parcours",
  finishedLabel: "Retourne au parcours choisir la suite",
};
