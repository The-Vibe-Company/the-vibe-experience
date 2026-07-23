export type Branche = "construire" | "automatiser";

export type QuizOption = {
  value: string;
  label: string;
  lean?: Branche; // phase 1 : vers quelle branche cette réponse penche
  points?: number; // phase 2 : niveau
};

export type QuizQuestion = {
  id: string;
  role: string;
  question: string;
  hint?: string;
  options: QuizOption[];
};

// PHASE 1 — 3 questions mélangées. Le classement se fait sur l'ensemble des
// réponses (majorité), jamais sur une seule : si on se trompe sur une, ce n'est
// pas grave.
export const branchQuestions: QuizQuestion[] = [
  {
    id: "envie",
    role: "Ton envie",
    question: "Qu'est-ce que tu as le plus envie de faire ?",
    options: [
      { value: "produit", label: "Créer mon propre produit, comme un site, une app ou un jeu", lean: "construire" },
      { value: "competence", label: "Monter en compétence avec l'IA et ses outils", lean: "construire" },
      { value: "taches", label: "Automatiser des tâches précises qui me prennent du temps, comme les devis, la compta ou les mails", lean: "automatiser" },
      { value: "temps", label: "Gagner du temps sur mon travail", lean: "automatiser" },
    ],
  },
  {
    id: "facon",
    role: "Ta façon",
    question: "Tu préfères :",
    options: [
      { value: "comprendre", label: "Prendre le temps de comprendre comment ça marche, pour être vraiment autonome", lean: "construire" },
      { value: "resultat", label: "Aller droit au résultat, en comprenant juste ce qu'il faut pour que ça tourne", lean: "automatiser" },
    ],
  },
  {
    id: "vision",
    role: "L'IA pour toi",
    question: "L'IA, pour toi, ce serait plutôt :",
    options: [
      { value: "maitriser", label: "Un truc à apprendre et à maîtriser", lean: "construire" },
      { value: "executant", label: "Un exécutant qui te débarrasse des corvées", lean: "automatiser" },
    ],
  },
];

// PHASE 2 — question de base, partagée par les deux branches.
export const baseQuestion: QuizQuestion = {
  id: "base",
  role: "Tes bases",
  question: "Tes connaissances de base avec l'IA et les skills ?",
  options: [
    { value: "zero", label: "Je débute complètement, je ne sais même pas ce qu'est un skill", points: 0 },
    { value: "utilise", label: "J'utilise déjà l'IA, mais je n'ai jamais rien construit ni automatisé", points: 1 },
    { value: "alaise", label: "Je suis à l'aise, j'utilise déjà des skills ou j'ai mis des trucs en place", points: 3 },
  ],
};

