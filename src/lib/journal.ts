export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  lead: string;
  read?: string;
  // La couche « journal » : ton regard d'aujourd'hui sur l'article.
  recul?: string;
  // Le corps de l'article, un paragraphe par entrée. Vide = pas encore écrit.
  body?: string[];
};

// Ordre du plus récent au plus ancien. Une entrée devient vivante dès qu'elle a
// un `body`. Tant que `body` est vide, elle s'affiche en « bientôt » (pas de lien mort).
export const entries: JournalEntry[] = [
  {
    slug: "poser-les-bases",
    date: "Sem. 12",
    title: "Comment j'ai posé les bases du fil rouge",
    lead:
      "Définir le public, la promesse et le parcours avant d'écrire une ligne. Pourquoi ce cadrage m'a évité de partir dans tous les sens.",
    read: "6 min",
  },
  {
    slug: "premier-site",
    date: "Sem. 10",
    title: "Mon premier site, du prompt à la mise en ligne",
    lead:
      "Le récit complet de mon tout premier site, celui sur les animés. Ce qui a marché du premier coup, et ce qui m'a fait galérer.",
    read: "9 min",
  },
  {
    slug: "mes-outils",
    date: "Sem. 08",
    title: "Les outils que j'utilise pour builder sans savoir coder",
    lead:
      "Ma stack du moment et pourquoi je l'ai choisie. Comment je parle à l'IA pour qu'elle produise ce que j'ai en tête.",
    read: "7 min",
  },
  {
    slug: "casser-reparer-mon-site",
    date: "Sem. 06",
    title: "Le jour où j'ai cassé mon site (et comment je l'ai réparé)",
    lead:
      "Un vrai blocage, la panique, puis la méthode pour s'en sortir avec l'IA sans tout comprendre du code.",
    read: "5 min",
  },
  {
    slug: "premieres-erreurs",
    date: "Sem. 04",
    title: "Mes premières erreurs de débutant, assumées",
    lead:
      "Les réflexes que je n'avais pas, les pièges où je suis tombé, et ce que je ferais différemment aujourd'hui.",
    read: "6 min",
  },
  {
    slug: "jour-zero",
    date: "Sem. 01",
    title: "J'arrive chez The Vibe Company, je n'ai jamais codé",
    lead:
      "Le point de départ. Pourquoi je me lance, ce que je vise, et à quoi ressemble le zéro absolu.",
    read: "4 min",
    // BROUILLON D'EXEMPLE, à remplacer par ton vrai texte et ta vraie note.
    recul:
      "Ce que je referais autrement ? Ne pas attendre de tout comprendre avant de me lancer. J'ai perdu mes premiers jours à vouloir saisir chaque mot technique. En vrai, on apprend en construisant, pas en lisant. Si je repartais de zéro, j'ouvrirais l'éditeur dès le premier jour.",
    body: [
      "Je suis arrivé chez The Vibe Company sans avoir jamais écrit une ligne de code. Zéro. Je savais utiliser un ordinateur, envoyer un mail, faire une présentation, rien de plus.",
      "L'idée du fil rouge était simple sur le papier : partir de mon niveau réel, construire de vrais produits avec l'IA, et tout documenter en public. Les réussites comme les galères.",
      "Les premiers jours, j'ai eu le réflexe de vouloir tout comprendre avant de toucher à quoi que ce soit. C'était une erreur. Chaque heure passée à lire de la documentation, c'était une heure où je ne construisais pas.",
      "Ce qui a débloqué la suite, c'est d'accepter de ne pas tout maîtriser et de demander à l'IA de m'accompagner pas à pas. Le jour où j'ai lancé ma première page dans mon navigateur, tout a changé.",
      "C'est là que ce journal commence. La suite, tu la lis ici, semaine après semaine.",
    ],
  },
];

export function getEntry(slug: string): JournalEntry | undefined {
  return entries.find((e) => e.slug === slug);
}

export const liveEntries = entries.filter((e) => e.body && e.body.length > 0);
export const upcomingEntries = entries.filter((e) => !e.body || e.body.length === 0);
