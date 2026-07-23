export type ModuleResource = {
  label: string;
  value: string;
  href: string;
};

export type ModuleResourceGroup = {
  label: string;
  items: ModuleResource[];
};

export type ModuleAfter = {
  href: string;
  title: string;
  description: string;
};

export type ModuleShellConfig = {
  facts: { label: string; value: string }[];
  resources: ModuleResourceGroup[];
  finishedHref: string;
  finishedLabel: string;
  after: ModuleAfter;
};

export const siteShell: ModuleShellConfig = {
  facts: [
    { label: "Livrable", value: "Un site en ligne, partageable" },
    { label: "Durée", value: "6 étapes · ≈ 3 à 4 h" },
    { label: "Budget", value: "Claude Pro, le reste gratuit pour débuter" },
  ],
  resources: [
    {
      label: "Avant de commencer",
      items: [
        {
          label: "Ce qu'il te faut",
          value: "Carte, email et une idée de site",
          href: "/module/0#ce-quil-te-faut",
        },
      ],
    },
    {
      label: "Boîte à outils",
      items: [
        { label: "Claude Code", value: "Étape 0", href: "/module/0" },
        { label: "GitHub", value: "Étape 2", href: "/module/2" },
        { label: "Supabase", value: "Étape 4", href: "/module/4" },
        { label: "Vercel", value: "Étape 5", href: "/module/5" },
      ],
    },
    {
      label: "Skills offerts",
      items: [
        {
          label: "Impeccable et Agent Browser",
          value: "Étape 3",
          href: "/module/3",
        },
      ],
    },
  ],
  finishedHref: "/juge",
  finishedLabel: "Fais évaluer ton site par le juge",
  after: {
    href: "/creer-un-skill",
    title: "Créer ton premier skill",
    description:
      "Ton premier produit est en ligne. Le module suivant t'apprend à fabriquer ton propre skill, un savoir-faire que l'IA pourra réutiliser sur tes prochains projets.",
  },
};

export const skillShell: ModuleShellConfig = {
  facts: [
    { label: "Livrable", value: "Un skill que Claude Code peut réutiliser" },
    { label: "Durée", value: "5 étapes · ≈ 1 h 40 à 2 h" },
    { label: "Outil", value: "Claude Code, plus deux skills offerts" },
  ],
  resources: [
    {
      label: "Avant de commencer",
      items: [
        {
          label: "Ce qu'il te faut",
          value: "Claude Code et une tâche répétée",
          href: "/creer-un-skill/0#ce-quil-te-faut",
        },
      ],
    },
    {
      label: "Boîte à outils",
      items: [{ label: "Claude Code", value: "Étape 0", href: "/creer-un-skill/0" }],
    },
    {
      label: "Skills offerts",
      items: [
        { label: "Skill Creator", value: "Étape 2", href: "/creer-un-skill/2" },
        { label: "Improve", value: "Étape 3", href: "/creer-un-skill/3" },
      ],
    },
  ],
  finishedHref: "/juge-skill",
  finishedLabel: "Fais évaluer ton skill par le juge",
  after: {
    href: "/automatiser-ton-travail",
    title: "Automatiser ton travail",
    description:
      "Tu sais maintenant fabriquer un savoir-faire réutilisable. Le module suivant t'apprend à déclencher le travail de l'IA automatiquement, sans avoir à lui redemander.",
  },
};

export const automationShell: ModuleShellConfig = {
  facts: [
    { label: "Livrable", value: "Des automatisations qui se déclenchent seules" },
    { label: "Durée", value: "5 étapes · ≈ 2 h à 2 h 45" },
    { label: "Outil", value: "Claude Code, rien de neuf à installer" },
  ],
  resources: [
    {
      label: "Avant de commencer",
      items: [
        {
          label: "Ce qu'il te faut",
          value: "Ton site, tes skills et Claude Code",
          href: "/automatiser-ton-travail/0#ce-quil-te-faut",
        },
      ],
    },
    {
      label: "Boîte à outils",
      items: [
        { label: "Claude Code", value: "Étape 0", href: "/automatiser-ton-travail/0" },
      ],
    },
  ],
  finishedHref: "/juge-automatisation",
  finishedLabel: "Fais évaluer ton automatisation par le juge",
  after: {
    href: "/parcours",
    title: "Choisir ton prochain produit",
    description:
      "Tu repars avec un produit en ligne, un skill à toi et des automatisations qui travaillent seules. Retourne au parcours pour choisir ce que tu veux construire ou automatiser ensuite.",
  },
};

export const quoteShell: ModuleShellConfig = {
  facts: [
    { label: "Livrable", value: "Tes devis conformes, en une phrase" },
    { label: "Durée", value: "5 étapes · ≈ 35 min" },
    { label: "Outil", value: "Claude Code et le skill offert" },
  ],
  resources: [
    {
      label: "Avant de commencer",
      items: [
        {
          label: "Ce qu'il te faut",
          value: "Claude Pro et tes informations d'entreprise",
          href: "/automatiser-tes-devis/0#ce-quil-te-faut",
        },
      ],
    },
    {
      label: "Boîte à outils",
      items: [
        { label: "Claude Code", value: "Étape 0", href: "/automatiser-tes-devis/0" },
      ],
    },
    {
      label: "Skill offert",
      items: [
        {
          label: "Générer un devis",
          value: "Étape 1",
          href: "/automatiser-tes-devis/1",
        },
      ],
    },
  ],
  finishedHref: "/automatiser-tes-factures",
  finishedLabel: "Enchaîne avec tes factures",
  after: {
    href: "/automatiser-tes-factures",
    title: "Automatise tes factures",
    description:
      "Quand un devis est accepté, le module suivant installe son compagnon. Il transforme le devis signé en facture d'acompte ou de solde sans ressaisie.",
  },
};

export const invoiceShell: ModuleShellConfig = {
  facts: [
    { label: "Livrable", value: "Tes factures conformes, en une phrase" },
    { label: "Durée", value: "5 étapes · ≈ 30 min" },
    { label: "Outil", value: "Claude Code et le skill offert" },
  ],
  resources: [
    {
      label: "Avant de commencer",
      items: [
        {
          label: "Ce qu'il te faut",
          value: "Claude Pro, tes informations et tes devis",
          href: "/automatiser-tes-factures/0#ce-quil-te-faut",
        },
      ],
    },
    {
      label: "Boîte à outils",
      items: [
        { label: "Claude Code", value: "Étape 0", href: "/automatiser-tes-factures/0" },
      ],
    },
    {
      label: "Skill offert",
      items: [
        {
          label: "Générer une facture",
          value: "Étape 1",
          href: "/automatiser-tes-factures/1",
        },
      ],
    },
  ],
  finishedHref: "/parcours",
  finishedLabel: "Retourne au parcours choisir la suite",
  after: {
    href: "/parcours",
    title: "Choisir la suite",
    description:
      "La compta, les mails ou l'agenda suivront le même principe. Retourne au parcours pour choisir ton prochain résultat ou apprendre à construire tes propres outils.",
  },
};
