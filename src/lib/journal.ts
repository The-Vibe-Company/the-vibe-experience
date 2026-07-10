export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  lead: string;
  // L'article publié (Victor's Story sur thevibecompany.co).
  source?: string;
  // La couche « journal » : ton regard d'aujourd'hui sur l'article. À écrire par toi.
  recul?: string;
  // Le texte complet de l'article, hébergé sur TVE. Vide = on renvoie vers `source`.
  body?: string[];
};

// Du plus récent au plus ancien. Les entrées reprennent les vrais articles de
// Victor's Story. Tant que `body` est vide, l'entrée mène à l'article publié
// (`source`) ; dès que tu colles le texte, il s'affiche directement sur TVE.
export const entries: JournalEntry[] = [
  {
    slug: "comment-j-ecris-ces-articles",
    date: "9 juil.",
    title: "Je veux que mes relecteurs n'aient plus rien à corriger",
    lead:
      "Quatre articles par semaine sur mon apprentissage avec l'IA, et l'idée un peu folle d'une relecture par l'IA aussi exigeante que celle de mes relecteurs.",
    source: "https://www.thevibecompany.co/resources/articles/comment-j-ecris-ces-articles",
  },
  {
    slug: "focus-skill-logo-svg",
    date: "7 juil.",
    title: "Comment créer un logo épuré avec l'IA",
    lead:
      "Fabriquer un skill qui génère des logos simples et nets, en extrayant le principe d'un logo réussi plutôt qu'en copiant sa forme.",
    source: "https://www.thevibecompany.co/resources/articles/focus-skill-logo-svg",
  },
  {
    slug: "l-outil-qui-me-fait-gagner-du-temps",
    date: "6 juil.",
    title: "L'outil qui me fait vraiment gagner du temps : Superwhisper",
    lead:
      "Mon vrai gain de temps, c'est la dictée vocale. Et parler à l'IA au lieu de tout taper donne souvent de meilleurs résultats.",
    source: "https://www.thevibecompany.co/resources/articles/l-outil-qui-me-fait-gagner-du-temps",
  },
  {
    slug: "mon-travail-se-documente-tout-seul",
    date: "3 juil.",
    title: "Comment mon travail se documente tout seul",
    lead:
      "Un système qui documente mon travail à ma place, en captant les décisions au fil des conversations, sans effort manuel.",
    source: "https://www.thevibecompany.co/resources/articles/mon-travail-se-documente-tout-seul",
  },
  {
    slug: "veille-ia-automatique",
    date: "2 juil.",
    title: "J'ai monté une veille qui suit l'actu IA à ma place",
    lead:
      "Monter une veille automatique qui suit l'actualité de l'IA, filtre le bruit et me remonte ce qui compte vraiment.",
    source: "https://www.thevibecompany.co/resources/articles/veille-ia-automatique",
  },
  {
    slug: "focus-skill-images",
    date: "1er juil.",
    title: "Comment on a généré des visuels consistants grâce aux skills",
    lead:
      "Garder une direction visuelle cohérente et générer des images sans savoir dessiner ni coder, grâce aux skills.",
    source: "https://www.thevibecompany.co/resources/articles/focus-skill-images",
  },
];

export function getEntry(slug: string): JournalEntry | undefined {
  return entries.find((e) => e.slug === slug);
}

// Une entrée est « lisible » dès qu'elle a un article : soit hébergé (`body`),
// soit publié ailleurs (`source`).
export const liveEntries = entries.filter(
  (e) => (e.body && e.body.length > 0) || e.source,
);