// PHASE 2 — spécifique à la branche « construire ».
export const construireQuestions: QuizQuestion[] = [
  {
    id: "projet",
    role: "Ton projet",
    question: "Qu'est-ce que tu veux créer en premier ?",
    options: [
      { value: "site", label: "Un site" },
      { value: "app", label: "Une app avec de vraies fonctionnalités" },
      { value: "jeu", label: "Un jeu" },
      { value: "da", label: "Une identité visuelle, une mascotte" },
      { value: "indecis", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "enligne",
    role: "Ton expérience",
    question: "As-tu déjà mis un site ou une app en ligne ?",
    options: [
      { value: "jamais", label: "Jamais, je pars de zéro", points: 0 },
      { value: "guide", label: "Une fois, en étant guidé", points: 1 },
      { value: "seul", label: "Quelques fois, par moi-même", points: 2 },
      { value: "souvent", label: "Oui, souvent, je suis à l'aise", points: 3 },
    ],
  },
];

// PHASE 2 — spécifique à la branche « automatiser ».
export const automatiserQuestions: QuizQuestion[] = [
  {
    id: "tache",
    role: "Ta tâche",
    question: "Quelle tâche te fait perdre le plus de temps ?",
    options: [
      { value: "devis", label: "Mes devis" },
      { value: "factures", label: "Mes factures" },
      { value: "compta", label: "Ma compta" },
      { value: "mails", label: "Mes mails" },
      { value: "agenda", label: "Mon agenda" },
      { value: "autre", label: "Autre chose" },
    ],
  },
];

export type Answers = Record<string, string>;
export type Niveau = "Néophyte" | "Débutant" | "Intermédiaire";

function optPts(q: QuizQuestion, val: string | undefined): number {
  return q.options.find((o) => o.value === val)?.points ?? 0;
}

export function computeBranche(answers: Answers): Branche {
  let c = 0;
  let a = 0;
  for (const q of branchQuestions) {
    const lean = q.options.find((o) => o.value === answers[q.id])?.lean;
    if (lean === "construire") c++;
    else if (lean === "automatiser") a++;
  }
  return a > c ? "automatiser" : "construire";
}

// La liste des questions à poser, selon l'avancée. Tant que la phase 1 n'est pas
// finie, on ne connaît pas la branche, donc on ne montre que les 3 premières.
export function questionFlow(answers: Answers): QuizQuestion[] {
  const phase1Done = branchQuestions.every((q) => answers[q.id]);
  if (!phase1Done) return branchQuestions;
  const branche = computeBranche(answers);
  const extras = branche === "automatiser" ? automatiserQuestions : construireQuestions;
  return [...branchQuestions, baseQuestion, ...extras];
}

const projetLabels: Record<string, string> = {
  site: "un site",
  app: "une app",
  jeu: "un jeu",
  da: "une identité visuelle",
  indecis: "ton projet",
};
const tacheLabels: Record<string, string> = {
  devis: "tes devis",
  factures: "tes factures",
  compta: "ta compta",
  mails: "tes mails",
  agenda: "ton agenda",
  autre: "ta tâche",
};

export type Reco = {
  branche: Branche;
  niveau: Niveau;
  cible: string; // « un site » ou « tes devis »
  hero: {
    famille: string;
    titre: string;
    note: string;
    cta: { label: string; href: string } | null; // null = module en préparation
    enPreparation: boolean;
  };
  autre: { famille: string; teaser: string };
};

export function computeReco(answers: Answers): Reco {
  const branche = computeBranche(answers);
  const basePts = optPts(baseQuestion, answers["base"]);

  if (branche === "automatiser") {
    const tache = answers["tache"] ?? "autre";
    const cible = tacheLabels[tache] ?? tacheLabels.autre;
    const niveau: Niveau = basePts >= 3 ? "Intermédiaire" : basePts >= 1 ? "Débutant" : "Néophyte";

    // Les modules devis et factures existent : on envoie directement dessus.
    // Les autres tâches (compta, mails, agenda) sont encore à venir.
    const modulesPrets: Record<string, { titre: string; href: string }> = {
      devis: { titre: "Automatise tes devis", href: "/automatiser-tes-devis" },
      factures: { titre: "Automatise tes factures", href: "/automatiser-tes-factures" },
    };
    const pret = modulesPrets[tache];

    const note = pret
      ? `Le module est prêt : tu installes un skill qui fait le travail, et tu repars avec ${cible} en une phrase. ` +
        (basePts === 0
          ? "Tu débutes ? Il commence par la mise en place, pas à pas."
          : "Tu as déjà les bases, la mise en place te prendra quelques minutes.")
      : `On prépare un module pour automatiser ${cible}. ` +
        (basePts === 0
          ? "Comme tu débutes, il commencera par les bases : c'est quoi un skill, comment s'en servir."
          : "Tu as déjà les bases, tu iras droit au but.");

    return {
      branche,
      niveau,
      cible,
      hero: {
        famille: "Automatise ton business",
        titre: pret ? pret.titre : `Automatiser ${cible}`,
        note,
        cta: pret ? { label: `Ouvrir « ${pret.titre} »`, href: pret.href } : null,
        enPreparation: !pret,
      },
      autre: {
        famille: "Apprendre à construire",
        teaser:
          "Envie de fabriquer tes propres produits ? Tu peux aussi apprendre à construire un site ou tes propres skills.",
      },
    };
  }

  // Branche « construire »
  const enlignePts = optPts(construireQuestions[1], answers["enligne"]);
  const score = basePts + enlignePts;
  let niveau: Niveau = score <= 1 ? "Néophyte" : score <= 3 ? "Débutant" : "Intermédiaire";
  // Garde-fou : si tu débutes complètement, jamais au-dessus de Débutant.
  if (basePts === 0 && niveau === "Intermédiaire") niveau = "Débutant";

  const projet = answers["projet"] ?? "indecis";
  const cible = projetLabels[projet] ?? projetLabels.indecis;

  let note: string;
  if (niveau === "Intermédiaire") {
    note = "Tu peux survoler les premières étapes et avancer plus vite.";
  } else if (niveau === "Débutant") {
    note = "On démarre au début, mais tu accélères vite sur les toutes premières bases.";
  } else {
    note = "On démarre tranquillement au tout début, pas à pas, rien d'intimidant.";
  }
  if (projet !== "site" && projet !== "indecis") {
    note += ` C'est le socle qui te servira pour ${cible}.`;
  }

  return {
    branche,
    niveau,
    cible,
    hero: {
      famille: "Apprendre à construire",
      titre: "Faire un site",
      note,
      cta: { label: "Ouvrir « Faire un site »", href: "/module" },
      enPreparation: false,
    },
    autre: {
      famille: "Automatise ton business",
      teaser:
        "Tu as aussi des tâches qui te font perdre du temps ? Les modules devis et factures sont déjà là. Ceux sur la compta et les mails arrivent.",
    },
  };
}
