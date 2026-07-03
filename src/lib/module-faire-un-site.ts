export type SousEtape = {
  titre: string;
  cestquoi?: string;
  attendu?: string;
  exemples?: string[];
  prompt?: string;
  monExemple?: string;
  conseil?: string;
};

export type EtapeDetail = {
  slug: string;
  num: string;
  titre: string;
  tag: [string, string];
  dur: string;
  obj: string;
  detailPret: boolean;
  sous: SousEtape[];
  livrable: string;
  reussite: string;
};

export const etapesDetail: EtapeDetail[] = [
  {
    slug: "1",
    num: "1",
    titre: "Ton idée devient une page",
    tag: ["Build", "t-build"],
    dur: "≈ 45 min · en local",
    obj: "Passer de ton idée à une vraie page qui tourne sur ta machine. On reste simple, l'objectif c'est juste de voir quelque chose apparaître.",
    detailPret: true,
    sous: [
      {
        titre: "Trouve ton sujet, et garde-le simple.",
        cestquoi:
          "Ton sujet, c'est ce dont parle ton site. Ça peut être ton activité, une passion, une idée que tu as en tête depuis longtemps.",
        attendu:
          "Une idée claire, résumable en une phrase, et assez petite pour être faisable vite. On ne cherche pas le projet parfait, on cherche un premier truc concret pour se lancer.",
        exemples: [
          "Un site pour présenter ton activité (menuisier, coach, photographe…).",
          "Une page pour ton groupe de musique ou ton association.",
          "Un site qui liste tes films, animés ou recettes préférés.",
        ],
        monExemple:
          "Mon tout premier site, c'était une liste de mes animés préférés. Rien de compliqué, juste un sujet qui me plaisait, et ça a suffi pour me lancer.",
        conseil: "Choisis un truc qui te plaît vraiment : tu auras plus envie d'aller au bout.",
      },
      {
        titre: "Explique ta page à l'IA en une phrase.",
        cestquoi:
          "Tu décris à l'IA ce que tu veux voir, en langage normal, comme si tu parlais à quelqu'un. Aucun vocabulaire technique nécessaire.",
        attendu:
          "Une consigne simple qui dit ce que la page doit contenir : un titre, une ou deux sections, un bouton. Pas plus pour l'instant.",
        exemples: [
          "« Crée une page d'accueil pour mon site de menuiserie, avec un grand titre, une phrase de présentation et un bouton Contact. »",
        ],
        prompt: "Crée une page d'accueil pour [ton sujet], avec un grand titre, un sous-titre et un bouton.",
        monExemple:
          "Moi j'ai écrit quelque chose comme « fais-moi une page qui liste mes animés préférés avec une image pour chacun ». L'IA a fait le reste.",
        conseil: "Reste simple sur la première demande. Tu enrichiras après, petit à petit.",
      },
      {
        titre: "Regarde-la tourner en local, dans ton navigateur.",
        cestquoi:
          "« En local », ça veut dire sur ta machine à toi, avant toute mise en ligne. Tu lances le projet et tu l'ouvres dans ton navigateur comme un site normal.",
        attendu: "Voir ta page s'afficher pour de vrai, même si elle est encore brute et pas jolie.",
        exemples: ["Une adresse du type localhost:3000 qui s'ouvre dans ton navigateur et montre ta page."],
        monExemple:
          "La première fois que ma page s'est affichée, même moche, ça m'a fait un déclic : « c'est moi qui ai fait ça ».",
        conseil: "Ne t'inquiète pas si c'est brut, c'est normal. On l'améliore juste après.",
      },
      {
        titre: "Ajuste par petites touches, une demande à la fois.",
        cestquoi: "Tu demandes à l'IA de changer des choses une par une : un texte, une couleur, la taille du titre.",
        attendu: "Une page qui se rapproche de ce que tu veux, à force de petites demandes successives.",
        exemples: [
          "« Mets le titre plus gros. »",
          "« Change la couleur du bouton en orange. »",
          "« Remplace le texte d'accueil par… »",
        ],
        monExemple:
          "J'y suis allé pas à pas : d'abord les textes, puis les couleurs, puis la mise en page. Une demande à la fois, ça évite de tout casser.",
        conseil: "Une seule demande à la fois. Si tu changes dix trucs d'un coup, tu ne sais plus ce qui a marché.",
      },
    ],
    livrable: "Une page qui tourne en local.",
    reussite: "Elle s'affiche avec un titre et un bouton.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Pose ton projet sur GitHub",
    tag: ["Build", "t-build"],
    dur: "≈ 1 h · en local",
    obj: "Sauvegarder ton code et l'automatiser, pour ne plus jamais perdre ton travail.",
    detailPret: false,
    sous: [
      { titre: "Installe ce qu'il te manque via le terminal (on t'accompagne)." },
      { titre: "Connecte GitHub pour sauvegarder ton code." },
      { titre: "Automatise : branche Claude à GitHub pour qu'il pousse tes modifs tout seul." },
    ],
    livrable: "Ton projet sauvegardé sur GitHub, en automatique.",
    reussite: "Tes changements se sauvegardent sans que tu y penses.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Rends ton site à ton image",
    tag: ["Build", "t-build"],
    dur: "≈ 1 h 30 · en local",
    obj: "Fais que ton site te ressemble et te plaise, et rends-le propre. Plusieurs pages = optionnel.",
    detailPret: false,
    sous: [
      { titre: "Travaille l'apparence : couleurs, style, ton, ta DA." },
      { titre: "Si tu veux, ajoute des pages et un menu." },
      { titre: "Soigne le design avec Impeccable." },
      { titre: "Teste avec Agent Browser et corrige ce qu'il remonte." },
    ],
    livrable: "Un site à ton image, propre, en local.",
    reussite: "Le rendu est propre, les boutons et liens marchent, mobile et desktop.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Ajoute une ou plusieurs fonctionnalités",
    tag: ["Produit", "t-product"],
    dur: "≈ 1 h 30 à 2 h · en local",
    obj: "Donne des super-pouvoirs à ton site. Une seule fonctionnalité ou plusieurs, on ne limite pas.",
    detailPret: false,
    sous: [
      { titre: "Choisis ta ou tes fonctionnalités (comptes, multilingue, formulaire…)." },
      { titre: "Implémente-la avec l'IA, qui t'accompagne." },
      { titre: "Teste de bout en bout." },
    ],
    livrable: "La ou les fonctionnalité(s) qui marchent, en local.",
    reussite: "Chaque fonctionnalité choisie fonctionne.",
  },
  {
    slug: "5",
    num: "5",
    titre: "Mets-le en ligne et partage",
    tag: ["Ship", "t-ship"],
    dur: "≈ 1 h",
    obj: "Rends ton site officiel. C'est ici que le juge valide ton travail.",
    detailPret: false,
    sous: [
      { titre: "Connecte Vercel et déploie." },
      { titre: "En option, ajoute un nom de domaine." },
      { titre: "Vérifie le mobile et la vitesse." },
      { titre: "Le juge visite ton site et coche la checklist ; il te renvoie à l'étape à reprendre si besoin." },
      { titre: "Partage ton lien." },
    ],
    livrable: "Ton site en ligne, partagé.",
    reussite: "Le juge valide toute la checklist du module.",
  },
];
