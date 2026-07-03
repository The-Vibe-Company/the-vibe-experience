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
    detailPret: true,
    sous: [
      {
        titre: "Installe ce qu'il te manque via le terminal (on t'accompagne).",
        cestquoi:
          "Le terminal, c'est la fenêtre où tu tapes des commandes pour installer des outils. Homebrew, c'est l'assistant qui installe ces outils pour toi, en une ligne.",
        attendu:
          "Avoir les quelques outils de base installés (Git, et ce dont ton projet a besoin), sans te prendre la tête.",
        exemples: [
          "Installer Git pour pouvoir sauvegarder ton code.",
          "Une commande du type « brew install … » que l'IA te donne.",
        ],
        monExemple:
          "Au début, le terminal me faisait peur. En fait, tu demandes à l'IA quelle commande taper, tu la copies, et c'est réglé.",
        conseil: "Ne cherche pas à comprendre chaque commande. Demande à l'IA « installe-moi ce qu'il faut » et suis pas à pas.",
      },
      {
        titre: "Connecte GitHub pour sauvegarder ton code.",
        cestquoi:
          "GitHub, c'est le coffre-fort en ligne de ton code. Un « repo » (dépôt), c'est le dossier de ton projet là-bas.",
        attendu: "Ton projet copié sur GitHub, avec un premier enregistrement (un « commit »).",
        exemples: ["Créer un compte GitHub gratuit.", "Créer un repo pour ton projet et y envoyer ton code."],
        monExemple:
          "La première fois que j'ai vu mon code sur GitHub, j'étais rassuré : même si mon ordi lâche, tout est là.",
        conseil: "Fais-le tôt. Plus tu attends, plus tu risques de perdre du travail.",
      },
      {
        titre: "Automatise : branche Claude à GitHub pour qu'il pousse tes modifs tout seul.",
        cestquoi:
          "Automatiser, c'est faire en sorte que Claude enregistre et envoie tes changements sur GitHub sans que tu aies à le faire à la main à chaque fois.",
        attendu: "Un fonctionnement où tu bosses, et où tes sauvegardes partent toutes seules.",
        exemples: ["Demander à Claude de committer et pousser après chaque changement validé."],
        monExemple:
          "C'est le truc qui m'a fait gagner le plus de temps : je ne pense même plus à sauvegarder, Claude le fait.",
        conseil: "Le réflexe à prendre pour de bon : dès qu'un outil peut être automatisé, automatise-le.",
      },
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
    detailPret: true,
    sous: [
      {
        titre: "Travaille l'apparence : couleurs, style, ton, ta DA.",
        cestquoi:
          "Ta DA (direction artistique), c'est l'ambiance visuelle de ton site : les couleurs, les polices, le ton. Ce qui fait qu'il te ressemble.",
        attendu: "Un site qui a une identité, pas juste la mise en page par défaut. Il commence à te plaire.",
        exemples: ["Choisir deux ou trois couleurs qui te parlent.", "Demander un style « chaleureux », « épuré », « fun »…"],
        monExemple:
          "J'ai passé du temps à trouver l'ambiance qui nous ressemblait, chez The Vibe Company. C'est ce qui donne l'âme au site.",
        conseil: "Inspire-toi de sites que tu aimes et décris-les à l'IA, plutôt que de partir de zéro.",
      },
      {
        titre: "Si tu veux, ajoute des pages et un menu.",
        cestquoi: "Une page en plus (à propos, contact…) et un menu pour naviguer entre elles. Totalement optionnel.",
        attendu: "Si tu en as besoin, un site à plusieurs pages qui se tient. Sinon, une seule page suffit.",
        exemples: ["Ajouter une page « À propos ».", "Un menu en haut avec Accueil / Contact."],
        monExemple: "Mon premier site n'avait qu'une seule page, et c'était très bien. N'ajoute des pages que si ça sert vraiment.",
        conseil: "Ne complique pas pour compliquer. Une page claire vaut mieux que cinq pages vides.",
      },
      {
        titre: "Soigne le design avec Impeccable.",
        cestquoi:
          "Impeccable, c'est un skill (une compétence qu'on donne à l'IA) qui rend ton interface propre et pro, sans que tu sois designer.",
        attendu: "Un rendu net : espacements, alignements, cohérence. Le site a l'air « fini ».",
        exemples: ["Lancer Impeccable sur ta page et comparer l'avant/après."],
        monExemple: "La différence avant/après Impeccable m'a bluffé. D'un coup, mon site avait l'air pro.",
        conseil: "Regarde bien l'avant/après : c'est là que tu vois ce que ça change.",
      },
      {
        titre: "Teste avec Agent Browser et corrige ce qu'il remonte.",
        cestquoi:
          "Agent Browser, c'est l'IA qui parcourt ton site comme un vrai visiteur et te dit ce qui cloche (bouton cassé, texte illisible, souci sur mobile).",
        attendu: "Une liste de petits problèmes repérés, que tu corriges un par un.",
        exemples: ["Un bouton qui ne mène nulle part, repéré et corrigé.", "Un affichage cassé sur mobile."],
        monExemple: "Agent Browser a trouvé des trucs que je n'avais pas vus. C'est comme avoir un testeur à côté de toi.",
        conseil: "Corrige au fur et à mesure ce qu'il remonte, avant de passer à la suite.",
      },
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
    detailPret: true,
    sous: [
      {
        titre: "Choisis ta ou tes fonctionnalités (comptes, multilingue, formulaire…).",
        cestquoi:
          "Une fonctionnalité, c'est quelque chose que ton site sait FAIRE (pas juste afficher) : gérer des comptes, envoyer un formulaire, parler plusieurs langues.",
        attendu: "Tu choisis une ou plusieurs fonctionnalités qui ont du sens pour ton projet.",
        exemples: [
          "Des comptes utilisateurs (avec Supabase).",
          "Un formulaire de contact qui envoie vraiment.",
          "Un site en français et en anglais (via une API).",
        ],
        monExemple: "Pour The Vibe Experience, j'ai commencé par les comptes utilisateurs avec Supabase. C'est presque toujours utile.",
        conseil: "Commence par une seule, bien faite. Tu en rajouteras si tu veux.",
      },
      {
        titre: "Implémente-la avec l'IA, qui t'accompagne.",
        cestquoi:
          "Tu demandes à l'IA de construire la fonctionnalité choisie, en te guidant : elle branche les bons outils (par exemple Supabase pour les comptes).",
        attendu: "La fonctionnalité en place dans ton code, expliquée au passage.",
        exemples: ["« Ajoute une inscription et une connexion avec Supabase. »"],
        monExemple: "Je ne savais pas ce qu'était une base de données. L'IA m'a branché Supabase et m'a expliqué au fur et à mesure.",
        conseil: "Demande à l'IA de t'expliquer ce qu'elle fait : c'est le moment d'apprendre.",
      },
      {
        titre: "Teste de bout en bout.",
        cestquoi: "Vérifier que la fonctionnalité marche vraiment, du début à la fin, en te mettant à la place de l'utilisateur.",
        attendu: "La fonctionnalité fonctionne sans bug (tu crées un compte test, tu soumets le formulaire…).",
        exemples: ["Créer un faux compte pour vérifier l'inscription puis la connexion.", "Envoyer le formulaire et vérifier que ça arrive."],
        monExemple: "J'ai créé un compte test, je me suis déconnecté, reconnecté… tant que ça ne marche pas de bout en bout, ce n'est pas fini.",
        conseil: "Teste comme un vrai utilisateur, pas comme celui qui a construit. Tu trouveras plus de bugs.",
      },
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
    detailPret: true,
    sous: [
      {
        titre: "Connecte Vercel et déploie.",
        cestquoi: "Vercel, c'est l'hébergeur : il prend ton site et le met en ligne, accessible par tout le monde, avec une vraie adresse.",
        attendu: "Ton site en ligne, avec un lien qui marche.",
        exemples: ["Connecter ton repo GitHub à Vercel et cliquer sur Deploy."],
        monExemple: "Le déploiement sur Vercel, c'est un clic. Le plus dur, c'est tout ce qu'on a fait avant.",
        conseil: "Déploie seulement quand ton site est prêt en local. Pas avant, ça complique pour rien.",
      },
      {
        titre: "En option, ajoute un nom de domaine.",
        cestquoi: "Un nom de domaine, c'est une adresse à toi (tonsite.com) au lieu de l'adresse par défaut de Vercel.",
        attendu: "Si tu veux, une adresse personnalisée et pro.",
        exemples: ["Acheter un nom de domaine et le brancher sur Vercel."],
        monExemple: "Un nom de domaine, ça donne tout de suite un côté sérieux. Mais ce n'est pas obligatoire pour commencer.",
        conseil: "Optionnel au début. L'adresse Vercel gratuite suffit pour partager.",
      },
      {
        titre: "Vérifie le mobile et la vitesse.",
        cestquoi: "T'assurer que ton site s'affiche bien sur téléphone et qu'il se charge vite.",
        attendu: "Un site propre sur mobile, qui ne rame pas.",
        exemples: ["Ouvrir ton site sur ton téléphone.", "Vérifier que rien ne dépasse ou ne casse."],
        monExemple: "La plupart des gens vont voir ton site sur mobile. Si c'est cassé là, c'est cassé pour eux.",
        conseil: "Teste sur ton propre téléphone, c'est le plus simple et le plus parlant.",
      },
      {
        titre: "Le juge visite ton site et coche la checklist ; il te renvoie à l'étape à reprendre si besoin.",
        cestquoi:
          "Le juge, c'est une IA qui regarde ton site fini et vérifie les critères techniques du module (il répond, il a un titre, un bouton, il marche sur mobile, ta fonctionnalité fonctionne).",
        attendu: "Un verdict clair : réussi, ou ce qui manque avec l'étape à reprendre.",
        exemples: ["« Tout est bon, bravo » ou « il manque X, retourne à l'étape 3 »."],
        conseil: "Le juge n'est pas là pour te noter, juste pour t'aider à finir proprement.",
      },
      {
        titre: "Partage ton lien.",
        cestquoi: "Envoyer l'adresse de ton site à d'autres personnes.",
        attendu: "Ton site vu par quelqu'un d'autre que toi. Ton premier vrai retour.",
        exemples: ["Envoyer le lien à un ami, sur un réseau, à ta communauté."],
        monExemple: "La première fois que j'ai partagé mon site, ça a rendu le truc réel. Tu n'es plus en train d'apprendre, tu as fait quelque chose.",
        conseil: "Partage même si ce n'est pas parfait. Le retour des gens vaut plus que la perfection.",
      },
    ],
    livrable: "Ton site en ligne, partagé.",
    reussite: "Le juge valide toute la checklist du module.",
  },
];
