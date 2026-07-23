export type Fiche = { n: string; d: string };

// w et h = dimensions réelles du fichier, en pixels. Elles servent au navigateur à
// réserver la place avant le chargement : sans elles, le texte saute quand l'image
// arrive. À mettre à jour si le fichier change (`sips -g pixelWidth -g pixelHeight`).
export type Visuel = { src: string; alt: string; legende?: string; w: number; h: number };

export type SousEtape = {
  titre: string;
  duree?: string;
  cestquoi?: string;
  attendu?: string;
  // Skills offerts en copier-coller : le texte copié contient le skill entier.
  telechargements?: { n: string; href: string }[];
  // Lien direct vers la page dont la sous-étape a besoin (ex. le juge) : zéro détour.
  lien?: { label: string; href: string };
  // Procédure numérotée (« Comment faire ») : des actions à suivre dans l'ordre.
  // À ne pas confondre avec exemples, qui illustre sans prescrire.
  pasAPas?: string[];
  exemples?: string[];
  outils?: Fiche[];
  // Ce qu'il faut avoir sous la main pour faire le module : un compte, une carte,
  // des papiers. Porté par la première sous-étape, puis affiché juste avant 0.1.
  prerequis?: Prerequis[];
  prompt?: string;
  ceQueTuDoisVoir?: string;
  siCaBloque?: string;
  visuel?: Visuel;
  monExemple?: string;
  conseil?: string;
};

// Ce qu'il faut avoir sous la main AVANT de commencer un module : un compte, une
// carte, des papiers. Listé sur la page du module, avant les étapes, et rappelé
// depuis le panneau latéral. « obligatoire » = sans ça on se fait couper en route.
export type Prerequis = { quoi: string; niveau: "obligatoire" | "conseille"; ou: string };

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

const F = {
  terminal: { n: "Le terminal", d: "Une fenêtre où tu écris du texte à l'ordinateur au lieu de cliquer. C'est la porte d'entrée vers l'IA." },
  claudecode: { n: "Claude Code", d: "L'IA à qui tu parles pour construire. Tu l'installes une fois, elle te ressert pour tous tes projets." },
  github: { n: "GitHub", d: "Le coffre-fort en ligne de ton code : rien ne se perd, et ça sert aussi à mettre ton site en ligne." },
  impeccable: { n: "Impeccable", d: "Un skill qui rend ton interface et ton code propres et pros, sans être designer." },
  agentbrowser: { n: "Agent Browser", d: "L'IA qui parcourt ton site comme un vrai visiteur et repère ce qui cloche." },
  supabase: { n: "Supabase", d: "Les comptes et la base de données de tes utilisateurs." },
  api: { n: "Une API", d: "Un branchement vers un service extérieur (traduction, paiement…) pour ajouter une fonctionnalité sans la construire." },
  vercel: { n: "Vercel", d: "L'hébergeur : il met ton site en ligne en un clic et te donne un lien à partager." },
};

export const prerequisSite: Prerequis[] = [
  {
    quoi: "Un moyen de paiement",
    niveau: "obligatoire",
    ou: "L'abonnement Claude Pro (environ 20 € par mois) est indispensable : le plan gratuit ne donne pas accès à Claude Code. Prépare ta carte, tu la sortiras à l'étape 0.",
  },
  {
    quoi: "Une adresse email que tu peux consulter",
    niveau: "obligatoire",
    ou: "Trois services t'enverront un lien de confirmation à cliquer : Claude, GitHub à l'étape 2, et Supabase à l'étape 4 si tu ajoutes des comptes. Un email non confirmé bloque la suite.",
  },
  {
    quoi: "Une idée de sujet pour ton site",
    niveau: "obligatoire",
    ou: "Ton activité, une passion, une idée en tête. Résumable en une phrase. On la choisit ensemble à l'étape 1, mais y avoir pensé avant fait gagner du temps.",
  },
  {
    quoi: "Deux ou trois heures devant toi",
    niveau: "conseille",
    ou: "Le module se fait très bien en plusieurs fois, et l'étape 2 explique comment reprendre. Mais les deux premières étapes s'enchaînent mieux d'une traite.",
  },
  {
    quoi: "Des images ou un logo",
    niveau: "conseille",
    ou: "Si tu en as. Ils serviront à l'étape 3, quand ton site prendra son identité. Sinon, ce n'est pas bloquant du tout.",
  },
];

