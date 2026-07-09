export type QuizOption = {
  value: string;
  label: string;
  points?: number; // seulement pour les questions de niveau
};

export type QuizQuestion = {
  id: string;
  role: string; // petit tag affiché (Motivation, Rythme…)
  question: string;
  hint?: string;
  options: QuizOption[];
};

// Ordre validé : envie et intention d'abord, technique ensuite.
export const questions: QuizQuestion[] = [
  {
    id: "motivation",
    role: "Motivation",
    question: "C'est pour quoi, avant tout ?",
    options: [
      { value: "pro", label: "Pour mon activité pro" },
      { value: "passion", label: "Un projet perso, une passion" },
      { value: "montee", label: "Monter en compétence pour le travail" },
      { value: "curiosite", label: "Tester par curiosité" },
    ],
  },
  {
    id: "rythme",
    role: "Rythme",
    question: "Combien de temps tu peux y consacrer ?",
    options: [
      { value: "ponctuel", label: "Quelques heures, une fois" },
      { value: "hebdo", label: "Un créneau régulier chaque semaine" },
      { value: "intensif", label: "À fond, tous les jours" },
    ],
  },
  {
    id: "projet",
    role: "Ton projet",
    question: "Qu'est-ce que tu as le plus envie de créer en premier ?",
    options: [
      { value: "site", label: "Un site (vitrine, perso, une idée qui me tient à cœur)" },
      { value: "app", label: "Une app avec de vraies fonctionnalités" },
      { value: "jeu", label: "Un jeu" },
      { value: "da", label: "Une identité visuelle / une mascotte" },
      { value: "indecis", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "autoeval",
    role: "Auto-évaluation",
    question: "Comment tu te situes, toi ?",
    options: [
      { value: "neophyte", label: "Complètement néophyte, je n'ai jamais touché à ça", points: 0 },
      { value: "debutant", label: "Débutant, j'ai bricolé un peu", points: 2 },
      { value: "intermediaire", label: "Intermédiaire, je me débrouille", points: 3 },
    ],
  },
  {
    id: "enligne",
    role: "Niveau",
    question: "As-tu déjà mis un site ou une app en ligne ?",
    options: [
      { value: "jamais", label: "Jamais, je pars vraiment de zéro", points: 0 },
      { value: "guide", label: "Une fois, mais en étant guidé pas à pas", points: 1 },
      { value: "seul", label: "Oui, quelques fois par moi-même", points: 2 },
      { value: "code", label: "J'ai déjà des bases en code", points: 3 },
    ],
  },
  {
    id: "terminal",
    role: "Niveau",
    question: "Le terminal et GitHub, ça te parle ?",
    options: [
      { value: "cestquoi", label: "C'est quoi ?", points: 0 },
      { value: "entendu", label: "J'en ai entendu parler, sans m'en servir", points: 1 },
      { value: "unpeu", label: "Je m'en sers un peu", points: 2 },
      { value: "alaise", label: "Je suis à l'aise avec", points: 3 },
    ],
  },
  {
    id: "skills",
    role: "Les skills",
    question: "Les skills, où tu en es ?",
    hint: "Un skill, c'est une compétence qu'on donne à l'IA pour qu'elle fasse mieux une tâche.",
    options: [
      { value: "inconnu", label: "Je ne sais pas ce que c'est" },
      { value: "entendu", label: "J'en ai entendu parler" },
      { value: "utilise", label: "J'utilise des skills tout faits" },
      { value: "cree", label: "J'ai déjà créé les miens" },
    ],
  },
];

export type Answers = Record<string, string>;

export type Niveau = "Néophyte" | "Débutant" | "Intermédiaire";

export type Reco = {
  niveau: Niveau;
  score: number;
  gardeFou: boolean; // le garde-fou terminal a joué
  projetLabel: string;
  moduleDepart: { titre: string; href: string; note: string };
  skills: string;
  rythme: string;
  ton: string;
};

function pts(answers: Answers, id: string): number {
  const q = questions.find((x) => x.id === id);
  const opt = q?.options.find((o) => o.value === answers[id]);
  return opt?.points ?? 0;
}

const projetLabels: Record<string, string> = {
  site: "un site",
  app: "une app",
  jeu: "un jeu",
  da: "une identité visuelle / une mascotte",
  indecis: "ton projet (à préciser en cours de route)",
};

export function computeReco(answers: Answers): Reco {
  const score = pts(answers, "autoeval") + pts(answers, "enligne") + pts(answers, "terminal");

  let niveau: Niveau = score <= 2 ? "Néophyte" : score <= 5 ? "Débutant" : "Intermédiaire";

  // Garde-fou : jamais au-dessus de Débutant si le terminal est totalement inconnu.
  const gardeFou = answers["terminal"] === "cestquoi" && niveau === "Intermédiaire";
  if (gardeFou) niveau = "Débutant";

  // Module de départ : tout le monde passe par « Faire un site », le module fondateur.
  const projet = answers["projet"] ?? "indecis";
  const projetLabel = projetLabels[projet] ?? projetLabels.indecis;

  let moduleNote: string;
  if (niveau === "Intermédiaire") {
    moduleNote =
      "Tu peux survoler les premières étapes et avancer plus vite. Tous les modules restent accessibles si tu veux revenir en arrière.";
  } else if (niveau === "Débutant") {
    moduleNote = "On démarre au début, mais tu pourras accélérer sur les toutes premières bases.";
  } else {
    moduleNote = "On démarre tranquillement au tout début, pas à pas, rien d'intimidant.";
  }
  if (projet !== "site" && projet !== "indecis") {
    moduleNote += ` C'est le socle qui te servira pour ${projetLabel}.`;
  }

  const moduleDepart = {
    titre: "Faire un site",
    href: "/module",
    note: moduleNote,
  };

  // Module skills (question hors niveau)
  const skillsAns = answers["skills"];
  let skills: string;
  if (skillsAns === "cree") {
    skills = "Tu crées déjà tes skills : tu pourras survoler le module « Créer un skill ».";
  } else if (skillsAns === "utilise") {
    skills = "Tu utilises déjà des skills : le module « Créer un skill » te fera passer au niveau au-dessus, tu iras vite.";
  } else {
    skills = "On te conseille le module « Créer un skill » : c'est un vrai déclic, et il n'est pas encore acquis pour toi.";
  }

  const rythmeLabels: Record<string, string> = {
    ponctuel: "à ton rythme, par sessions courtes",
    hebdo: "un créneau régulier chaque semaine",
    intensif: "en intensif, tous les jours",
  };
  const tonLabels: Record<string, string> = {
    pro: "orienté ton activité pro",
    passion: "autour de ta passion",
    montee: "pour monter en compétence",
    curiosite: "en mode découverte",
  };

  return {
    niveau,
    score,
    gardeFou,
    projetLabel,
    moduleDepart,
    skills,
    rythme: rythmeLabels[answers["rythme"]] ?? rythmeLabels.ponctuel,
    ton: tonLabels[answers["motivation"]] ?? tonLabels.curiosite,
  };
}