export const etapesDetail: EtapeDetail[] = [
  {
    slug: "0",
    num: "0",
    titre: "Prépare ta machine",
    tag: ["Setup", "t-build"],
    dur: "10 à 15 min, une seule fois",
    obj: "Ce parcours est écrit pour Mac : si tu es sur Windows, certaines manipulations seront un peu différentes. Avant de créer quoi que ce soit, on installe l'outil principal : l'app Claude Code. Tu ne vas pas coder, tu vas lui parler en français. C'est à faire une fois.",
    detailPret: true,
    sous: [
      {
        titre: "Installe l'app Claude Code.",
        duree: "5 min (15 si tu crées ton compte Claude)",
        cestquoi:
          "Claude Code, c'est une application que tu télécharges et installes en cliquant, comme n'importe quelle app. Pas de commande, pas de terminal. Il te faut un compte Claude avec un abonnement payant : l'offre Pro, autour de 20 € par mois, suffit pour tout ce module. Le plan gratuit ne donne pas accès à Claude Code, c'est cet abonnement qui la fait marcher.",
        attendu: "L'app Claude Code installée et ouverte, connectée à ton compte.",
        lien: { label: "Ouvrir claude.com/claude-code", href: "https://claude.com/claude-code" },
        outils: [F.claudecode],
        prerequis: prerequisSite,
        pasAPas: [
          "Crée d'abord ton compte Claude si tu n'en as pas : va sur claude.ai et inscris-toi.",
          "Prends l'abonnement Pro : sur claude.ai, ouvre les réglages de ton compte (ton initiale, en bas à gauche), rubrique abonnement, et choisis Pro. C'est le moins cher qui donne accès à Claude Code. Tu passeras par un paiement par carte classique, parfois en anglais : tu es sur le site officiel de Claude, et tu peux arrêter l'abonnement quand tu veux.",
          "Va sur claude.com/claude-code (bouton juste au-dessus), clique « Download for macOS », ouvre le fichier téléchargé et laisse-toi guider pour l'installation, puis ouvre l'app et connecte-toi.",
        ],
        ceQueTuDoisVoir:
          "Au premier lancement, l'app te demande de te connecter à ton compte Claude : une page s'ouvre, tu te connectes, tu reviens. Elle peut te poser une question ou deux (thème clair ou sombre…), réponds, il n'y a pas de mauvais choix. Quand tu arrives sur une zone où écrire ton message, tu es prêt.",
        visuel: {
          src: "/module/0-1-claude-code.png",
          w: 1400,
          h: 610,
          alt: "La page officielle de Claude Code, avec le bouton « Download for macOS ».",
          legende: "La page officielle de Claude Code : c'est de là que tu télécharges l'app (bouton « Download for macOS »).",
        },
        siCaBloque:
          "L'app refuse de s'ouvrir la première fois avec un message de sécurité macOS ? Va dans Réglages Système, Confidentialité et sécurité, et autorise-la : c'est un garde-fou normal d'Apple, pas un problème. Si tu hésites sur la version à télécharger, prends celle pour Mac. Et si tu as téléchargé l'app avant d'avoir créé ton compte, rien de grave : crée ton compte sur claude.ai, puis reviens te connecter dans l'app.",
        monExemple:
          "L'installer, c'est comme installer n'importe quelle app. Le truc nouveau, c'est ce qui vient après : lui parler en français pour construire.",
        conseil: "Prends deux minutes pour te connecter tranquillement. Une fois l'app ouverte, tout le reste se passe en lui parlant.",
      },
      {
        titre: "Fais créer ton dossier de projet par Claude Code.",
        duree: "2 min",
        cestquoi:
          "Ton site va vivre dans un dossier à lui. Pas besoin de le créer toi-même : tu ouvres Claude Code, et tu lui demandes de le créer et de travailler dedans. C'est ta toute première demande, et elle donne le ton : c'est lui qui fait, toi tu diriges. Petit cas possible : si l'app te demande de choisir un dossier dès son ouverture, choisis ton Bureau, puis envoie ta demande.",
        attendu: "Un dossier « mon-site » créé par Claude Code, dans lequel il travaille.",
        prompt:
          "Crée un dossier « mon-site » sur mon Bureau pour notre projet, et travaille dedans à partir de maintenant.",
        ceQueTuDoisVoir:
          "Claude Code crée le dossier et te confirme qu'il travaille dedans (si tu avais dû choisir un dossier à l'ouverture, il crée mon-site à l'intérieur et s'y met). Ensuite, tu vois la zone de discussion : c'est là que tu taperas ta première vraie demande à l'étape 1.",
        siCaBloque:
          "Il te répond qu'il ne peut pas changer de dossier ? Pas grave, fais-le à la main une fois : crée un dossier « mon-site » sur ton Bureau (clic droit, « Nouveau dossier »), puis ouvre-le dans Claude Code (son bouton d'ouverture de dossier). Et pour vérifier où il en est, demande-lui simplement « dans quel dossier es-tu en train de travailler ? ».",
        monExemple:
          "La première fois, je ne savais pas trop ce que « ouvrir un dossier » voulait dire. En vrai, c'est juste lui montrer où ranger le travail. Après, il s'occupe de tout dedans.",
        conseil: "Un dossier vide au départ, c'est normal. C'est Claude Code qui va le remplir à l'étape suivante.",
      },
    ],
    livrable: "Ta machine prête : l'app Claude Code installée, connectée, ouverte sur ton dossier de projet.",
    reussite: "Tu peux écrire à Claude Code, et il te répond.",
  },
  {
    slug: "1",
    num: "1",
    titre: "Transforme ton idée en page",
    tag: ["Build", "t-build"],
    dur: "30 min, en local",
    obj: "Passer de ton idée à une vraie page qui tourne sur ta machine (c'est ça, travailler « en local ») et commencer à la façonner. On reste simple.",
    detailPret: true,
    sous: [
      {
        titre: "Trouve ton sujet, et garde-le simple.",
        duree: "5 min",
        cestquoi:
          "Ton sujet, c'est ce dont parle ton site. Ça peut être ton activité, une passion, une idée que tu as en tête depuis longtemps.",
        attendu:
          "Une idée claire, résumable en une phrase, et assez petite pour être faisable vite. On ne cherche pas le projet parfait, on cherche un premier truc concret pour se lancer.",
        exemples: [
          "Un site pour présenter ton activité (menuisier, coach, photographe…).",
          "Une page pour ton groupe de musique ou ton association.",
          "Un site qui liste tes films, animés ou recettes préférés.",
        ],
        siCaBloque:
          "Tu hésites entre plusieurs idées et tu as peur de mal choisir ? Prends la première qui te fait sourire, pas la meilleure. Ce premier site est un brouillon pour apprendre, tu pourras tout changer plus tard.",
        monExemple:
          "Mon tout premier site, c'était une liste de mes animés préférés. Rien de compliqué, juste un sujet qui me plaisait, et ça a suffi pour me lancer.",
        conseil: "Écris ton idée en une phrase quelque part. Ça matérialise la décision et ça débloque.",
      },
      {
        titre: "Décris ta page à l'IA (avec déjà un peu de ce que tu veux).",
        duree: "10 min (l'IA construit, toi tu regardes)",
        cestquoi:
          "Tu expliques à Claude Code ce que tu veux, en langage normal. Et tu peux déjà glisser un peu de ce que ton site doit faire, pas seulement à quoi il ressemble.",
        attendu:
          "Une description claire : ton sujet, et deux ou trois choses que tu aimerais pouvoir faire dessus. Pas énorme, mais un peu construit.",
        exemples: [
          "« Fais-moi un site pour lister mes animés préférés, où on peut se faire sa liste comme une bibliothèque, et pouvoir les noter. »",
        ],
        prompt:
          "Fais-moi un site pour [ton sujet], où les gens peuvent [ce qu'ils peuvent y faire]. Ce serait bien qu'on puisse aussi [une petite fonctionnalité]. Construis-le avec Next.js, avec le contenu visible directement dans le HTML de la page (rendu côté serveur). Et dis-moi quand je pourrai voir la page dans mon navigateur.",
        ceQueTuDoisVoir:
          "Avant d'agir, Claude Code te demande souvent la permission : une petite fenêtre (capture ci-dessous) avec l'action qu'il veut lancer et trois boutons, « Autoriser une fois », « Toujours autoriser » et « Refuser » (« Allow once », « Always allow » et « Deny » si ton app est en anglais). C'est normal, et c'est toi le chef : clique « Autoriser une fois » pour le laisser travailler. Ensuite, du texte se met à défiler tout seul : l'IA t'explique ce qu'elle fait et crée des fichiers. Ça peut prendre plusieurs minutes, parfois cinq à dix la première fois (elle télécharge tout ce qu'il faut) : tant que ça bouge, c'est bon signe. Ne ferme pas la fenêtre pendant ce temps.",
        visuel: {
          src: "/module/1-2-allow-deny.png",
          w: 1436,
          h: 496,
          alt: "La fenêtre de permission de Claude Code : « Autoriser Claude à écriture test.txt ? », le fichier concerné, et les boutons Refuser, Toujours autoriser et Autoriser une fois.",
          legende: "Chez moi : Claude Code demande la permission avant d'écrire un fichier. Il dit exactement ce qu'il veut faire, et il attend ton feu vert.",
        },
        siCaBloque:
          "Si l'IA te pose une question au lieu de foncer (« tu veux plutôt X ou Y ? »), c'est bon signe : réponds simplement en français. Elle ne fait rien contre ta volonté.",
        monExemple:
          "Mon premier prompt, c'était un truc du genre : « fais-moi un site d'animés où les gens peuvent se faire leur liste comme une bibliothèque, et ce serait bien qu'on puisse aussi les noter ». J'avais déjà glissé quelques idées de fonctionnalités.",
        conseil: "Dans le prompt, les [crochets] sont à remplacer par tes mots, sans garder les crochets. Et recopie la fin technique telle quelle (Next.js, rendu côté serveur) : c'est elle qui permettra au juge, la vérification finale de l'étape 5, de lire ton site. Pour le reste, deux ou trois idées suffisent, pas trente.",
      },
      {
        titre: "Regarde ta page en local et commence à la modifier.",
        duree: "15 min",
        cestquoi:
          "« En local », c'est sur ta machine, avant toute mise en ligne. Mais ta page ne s'ouvre pas toute seule : il faut la « lancer », puis l'ouvrir dans ton navigateur, et surtout commencer à la changer.",
        attendu:
          "Tu vois ta page en vrai, et tu la modifies : il y a forcément des trucs que tu aimes et d'autres non. Tu demandes des changements et tu les vois arriver en direct.",
        prompt: "Lance mon site en local et donne-moi le lien à ouvrir dans mon navigateur.",
        exemples: [
          "« Ce bouton, je le veux plus grand. »",
          "« Quand j'appuie ici, j'aimerais que ça fasse ça. »",
          "« Change cette partie pour qu'elle ait cette forme. »",
        ],
        ceQueTuDoisVoir:
          "L'IA te répond avec une adresse qui commence par « localhost » ou « 127.0.0.1 » (par exemple http://localhost:3000). Tu la copies, tu l'ouvres dans Chrome ou Safari, et ta page s'affiche. C'est ça, « en local » : elle vit sur ta machine, personne d'autre ne la voit encore. Ensuite, quand tu demandes une modif, la page se met à jour presque tout de suite en revenant sur l'onglet.",
        siCaBloque:
          "La page ne s'ouvre pas, ou le navigateur dit « impossible de se connecter » ? Ça veut juste dire que le site n'est pas en train de tourner. Retourne dans Claude Code et écris « mon site ne s'ouvre pas sur localhost, peux-tu le relancer et vérifier ? ». Souvent, c'est simplement que la fenêtre de Claude Code a été fermée : tant que ton site tourne, laisse-la ouverte. Si Claude Code te dit qu'il lui manque un outil pour lancer ton site (par exemple Node), pas de panique : réponds-lui « installe ce qu'il faut pour lancer mon site et guide-moi étape par étape », il s'en occupe (et s'il te fait passer par le Terminal pour ça, suis-le : tu en feras vraiment connaissance à l'étape 2, le croiser un peu en avance n'a rien de grave). Enfin, si une modif ne s'affiche pas, rafraîchis l'onglet de ton navigateur avec cmd + R : neuf fois sur dix, elle apparaît.",
        monExemple:
          "Le vrai déclic, c'est quand j'ai commencé à bidouiller : je changeais un bouton, une couleur, et je voyais le résultat tout de suite. Là j'ai compris que c'était moi qui pilotais.",
        conseil: "Une demande à la fois, et regarde le résultat en direct. C'est le meilleur moyen d'apprendre ce qui marche. Et garde ce réflexe pour tout le module : quand quelque chose cloche ou te surprend, décris ton problème à Claude Code (ce que tu as fait, ce que tu attendais, ce que tu vois, l'erreur s'il y en a une) et discute avec lui. Il y aura toujours des cas imprévus, et c'est comme ça qu'ils se résolvent.",
      },
    ],
    livrable: "Une page qui tourne en local, que tu commences à façonner.",
    reussite: "Elle s'affiche dans ton navigateur, et tu arrives à la modifier.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Sauvegarde ton projet sur GitHub",
    tag: ["Build", "t-build"],
    dur: "25 à 30 min, en local",
    obj: "Sauvegarder ton code et automatiser la sauvegarde, pour ne plus jamais perdre ton travail. C'est aussi ici que tu croises le Terminal, une seule fois, pour connecter GitHub : Claude Code te donne tout, tu colles, c'est fait.",
    detailPret: true,
    sous: [
      {
        titre: "Laisse Claude Code installer Git.",
        duree: "5 min (plus si l'installateur d'Apple se lance)",
        cestquoi:
          "Pour sauvegarder ton code, il faut l'outil Git. Deux noms qui se ressemblent, deux choses différentes : Git, c'est l'outil qui travaille sur ta machine ; GitHub, le coffre en ligne, arrive à la sous-étape suivante. Bonne nouvelle : tu n'as rien à installer toi-même, et pas besoin du Terminal ici. Tu demandes à Claude Code, il s'en occupe, et ta seule mission est de cliquer « Installer » si une fenêtre d'Apple apparaît.",
        attendu: "Git prêt sur ta machine, sans avoir rien installé à la main.",
        prompt:
          "Vérifie si Git est installé sur ma machine. S'il ne l'est pas, installe-le, et dis-moi exactement quoi faire si tu as besoin de moi.",
        ceQueTuDoisVoir:
          "Claude Code vérifie et te dit où il en est. Si Git manque, une fenêtre grise d'Apple peut s'ouvrir toute seule pour te proposer d'installer ses outils de développement (son texte dépend de la langue de ton Mac) : clique « Installer » et laisse-la finir (plusieurs minutes, selon ta connexion, c'est prévu). À la fin, demande « est-ce que Git est bien installé ? » : il te répond un numéro de version, par exemple « git version 2.39 ». Ce numéro, c'est ta preuve.",
        siCaBloque:
          "L'installation Apple échoue, ou Claude Code te propose de passer par Homebrew (un installateur d'outils) ? Laisse-le te guider : au pire, il te donnera une commande à coller dans le Terminal, la fenêtre qu'on apprivoise justement à la sous-étape suivante (pour l'ouvrir : cmd + espace, tape « Terminal », Entrée ; colle avec cmd + V, puis Entrée). Tous les réflexes du Terminal arrivent juste après, tu peux aussi faire cette sous-étape-là d'abord. Et si quelque chose finit en rouge, copie tout et colle-le à Claude Code : il te donne la suite.",
        monExemple:
          "Au début, je ne comprenais même pas à quoi servait GitHub. Une fois qu'on m'a expliqué que c'était pour ne rien perdre et pouvoir mettre en ligne, ça a fait sens.",
        conseil:
          "Regarde-le faire : tu viens de déléguer ta première installation. C'est exactement comme ça qu'on travaille avec lui, il fait, tu valides.",
      },
      {
        titre: "Crée ton compte GitHub et ouvre le Terminal.",
        duree: "5 min",
        cestquoi:
          "GitHub, c'est un service en ligne où tu ranges ton code. Ça sert à deux choses : ne jamais perdre ton travail (tout est sauvegardé, avec l'historique) et pouvoir mettre ton site en ligne ensuite (c'est depuis GitHub que l'étape 5 le déploiera). Un « repo », c'est le dossier de ton projet là-bas. Ici, tu prépares juste le terrain : ton compte, et ta première ouverture du Terminal, cette fameuse fenêtre. Pas de panique : c'est juste une zone de texte, et tu ne vas encore rien y taper.",
        attendu: "Ton compte GitHub créé et vérifié, et le Terminal ouvert devant toi. C'est tout.",
        lien: { label: "Créer mon compte sur github.com", href: "https://github.com" },
        outils: [F.github, F.terminal],
        pasAPas: [
          "Crée ton compte gratuit sur github.com (bouton juste au-dessus).",
          "Va valider l'email que GitHub t'envoie : ouvre-le et clique sur le lien. Sans ça, l'envoi de ton code peut être bloqué à la sous-étape suivante.",
          "Ouvre le Terminal du Mac : appuie sur cmd + espace, tape « Terminal », puis Entrée. Une fenêtre presque vide s'ouvre, avec un curseur qui clignote (capture ci-dessous) : c'est normal, tu n'as rien cassé. Laisse-la ouverte.",
        ],
        ceQueTuDoisVoir:
          "Ton compte GitHub qui marche (tu es connecté sur github.com), et la fenêtre du Terminal ouverte : une ligne de texte, un curseur qui clignote, rien d'autre. Il ne se passe rien tant que tu ne colles rien dedans.",
        visuel: {
          src: "/module/2-1-terminal.png",
          w: 1700,
          h: 982,
          alt: "Le Terminal du Mac à l'ouverture : une fenêtre au fond sombre, une ligne « Last login », un prompt et un curseur.",
          legende: "Le Terminal à l'ouverture : une fenêtre presque vide, une ligne, un curseur qui clignote. C'est tout, et c'est normal.",
        },
        siCaBloque:
          "L'email de GitHub n'arrive pas ? Regarde dans tes spams, ou fais-le renvoyer depuis github.com. Et si le Terminal t'impressionne, ouvre-le quand même : tant que tu n'y colles rien, il ne se passe rien.",
        monExemple: "Au début, le Terminal me faisait peur, comme à tout le monde.",
        conseil: "Ouvrir cette fenêtre, c'est déjà passer un cap. La suite, c'est juste du copier-coller guidé.",
      },
      {
        titre: "Connecte ta machine à GitHub et envoie ton code.",
        duree: "10 à 15 min",
        cestquoi:
          "Connecter ta machine à ton compte GitHub, c'est LE moment Terminal du parcours : ça se passe dedans, une seule fois. Claude Code te donne tout ce qu'il faut y coller, toi tu colles et tu suis. C'est la seule étape où le parcours te fait ouvrir le Terminal exprès.",
        attendu: "Ta machine connectée à GitHub, ton code copié dessus, avec un premier enregistrement. Et le Terminal apprivoisé au passage.",
        pasAPas: [
          "Dans Claude Code, envoie le prompt ci-dessous.",
          "Quand il te donne une commande, colle-la dans le Terminal ouvert à la sous-étape d'avant (cmd + V), fais Entrée, et suis le déroulé décrit dans « Ce que tu dois voir ».",
        ],
        prompt:
          "Connecte ma machine à mon compte GitHub, puis envoie mon projet dessus. Quand tu as besoin de moi, donne-moi la commande exacte à coller dans le Terminal, et dis-moi quoi répondre aux questions qu'il me posera.",
        ceQueTuDoisVoir:
          "Pour relier ta machine à ton compte, Claude Code lance souvent un petit assistant DANS le Terminal, en anglais : des questions avec des choix à sélectionner avec les FLÈCHES du clavier (haut et bas, puis Entrée), pas avec la souris. Réponds « GitHub.com », puis « HTTPS », puis « Login with a web browser » : il t'affiche alors un code à 8 caractères (du genre XXXX-XXXX). Appuie sur Entrée, une page GitHub s'ouvre dans ton navigateur : tape ce code, valide, puis clique le bouton vert qui commence par « Authorize ». Si la fenêtre semble figée sans rien afficher, clique dedans puis appuie sur Entrée. On va aussi peut-être te demander si ton projet doit être « Public » (visible par tout le monde) ou « Private » (visible par toi seul) : dans le doute, choisis « Private », tu pourras changer plus tard en deux clics. Quand c'est bon, va sur github.com : ton dossier de projet (ton « repo ») apparaît avec tes fichiers dedans. C'est la preuve que ton travail est en sécurité en ligne.",
        siCaBloque:
          "Pour coller dans le Terminal, c'est cmd + V (la touche Command, pas Ctrl). Si le Terminal demande ton mot de passe Mac, rien ne s'affiche quand tu tapes, pas même des points : c'est voulu, tape à l'aveugle et fais Entrée. Si une installation d'outil passe par Homebrew et que le Terminal affiche à la fin deux commandes sous « Next steps », colle-les aussi, l'une après l'autre. Une page va peut-être s'ouvrir dans ton navigateur pour demander « oui, j'autorise » : c'est normal et attendu, ce n'est pas une arnaque. Si tu vois « authentication failed » ou « permission denied », dis à Claude Code « je n'arrive pas à me connecter à GitHub, aide-moi à m'authentifier étape par étape » : c'est le blocage numéro un des débutants, il est prévu. Si tu vois « please tell me who you are » ou « Author identity unknown », c'est juste que Git ne sait pas encore qui tu es : dis à Claude Code « configure mon identité Git avec mon nom et mon email GitHub », donne-lui les deux, tu ne le refais qu'une seule fois. Et si une commande finit en rouge, copie tout et colle-le à Claude Code : il te donne la version corrigée.",
        monExemple:
          "La première fois que j'ai collé une ligne dans le Terminal et que ça a marché, la peur est tombée d'un coup. Depuis, ce n'est plus un obstacle.",
        conseil:
          "Tu colles ce qu'on te donne et tu regardes. Cette fenêtre n'a rien de magique : une zone de texte, et des erreurs rouges qui ne cassent rien.",
      },
      {
        titre: "Automatise les sauvegardes.",
        duree: "5 min",
        cestquoi:
          "Une fois GitHub branché, tu peux demander à Claude Code d'enregistrer et d'envoyer tes changements tout seul, sans le refaire à la main à chaque fois. Pas besoin de toucher au Terminal : Claude Code lance les commandes lui-même.",
        attendu: "Tu bosses, et tes sauvegardes partent automatiquement.",
        prompt:
          "À partir de maintenant, après chaque changement qu'on valide ensemble, enregistre et envoie automatiquement mon code sur GitHub, et dis-moi juste quand c'est fait. Écris aussi cette consigne dans le fichier d'instructions de mon projet, pour t'en souvenir dans nos prochaines conversations.",
        ceQueTuDoisVoir:
          "Après une modif, l'IA te dit une ligne du genre « changements sauvegardés et envoyés sur GitHub ». Tu peux aller vérifier sur github.com que la date de dernière mise à jour vient de changer.",
        visuel: {
          src: "/module/2-3-github-commits.png",
          w: 1400,
          h: 460,
          alt: "L'historique des sauvegardes (commits) d'un projet sur GitHub, avec la date de la dernière mise à jour.",
          legende: "L'historique de ton projet sur GitHub : chaque sauvegarde apparaît avec sa date. Tu vois tout de suite que ta dernière mise à jour est bien partie.",
        },
        monExemple:
          "Une fois GitHub branché, Claude Code enregistrait et envoyait mes changements tout seul. Je n'avais même pas à toucher au Terminal, il s'en occupait.",
        conseil: "Attention à ne pas confondre : envoyer ton code sur GitHub, c'est le mettre à l'abri, pas le publier. Ton site n'est pas encore en ligne pour le public, ça se fait à l'étape 5. Là, tu sécurises, c'est tout. Et le réflexe à prendre : dès qu'un outil peut être automatisé, fais-le une fois, tu gagnes un temps fou ensuite. Dernière chose, pour reprendre un autre jour : rouvre ton dossier dans Claude Code, demande « relance mon site en local », et après ta première modif, vérifie qu'une sauvegarde part toujours vers GitHub.",
      },
    ],
    livrable: "Ton projet sauvegardé sur GitHub, en automatique.",
    reussite: "Tes changements se sauvegardent sans que tu y penses.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Travaille le visuel de ton site",
    tag: ["Build", "t-build"],
    dur: "40 min à 1 h (hors pages en option), en local",
    obj: "Fais en sorte que ton site te ressemble et te plaise, et rends-le propre. Les pages en plus ? Optionnel.",
    detailPret: true,
    sous: [
      {
        titre: "Travaille l'apparence : couleurs, style, ton, ta DA.",
        duree: "15 à 25 min (c'est toi qui décides quand t'arrêter)",
        cestquoi:
          "Ta DA (direction artistique), c'est l'ambiance visuelle de ton site : les couleurs, les polices, le ton. Ce qui fait qu'il te ressemble.",
        attendu: "Un site qui a une identité, pas juste la mise en page par défaut. Il commence à te plaire.",
        exemples: [
          "Choisir deux ou trois couleurs qui te parlent.",
          "Demander un style précis : « chaleureux », « épuré », « rétro années 80 »…",
        ],
        prompt:
          "Voici l'ambiance que je veux pour mon site : [deux ou trois mots, ex. chaleureux, épuré]. Mes couleurs préférées sont [x et y]. Propose-moi 2 styles différents et applique celui que je choisis.",
        ceQueTuDoisVoir:
          "La page se transforme visiblement : ce n'est plus la mise en page grise par défaut, elle prend une ambiance.",
        siCaBloque:
          "Le résultat ne te plaît pas du tout ? On ne repart pas de zéro, on ajuste. Pour montrer une image à l'IA, attrape le fichier avec ta souris et lâche-le directement dans la fenêtre de Claude Code : son chemin s'écrit tout seul, tu ajoutes ta phrase après (« inspire-toi de cette image pour les couleurs ») et Entrée. Et si l'IA dit avoir appliqué mais que ta page n'a pas bougé, rafraîchis l'onglet (cmd + R), le réflexe de l'étape 1 : la nouvelle version apparaît presque toujours.",
        visuel: {
          src: "/module/da-avant-apres.webp",
          w: 1745,
          h: 895,
          alt: "Avant / après de la DA du site d'animés : à gauche un rendu générique, à droite une identité façon planche de manga noir et blanc.",
          legende: "Mon site d'animés, avant et après avoir travaillé la DA. Même contenu, mais là il a une vraie identité.",
        },
        monExemple:
          "Pour mon site d'animés, j'ai demandé une DA façon planche de manga : noir et blanc, style crayonné, comme des pages dessinées. C'est ce qui lui a donné son ambiance à lui, pas une déco par défaut.",
        conseil: "Inspire-toi de sites ou d'images que tu aimes et décris-les à l'IA (ou montre-les-lui), plutôt que de partir de zéro.",
      },
      {
        titre: "Si tu veux, ajoute des pages et un menu.",
        duree: "0 à 15 min (souvent, on saute)",
        cestquoi: "Une page en plus (à propos, contact…) et un menu pour naviguer entre elles. Totalement optionnel.",
        attendu: "Si tu en as besoin, un site à plusieurs pages qui se tient. Sinon, une seule page suffit.",
        exemples: ["Ajouter une page « À propos ».", "Un menu en haut avec Accueil / Contact."],
        ceQueTuDoisVoir:
          "Une fois le menu ajouté, teste-le : clique sur chaque entrée (Accueil, À propos, Contact) et vérifie que la page change vraiment à chaque clic. Un menu joli mais dont les liens ne mènent nulle part, c'est le piège classique. Si un lien ne fait rien, dis à Claude Code « le lien X de mon menu ne va nulle part, corrige-le ».",
        siCaBloque: "Si tu hésites, saute cette étape. Tu reviendras plus tard. Une page claire vaut mieux que cinq pages vides.",
        monExemple: "Mon premier site n'avait qu'une seule page, et c'était très bien. N'ajoute des pages que si ça sert vraiment.",
        conseil: "Ne complique pas pour compliquer.",
      },
      {
        titre: "Nettoie le tout avec Impeccable.",
        duree: "10 min",
        cestquoi:
          "Impeccable, c'est un skill (une compétence qu'on donne à l'IA) qui remet de l'ordre. À l'écran, la différence n'est pas toujours spectaculaire ; ce qu'il fait surtout, c'est trier et nettoyer le code derrière.",
        attendu: "Un code plus propre et mieux rangé. Tu ne le vois pas forcément à l'écran, mais ça pose des bases saines pour la suite.",
        telechargements: [{ n: "Impeccable", href: "/skills/impeccable.zip" }],
        outils: [F.impeccable],
        pasAPas: [
          "C'est ta première installation de skill. Clique sur « Copier le skill » juste au-dessus : ça copie le skill en entier.",
          "Ouvre Claude Code, colle le skill copié dans la zone où tu écris tes messages, puis envoie. Claude Code range les fichiers du skill au bon endroit et te confirme.",
          "Tu ne fais ça qu'une fois : ensuite, le skill reste disponible, ici et sur tous tes prochains projets.",
          "Puis lance-le avec le prompt fourni ci-dessous.",
        ],
        prompt: "Utilise le skill Impeccable sur tout mon site pour nettoyer et ranger le code.",
        ceQueTuDoisVoir:
          "Quand le skill part, une ligne au nom du skill (du genre « Ran skill /impeccable ») s'affiche dans la conversation : c'est ta preuve qu'il tourne. Attention, elle est souvent rangée dans une ligne-résumé repliée (du genre « Ran 6 commands... ») : clique sur cette ligne-résumé pour la déplier et voir le détail. À l'écran du site, souvent presque aucune différence, et c'est normal : le travail se passe dans les coulisses, sur le code.",
        siCaBloque:
          "Claude Code te répond qu'il ne connaît pas Impeccable juste après l'installation ? Ferme et rouvre Claude Code : un skill tout juste installé n'est parfois pris en compte qu'au redémarrage. Le collage ne marche pas ? Recopie le skill depuis cette page et renvoie-le dans Claude Code.",
        monExemple: "Honnêtement, à l'écran il n'y avait pas une grande différence avant/après. Ce que ça a fait, c'est nettoyer et trier le code : tu ne le vois pas forcément, mais c'est plus propre.",
        conseil: "Ne t'attends pas à un choc visuel. Impeccable travaille surtout les coulisses, et c'est très utile pour la suite. Une fois installé, un skill se déclenche juste en le demandant en français.",
      },
      {
        titre: "Fais boucler Impeccable et Agent Browser (ta première loop).",
        duree: "15 à 25 min (ça tourne surtout tout seul)",
        cestquoi:
          "Agent Browser, lui, clique partout sur ton site comme le ferait un visiteur, et note tout ce qui cloche. Une « loop », c'est quand tu demandes à l'IA de répéter un cycle toute seule jusqu'à ce que ce soit bon. Ici, tu fais travailler tes deux skills ensemble : Impeccable soigne, Agent Browser teste, et ça tourne en boucle sans que tu relances à la main.",
        attendu: "Tes deux skills qui s'enchaînent tout seuls : vérifie → teste → corrige → re-teste, jusqu'à ce que tout soit bon.",
        telechargements: [
          { n: "Impeccable", href: "/skills/impeccable.zip" },
          { n: "Agent Browser", href: "/skills/agent-browser.zip" },
        ],
        outils: [F.impeccable, F.agentbrowser],
        pasAPas: [
          "Installe d'abord Agent Browser : même geste qu'Impeccable à la sous-étape d'avant (copie le skill juste au-dessus, colle-le dans Claude Code, envoie).",
          "Puis copie le prompt ci-dessous et laisse la boucle tourner.",
        ],
        exemples: [
          "Un bouton cassé repéré par Agent Browser, corrigé par Impeccable, re-testé automatiquement.",
          "Un affichage cassé sur mobile, réglé dans le même cycle sans que tu interviennes.",
        ],
        prompt:
          "Fais travailler tes deux skills en boucle. D'abord, avec le skill Impeccable, inspecte tout mon site et vérifie que mon design est bon. Ensuite, avec le skill Agent Browser, va tester toutes les nouvelles modifications. S'il y a une correction à faire, corrige-la avec Impeccable puis re-teste avec Agent Browser. Continue cette boucle entre les deux skills jusqu'à ce que tout soit propre et fonctionnel.",
        ceQueTuDoisVoir:
          "Ça va enchaîner tout seul pendant plusieurs minutes : du texte défile, l'IA teste, corrige, re-teste. Tu sauras que c'est fini quand le texte arrête de défiler et que l'IA te fait un petit résumé du genre « tout est propre et fonctionnel ». À ce moment-là, la main te revient et tu peux réécrire dans la fenêtre. Tant que ça défile, c'est qu'elle travaille encore, laisse-la.",
        siCaBloque:
          "Si Agent Browser dit qu'il n'arrive pas à ouvrir ton site ou reste bloqué à « j'attends la page », c'est presque toujours que ton site ne tourne plus en local : écris « relance mon site en local avant de tester avec Agent Browser », puis redemande la boucle. Si Claude Code ne connaît pas encore le skill Agent Browser (ou Impeccable), installe-le : les deux skills à copier sont juste au-dessus, dans cette sous-étape, et tant que les deux ne sont pas installés, la boucle ne peut pas tourner. Pour Agent Browser, il finit son installation tout seul au premier usage : il récupère alors son propre navigateur, ce qui peut prendre plusieurs minutes sans grand-chose à l'écran, c'est prévu. Et pour que la boucle tourne vraiment toute seule, quand Claude Code demande une permission, clique « Toujours autoriser » (« Always allow » en anglais) : sinon tu devras cliquer « Autoriser une fois » à chaque tour. Si la boucle repasse sans fin sur les mêmes corrections au-delà de la durée annoncée, arrête avec Échap puis écris « fais un dernier passage et arrête-toi, dis-moi ce qui reste ». Une boucle consomme pas mal : si Claude Code s'arrête en disant que tu as atteint ta limite d'utilisation, ce n'est pas un bug. Attends qu'elle se réinitialise (l'app te dit quand) et reprends là où tu en étais. Pas besoin de passer à l'offre Max juste pour cet exercice.",
        monExemple: "C'était ma toute première loop, et franchement c'était cool. Tu expliques à Claude Code de faire tourner les deux skills ensemble, et il enchaîne vérif, test et correction tout seul. Là tu comprends la puissance du truc.",
        conseil: "Copie-colle le prompt ci-dessus tel quel dans Claude Code : tu n'as plus qu'à le laisser boucler.",
      },
    ],
    livrable: "Un site à ton image, propre, en local.",
    reussite: "Le rendu est propre, les boutons et liens marchent, mobile et desktop.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Ajoute une fonctionnalité à ton site",
    tag: ["Produit", "t-product"],
    dur: "1 h à 1 h 20, en local",
    obj: "Donne des super-pouvoirs à ton site. Une seule fonctionnalité ou plusieurs, on ne limite pas.",
    detailPret: true,
    sous: [
      {
        titre: "Choisis ta ou tes fonctionnalités (comptes, multilingue, formulaire…).",
        duree: "5 min",
        cestquoi:
          "Une fonctionnalité, c'est quelque chose que ton site sait FAIRE (pas juste afficher) : gérer des comptes, envoyer un formulaire, parler plusieurs langues.",
        attendu: "Tu choisis une ou plusieurs fonctionnalités qui ont du sens pour ton projet.",
        outils: [F.supabase, F.api],
        exemples: [
          "Le plus simple pour commencer : un formulaire de contact dont tu retrouves les messages (ils se rangent dans Supabase, pas besoin d'envoyer de vrais emails, ce qui demanderait un service en plus).",
          "Un cran au-dessus : des comptes utilisateurs (avec Supabase).",
          "Un site en français et en anglais (via une API).",
        ],
        visuel: {
          src: "/module/4-1-supabase.png",
          w: 1400,
          h: 860,
          alt: "La page d'accueil de Supabase, avec ses briques Postgres Database, Authentication et Edge Functions.",
          legende: "Supabase, un des services que l'IA peut brancher pour toi : il gère les comptes (Authentication) et la base de données de tes utilisateurs.",
        },
        siCaBloque:
          "Tu as une idée mais tu ne sais pas si c'est trop dur pour une première fois ? Ne devine pas, demande. Écris à Claude Code « je voudrais que mon site puisse [ce que tu veux]. Est-ce que c'est faisable simplement pour un débutant, et est-ce que ça a besoin d'un service extérieur ou d'une base de données ? Réponds-moi honnêtement. » Il te dira si c'est un petit truc ou un gros chantier, et tu choisis en connaissance de cause.",
        monExemple: "Pour The Vibe Experience, j'ai commencé par les comptes utilisateurs avec Supabase. C'est presque toujours utile.",
        conseil: "Prends le plus simple pour ta première fois. Un formulaire de contact est plus doux que des comptes. Tu en rajouteras si tu veux.",
      },
      {
        titre: "Implémente-la avec l'IA.",
        duree: "40 min à 1 h (la première fois, la création du compte et des clés prend du temps)",
        cestquoi:
          "Tu demandes à Claude Code de construire la fonctionnalité choisie, en te guidant. Pour beaucoup de fonctionnalités (comptes, formulaire dont tu gardes les messages), il branche Supabase : c'est le service qui garde les comptes et les données de tes utilisateurs. Ton site en ligne a besoin d'un endroit où ranger tout ça, et c'est lui. Gratuit pour commencer.",
        attendu: "La fonctionnalité en place dans ton code, expliquée au passage.",
        lien: { label: "Créer mon compte sur supabase.com", href: "https://supabase.com" },
        pasAPas: [
          "Si ta fonctionnalité utilise Supabase, crée d'abord ton compte : bouton juste au-dessus, puis « Continue with GitHub », le plus simple, tu as déjà ton compte GitHub depuis l'étape 2.",
          "Crée ensuite un projet (bouton « New project ») : donne-lui un nom, note quelque part le mot de passe de base de données qu'il te demande, et choisis une région en Europe. L'écran d'attente « Setting up project » tourne ensuite une à deux minutes pendant qu'il prépare ta base, c'est normal, ne recharge pas la page.",
          "Puis reviens dans Claude Code et envoie le prompt ci-dessous : c'est lui qui te guide pour brancher ton site, écran par écran, y compris pour retrouver les clés.",
        ],
        prompt:
          "Je veux ajouter [ta fonctionnalité, ex. inscription et connexion des utilisateurs] à mon site. Guide-moi étape par étape, je suis débutant total et je n'ai jamais fait ça. Quand tu as besoin que je crée un compte quelque part ou que je copie une clé, arrête-toi, dis-moi exactement où cliquer, et attends que je te confirme avant de continuer. Explique-moi en français simple ce que tu fais au fur et à mesure.",
        ceQueTuDoisVoir:
          "Pour certaines fonctionnalités (comptes, paiement…), l'IA va te demander d'aller créer un compte sur un service comme Supabase et de copier des « clés » (des sortes de mots de passe pour brancher le service). Deux gestes qui bloquent souvent : va confirmer ton adresse en cliquant le lien reçu par mail, sinon tu restes bloqué à l'entrée. Et après avoir créé ton projet, Supabase affiche « Setting up project » une à deux minutes : c'est normal, il prépare ta base, ne recharge pas la page.",
        siCaBloque:
          "« L'IA me demande une clé et je ne sais pas où la trouver » ? Redemande-lui « guide-moi clic par clic pour créer le compte et récupérer la clé, je n'ai jamais fait ça ». Elle sait faire. Ce que tu vois sur l'écran de Supabase ne ressemble pas à ce qu'elle décrit (les interfaces changent, les noms des clés aussi) ? Fais une capture de ton écran et glisse-la dans la fenêtre de Claude Code : l'IA s'adaptera à ce que toi tu vois. Tes clés se rangent dans un fichier caché appelé .env.local, sur ta machine uniquement : ne les colle jamais dans un message public ni une capture, et demande à Claude Code « confirme-moi que mes clés secrètes sont bien ignorées par Git et ne partiront pas sur GitHub ». Retiens que ces clés restent sur ton ordi pour l'instant : quand tu mettras ton site en ligne à l'étape 5, il faudra les redonner à l'hébergeur, mais on verra ça là-bas. Cette étape est longue : si tu atteins ta limite d'utilisation, même réflexe qu'à l'étape 3, attends la réinitialisation et reprends.",
        monExemple: "Je ne savais pas ce qu'était une base de données. L'IA m'a branché Supabase et m'a expliqué au fur et à mesure.",
        conseil: "Demande à l'IA de t'expliquer ce qu'elle fait : c'est le moment d'apprendre.",
      },
      {
        titre: "Teste de bout en bout.",
        duree: "15 min",
        cestquoi: "Vérifier que la fonctionnalité marche vraiment, du début à la fin, en te mettant à la place de l'utilisateur.",
        attendu: "La fonctionnalité fonctionne sans bug (tu crées un compte test, tu soumets le formulaire…).",
        exemples: [
          "Comptes : crée un compte avec un faux email, déconnecte-toi, reconnecte-toi, vérifie que tu retrouves tes infos.",
          "Formulaire : envoie-le et vérifie qu'il arrive bien.",
          "Et ton skill Agent Browser (installé à l'étape 3) peut tester à ta place, comme un vrai visiteur : utilise le prompt ci-dessous.",
        ],
        prompt:
          "Avec le skill Agent Browser, teste ma fonctionnalité de bout en bout comme un vrai visiteur : [décris le scénario, ex. crée un compte test, déconnecte-toi, reconnecte-toi, vérifie que tout marche]. Dis-moi ce qui casse, et corrige-le.",
        ceQueTuDoisVoir:
          "Si tu as branché des comptes avec Supabase, va sur ton tableau de bord Supabase, rubrique Authentication puis Users : ton compte test doit apparaître dans la liste, avec l'email utilisé. C'est la preuve que ça a vraiment marché, que l'info est bien arrivée dans ta base et pas juste affichée à l'écran.",
        siCaBloque:
          "Impossible de te reconnecter, ça dit que le compte n'est pas confirmé ? C'est normal : par défaut, Supabase demande de valider l'adresse par mail avant de laisser entrer. Soit tu testes avec ta vraie adresse et tu cliques le lien reçu, soit tu demandes à Claude Code « désactive la confirmation d'email dans Supabase pour que je puisse tester des comptes rapidement, et rappelle-moi de la réactiver avant la mise en ligne ». Ce n'est pas un bug de ton site, c'est un réglage. Et quand autre chose casse, ne dis pas juste « ça marche pas » : décris ce que tu as fait, ce que tu attendais, ce qui s'est passé, et copie le message d'erreur. L'IA corrige beaucoup plus vite.",
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
    titre: "Mets ton site en ligne et partage-le",
    tag: ["Ship", "t-ship"],
    dur: "30 à 45 min",
    obj: "Rends ton site officiel. C'est ici que le juge valide ton travail.",
    detailPret: true,
    sous: [
      {
        titre: "Connecte Vercel et déploie.",
        duree: "10 à 15 min",
        cestquoi: "Vercel, c'est l'hébergeur : il prend ton site et le met en ligne, accessible par tout le monde, avec une vraie adresse.",
        attendu: "Ton site en ligne, avec un lien qui marche.",
        lien: { label: "Créer mon compte sur vercel.com", href: "https://vercel.com" },
        outils: [F.vercel],
        pasAPas: [
          "Crée un compte Vercel (bouton juste au-dessus) en te connectant AVEC ton compte GitHub (le plus simple). S'il te demande un nom et un type de compte, choisis « Hobby », le plan gratuit.",
          "Importe ton projet depuis la liste de tes repos.",
          "Si tu as branché Supabase à l'étape 4, c'est le moment annoncé pour tes clés : avant de cliquer Deploy, ouvre la case Environment Variables et ajoute-les (demande à Claude Code lesquelles et où les retrouver).",
          "Puis clique sur Deploy.",
        ],
        ceQueTuDoisVoir:
          "Avant le bouton Deploy, Vercel te montre un écran de configuration avec plusieurs cases : bonne nouvelle, il a déjà tout deviné (il a reconnu ton site), tu n'as rien à changer, clique Deploy. La seule case qui peut servir, c'est Environment Variables, celle du pas-à-pas ci-dessus si tu as branché Supabase. Ensuite : une barre de progression et des logs qui défilent, puis un écran de félicitations avec une petite image de ton site et un lien en .vercel.app. Clique dessus : ton site est en ligne, accessible par n'importe qui.",
        siCaBloque:
          "Ta liste de projets à importer est vide ? C'est que Vercel n'a pas encore le droit de regarder ton GitHub : clique sur « Import Git Repository » ou « Adjust GitHub App Permissions », choisis « All repositories », valide, ton projet apparaît. Le déploiement échoue, avec une erreur en rouge du genre « Build Failed » ? Ça arrive tout le temps au premier essai : copie tout le message d'erreur et colle-le à Claude Code, « mon déploiement Vercel a échoué, voici l'erreur, corrige et on renvoie sur GitHub ». Une fois corrigé et renvoyé, tu n'as rien à relancer : Vercel redéploie tout seul à chaque envoi sur GitHub. Retourne sur la page de ton projet Vercel, un nouveau déploiement apparaît en haut de la liste, attends qu'il passe au vert. Ta page s'affiche mais ta fonctionnalité (comptes, formulaire) ne marche plus alors qu'elle marchait en local ? C'est presque toujours tes clés qui manquent sur Vercel : elles sont restées sur ton ordi, pas sur GitHub (normal, ce sont des secrets). Dans Vercel, va dans Settings puis Environment Variables et ajoute-les (demande à Claude Code lesquelles et où les retrouver), puis clique Redeploy.",
        monExemple: "Le déploiement sur Vercel, c'est un clic (et si le premier essai échoue, ça se corrige vite). Le plus dur, c'est tout ce qu'on a fait avant.",
        conseil: "Déploie seulement quand ton site est prêt en local. Pas avant, ça complique pour rien.",
      },
      {
        titre: "En option, ajoute un nom de domaine.",
        duree: "0 à 20 min (optionnel)",
        cestquoi: "Un nom de domaine, c'est une adresse à toi (tonsite.com) au lieu de l'adresse par défaut de Vercel. Ça s'achète quelques euros par an, directement dans Vercel (rubrique Domains de ton projet) ou chez un vendeur de domaines.",
        attendu: "Si tu veux, une adresse personnalisée et pro.",
        exemples: ["Acheter un nom de domaine et le brancher sur Vercel."],
        siCaBloque: "Ton domaine ne répond pas tout de suite ? C'est le délai normal : l'activation peut prendre quelques heures. Rien d'inquiétant.",
        monExemple: "Un nom de domaine, ça donne tout de suite un côté sérieux. Mais ce n'est pas obligatoire pour commencer.",
        conseil: "Optionnel au début. L'adresse Vercel gratuite suffit pour partager.",
      },
      {
        titre: "Vérifie le mobile et la vitesse.",
        duree: "10 min",
        cestquoi: "T'assurer que ton site s'affiche bien sur téléphone et qu'il se charge vite.",
        attendu: "Un site propre sur mobile, qui ne rame pas.",
        exemples: ["Envoie-toi le lien .vercel.app par message et ouvre-le directement sur ton téléphone."],
        ceQueTuDoisVoir:
          "Ne te contente pas de regarder que c'est joli : refais ton test de bout en bout sur le vrai lien en ligne (crée un compte test, envoie le formulaire), comme un vrai visiteur. Ce qui marchait sur ton ordi ne marche pas toujours du premier coup en ligne, et c'est le moment de le voir, pas après avoir partagé. Pour la vitesse, pas besoin d'outil : ta page doit apparaître en une à deux secondes.",
        siCaBloque:
          "Un truc dépasse ou casse sur mobile ? Fais une capture d'écran depuis ton téléphone, envoie-la à Claude Code et dis « voilà ce que ça donne sur mobile, corrige ». Si tu attends cinq secondes ou plus devant un écran blanc, dis « mon site est lent à charger en ligne, qu'est-ce qui le ralentit ? ».",
        monExemple:
          "Je vais être honnête : mes propres sites, je ne suis presque jamais allé les voir sur mobile. Je ne sais même pas à quoi ressemble mon premier site sur un téléphone. Fais mieux que moi : ça prend deux minutes, et c'est là que la plupart des gens verront le tien.",
        conseil: "Teste sur ton propre téléphone, c'est le plus simple et le plus parlant.",
      },
      {
        titre: "Fais évaluer ton site par le juge.",
        duree: "5 min",
        cestquoi:
          "Le juge, c'est une IA qui regarde ton site fini et vérifie les critères techniques du module : il répond en ligne, il a un vrai titre et du contenu, des boutons ou des liens, et il est prêt pour le mobile. Ta fonctionnalité (comptes, formulaire…), lui ne peut pas la tester : c'est toi qui l'as vérifiée à l'étape 4, et il te le rappellera.",
        attendu: "Un verdict clair : réussi, ou ce qui manque avec l'étape à reprendre.",
        lien: { label: "Ouvrir la page du juge", href: "/juge" },
        pasAPas: [
          "Ouvre la page du juge avec le bouton juste au-dessus.",
          "Colle l'adresse de ton site en ligne (ton lien .vercel.app, celui qui marche pour tout le monde, pas celui en localhost), ajoute ton sujet en une phrase, et lance. C'est de là qu'il fait le tour de ta checklist.",
          "Le champ repo est optionnel : le juge ne sait lire que les repos publics, donc si le tien est privé (le choix conseillé à l'étape 2), laisse-le vide.",
        ],
        visuel: {
          src: "/module/5-4-juge.png",
          w: 1400,
          h: 762,
          alt: "La page du juge : un champ pour l'adresse du site, un pour le sujet, un pour le repo GitHub, et le bouton « Faire évaluer mon site ».",
          legende: "La page du juge : tu colles l'adresse de ton site en ligne, ton sujet en une phrase, et il fait le tour de la checklist.",
        },
        siCaBloque:
          "Le juge dit qu'il n'arrive pas à accéder à ton site alors que toi tu le vois très bien ? C'est sûrement que ton lien est privé. Ouvre ton adresse .vercel.app dans une fenêtre de navigation privée : si on te demande un mot de passe, ton site n'est pas vraiment public. Dis à Claude Code « mon site Vercel demande une connexion, je veux qu'il soit public, aide-moi à enlever la protection ». Le juge dit que ta page est vide ou encore sur le template, alors que ton site marche très bien dans ton navigateur ? Lis le détail du critère : il te dit exactement quoi demander à Claude Code (souvent, c'est le titre de l'onglet resté par défaut, ou un contenu que le juge ne voit pas sans JavaScript). Copie ce détail, colle-le à Claude Code, renvoie sur GitHub et repasse le juge. Et s'il te renvoie à une étape, c'est une bonne nouvelle : il t'a évité de partager un site cassé. Tu corriges, tu repasses, et ça valide. Ce n'est pas une punition.",
        monExemple:
          "Moi, ce juge, je ne l'ai jamais passé : il n'existait pas encore. Mon premier site, c'est Antoine, de l'équipe, qui l'a vérifié avant que je passe à la suite. Le juge est là pour te donner ce même regard extérieur, sans avoir besoin de quelqu'un sous la main.",
        conseil: "Le juge n'est pas là pour te noter, juste pour t'aider à finir proprement.",
      },
      {
        titre: "Partage ton lien.",
        duree: "2 min",
        cestquoi: "Envoyer l'adresse de ton site à d'autres personnes.",
        attendu: "Ton site vu par quelqu'un d'autre que toi. Ton premier vrai retour.",
        exemples: ["Commence par une personne bienveillante (un proche), avant la place publique."],
        siCaBloque:
          "Attention au lien que tu envoies : c'est ton adresse en .vercel.app qu'il faut partager, jamais celle qui commence par localhost ou 127.0.0.1 (celle-là ne marche que sur ton ordi, le proche recevrait un lien mort). Tu retrouves ton vrai lien en haut de ton projet sur Vercel, dans la case Domains ou en cliquant sur « Visit ».",
        monExemple: "La première fois que j'ai partagé mon site, ça a rendu le truc réel. Tu n'es plus en train d'apprendre, tu as fait quelque chose.",
        conseil: "Partage même si ce n'est pas parfait. Le retour des gens vaut plus que la perfection.",
      },
    ],
    livrable: "Ton site en ligne, partagé.",
    reussite: "Le juge valide toute la checklist du module.",
  },
];
