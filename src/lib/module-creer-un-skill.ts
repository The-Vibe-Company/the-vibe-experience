import type { Fiche, EtapeDetail } from "./module-faire-un-site";

const F = {
  claudecode: {
    n: "Claude Code",
    d: "Ton atelier, déjà installé à ton premier projet. C'est lui qui va fabriquer ton skill.",
  },
  skillcreator: {
    n: "Skill Creator (offert)",
    d: "Notre skill qui fabrique des skills solides, au bon format et fonctionnels, sans que tu touches à la technique.",
  },
  improve: {
    n: "Improve (offert)",
    d: "Notre skill qui passe ton skill en revue et propose des améliorations, sur le fond et sur la technique.",
  },
};

// Les deux skills qu'on met à disposition des utilisateurs, à télécharger et déposer dans leurs skills.
export const skillGifts = [
  {
    n: "Skill Creator",
    slug: "create-skill-tools",
    d: "Crée pour toi un skill solide, au bon format, propre et fonctionnel. Tu décris ce que tu veux, il s'occupe de la technique.",
    href: "/skills/create-skill-tools.zip",
  },
  {
    n: "Improve",
    slug: "improve-skill-tools",
    d: "Passe ton skill en revue comme un relecteur expert et te propose des améliorations, sur le fond et sur la technique.",
    href: "/skills/improve-skill-tools.zip",
  },
];

export const skillToolbox: { n: string; d: string; cost: "gratuit" | "gratuit-debut" | "payant"; costNote?: string }[] = [
  {
    n: "Claude Code",
    d: "Le seul outil du module. Tu l'as déjà de ton premier projet, rien de neuf à installer.",
    cost: "payant",
    costNote: "Le même abonnement Claude Pro que pour ton site. Rien de plus.",
  },
];

export const etapesDetailSkill: EtapeDetail[] = [
  {
    slug: "0",
    num: "0",
    titre: "C'est quoi un skill",
    tag: ["Setup", "t-build"],
    dur: "≈ 15 min · rien à installer",
    obj: "Tu as déjà Claude Code de ton premier projet, rien de neuf à installer. Un skill, c'est une compétence que tu apprends une fois à l'IA et qu'elle réutilise ensuite toute seule. Tu viens d'en utiliser des tout faits (Impeccable, Agent Browser), là tu fais le tien.",
    detailPret: true,
    sous: [
      {
        titre: "Tu as déjà ton seul outil : Claude Code.",
        duree: "≈ 2 min",
        cestquoi:
          "Le seul outil de ce module, c'est Claude Code, déjà installé à ton premier projet. Un skill, c'est juste un dossier rangé chez toi, dont Claude Code s'occupe tout seul : tu n'as jamais à aller le chercher à la main. Rien à installer, rien à payer en plus. Et tout se passe en parlant à Claude Code, jamais dans le Terminal.",
        attendu: "Claude Code rouvert, comme au module précédent.",
        outils: [F.claudecode],
        conseil: "Si tu as sauté le module « Faire un site », installe d'abord Claude Code (son étape 0). Tout part de là.",
      },
      {
        titre: "Comprends ce qu'est un skill (et pourquoi ça change tout).",
        duree: "≈ 10 min",
        cestquoi:
          "Un skill, c'est trois choses : un nom, une description (quand l'IA doit l'utiliser) et des instructions (ce qu'elle doit faire). Tu l'appelles en tapant /nom dans la zone où tu écris à Claude Code, comme un message (par exemple /impeccable), ou l'IA le déclenche toute seule quand ta demande colle à la description. Tu l'apprends une fois, elle s'en ressert toujours.",
        attendu: "Avoir compris l'idée : capturer une compétence pour ne plus la réexpliquer à chaque fois.",
        exemples: ["Les skills tout faits que tu as déjà utilisés au module précédent : Impeccable, Agent Browser."],
        visuel: {
          src: "/module/skill-0-2-docs.png",
          alt: "La documentation officielle de Claude Code sur les skills : un skill est un fichier SKILL.md, déclenché tout seul ou avec /nom.",
          legende: "Un skill n'est pas un truc maison : c'est le standard officiel de Claude Code. Un fichier SKILL.md avec tes instructions, que l'IA lance toute seule au bon moment ou que tu appelles avec /nom.",
        },
        monExemple:
          "Très vite, Stan m'a dit : les skills, c'est ce qui va faire la différence. Sur le coup je n'avais pas complètement saisi. Et après ma première loop, entre Impeccable et Agent Browser (une loop, c'est quand l'IA enchaîne toute seule plusieurs étapes, comme tu l'as fait au module précédent), je me suis dit c'est trop fort. Là j'ai compris de quoi il parlait.",
        conseil: "Ne cherche pas à tout comprendre du fichier technique. Retiens juste : un nom, une description, des instructions.",
      },
    ],
    livrable: "Tu sais ce qu'est un skill et pourquoi en faire un.",
    reussite: "Tu peux expliquer en une phrase à quoi sert un skill.",
  },
  {
    slug: "1",
    num: "1",
    titre: "Trouve ton premier skill",
    tag: ["Savoir-faire", "t-product"],
    dur: "≈ 20 min",
    obj: "Le meilleur premier skill, c'est un truc que tu réexpliques sans arrêt à l'IA. On repère cette répétition, et on en choisit un qui te resservira, idéalement dès ton prochain projet.",
    detailPret: true,
    sous: [
      {
        titre: "Repère ce que tu réexpliques tout le temps.",
        duree: "≈ 10 min",
        cestquoi:
          "Un bon skill part d'une répétition : une consigne, une checklist, une façon de faire que tu redonnes à l'IA à chaque fois. Cette répétition, c'est le signe qu'il faut la capturer.",
        attendu: "Une répétition identifiée, notée en une phrase.",
        exemples: [
          "« À chaque fois, je réexplique mon style visuel. »",
          "« Je redemande toujours la même vérif avant de mettre en ligne. »",
          "« Je réécris toujours mes textes de la même façon. »",
        ],
        siCaBloque:
          "Tu sors d'un seul projet et tu n'as pas encore l'impression de te répéter ? C'est normal. Pars alors d'une répétition que tu sais à venir : ton style visuel, pour ne plus le redécrire à chaque fois, ou ta vérif avant de mettre en ligne. Note-la en une phrase, dans une note ou sur un papier.",
        monExemple:
          "Mon tout premier skill, c'était la documentation : je réexpliquais sans cesse comment je voulais que mon travail soit documenté. Le deuxième, c'était notre DA image, pour ne plus redécrire notre style à chaque visuel.",
        conseil: "Cherche le truc que tu as tapé trois fois cette semaine. C'est lui, ton premier skill.",
      },
      {
        titre: "Choisis-en un utile, et prends le réflexe.",
        duree: "≈ 10 min",
        cestquoi:
          "Pour un premier skill, prends-en un utile tout de suite. Le plus important, ce n'est pas ce skill précis, c'est le réflexe : repérer une répétition et la capturer. Ce skill-là te resservira peut-être tel quel, ou tu en créeras d'autres selon tes besoins.",
        attendu: "Un premier skill choisi, simple, et surtout l'idée que c'est un réflexe à prendre.",
        exemples: [
          "Un skill « mon style » qui garde une ambiance visuelle (couleurs, ton) pour la réappliquer d'un coup.",
          "Un skill « documente mon projet » qui écrit proprement ce que tu construis, à chaque fois de la même façon.",
        ],
        monExemple:
          "Si je devais conseiller un premier skill, ce serait un truc utile et concret, comme capturer un style ou documenter son projet. Mais le vrai cadeau, ce n'est pas ce skill-là précisément, c'est le réflexe d'en créer dès que tu te répètes.",
        conseil: "Un test simple pour ne pas voir trop gros : si tu ne peux pas résumer ton skill en une phrase, c'est qu'il est trop gros, réduis-le. Un skill qui fait une chose bien vaut mieux qu'un skill qui essaie de tout faire.",
      },
    ],
    livrable: "Le premier skill que tu vas créer, choisi et résumé en une phrase.",
    reussite: "Tu sais quelle répétition tu vas capturer, et pourquoi elle te resservira.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Crée ton skill",
    tag: ["Build", "t-build"],
    dur: "≈ 20 min",
    obj: "Créer un skill, c'est simple : tu peux le demander directement à Claude Code, juste avec un prompt. Et pour un skill vraiment carré, on te donne notre Skill Creator, en option, qui garantit le bon format et la qualité sans que tu touches à la technique.",
    detailPret: true,
    sous: [
      {
        titre: "Le plus simple : demande ton skill à Claude Code.",
        duree: "≈ 10 min",
        cestquoi:
          "Tu n'as besoin de rien d'autre que Claude Code. Tu lui dis en français ce que tu veux capturer, quand ça doit se déclencher, et ce que ça doit faire. Il crée le skill. C'est aussi direct que ça : pas besoin d'outil spécial pour commencer.",
        attendu: "Un skill créé, juste en le demandant.",
        prompt:
          "Crée-moi un skill à partir de ça : [ce que tu répètes]. Il doit se déclencher quand [la situation], et faire [ce qu'il fait]. Explique-moi en français simple ce que tu as mis dedans.",
        ceQueTuDoisVoir:
          "Claude Code crée un dossier avec un SKILL.md (un nom, une description, tes instructions) et te montre ce qu'il a fait. Il le range tout seul chez toi, tu n'as rien à déplacer ni à valider.",
        monExemple:
          "Mes premiers skills, je les ai juste demandés à Claude Code. Un bon prompt suffit largement pour se lancer, sans aucun outil en plus.",
        conseil: "Sois précis sur le QUAND (la description) : c'est ce qui fait que l'IA lance ton skill toute seule au bon moment.",
      },
      {
        titre: "Pour un skill au top : le Skill Creator (offert, en option).",
        duree: "≈ 10 min",
        cestquoi:
          "Le Skill Creator (son vrai nom technique, celui que tu verras, c'est create-skill-tools), c'est un skill qu'on te donne. Ce n'est pas obligatoire, tu sais déjà créer un skill avec un simple prompt. Mais c'est un vrai plus : il crée le skill en suivant la bonne méthode, au bon format, et s'assure qu'il est propre et fonctionnel. Utile surtout si tu n'es pas à l'aise avec la technique.",
        attendu: "Un skill créé avec le Skill Creator, encore plus carré.",
        outils: [F.skillcreator],
        exemples: [
          "Sur la page du module, clique pour télécharger le Skill Creator : un fichier .zip arrive dans tes Téléchargements.",
          "Fais glisser ce fichier directement dans la fenêtre de Claude Code, puis écris « installe ce skill ». Tu ne l'installes qu'une fois, il reste disponible ensuite.",
          "Ensuite, utilise-le à la place du simple prompt.",
        ],
        prompt:
          "Utilise le skill create-skill-tools pour me créer un skill à partir de ça : [ce que tu répètes]. Il doit se déclencher quand [la situation].",
        ceQueTuDoisVoir:
          "Le Skill Creator crée le skill, vérifie le format, et te montre ce qu'il a fait. C'est plus carré que le simple prompt, surtout si tu n'es pas à l'aise avec la technique.",
        siCaBloque:
          "Claude Code ne trouve pas le skill après l'install ? Ferme et rouvre-le : un nouveau dossier de skills n'est parfois pris en compte qu'au redémarrage.",
        monExemple:
          "Aujourd'hui, j'utilise notre Skill Creator pour que mes skills soient nickel sans que j'y pense. Mais au début, un simple prompt suffisait déjà, et c'est très bien pour commencer.",
        conseil: "Optionnel, mais recommandé dès que tu veux des skills vraiment propres. À toi de voir.",
      },
      {
        titre: "Relis ton skill.",
        duree: "≈ 8 min",
        cestquoi:
          "Le skill est un dossier avec un SKILL.md : un nom, une description (quand l'utiliser), et tes instructions. Tu relis juste pour vérifier que ça te ressemble.",
        attendu: "Un skill que tu as relu et qui te convient.",
        prompt: "Montre-moi le contenu de mon skill et explique-moi sa description en français simple.",
        ceQueTuDoisVoir:
          "Claude Code te montre ton fichier SKILL.md : en haut, entre deux lignes de tirets, le nom et la description ; en dessous, les instructions. Tu n'as pas besoin d'aller le chercher toi-même, il te l'affiche. Pas besoin de tout comprendre : vérifie surtout que la description dit bien quand l'utiliser.",
        siCaBloque:
          "Tu ne retrouves pas le dossier ? Demande à Claude Code « où as-tu créé mon skill, montre-moi le fichier ».",
        conseil: "Une bonne relecture, c'est surtout vérifier la description : c'est elle qui décide quand ton skill se déclenche.",
      },
    ],
    livrable: "Ton skill créé (au simple prompt ou avec le Skill Creator), relu par toi.",
    reussite: "Le skill existe chez toi et sa description dit clairement quand l'utiliser.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Teste-le et fais-le réviser",
    tag: ["Build", "t-build"],
    dur: "≈ 30 min",
    obj: "Un skill qui existe mais ne se déclenche jamais ne sert à rien. On vérifie qu'il part au bon moment, et, en option, on le fait réviser par notre skill Improve pour l'améliorer encore.",
    detailPret: true,
    sous: [
      {
        titre: "Lance ton skill et vérifie qu'il part.",
        duree: "≈ 10 min",
        cestquoi:
          "Deux façons de le lancer : tu tapes /nom-du-skill dans la zone où tu écris à Claude Code (comme un message), ou tu fais une demande normale qui correspond à sa description, et l'IA le déclenche toute seule.",
        attendu: "Ton skill se lance et fait ce que tu attendais.",
        exemples: [
          "Taper /ma-da pour l'appeler directement.",
          "Écrire « applique mon style à cette page » et voir le skill se déclencher tout seul.",
        ],
        ceQueTuDoisVoir:
          "Quand le skill se lance, l'IA affiche son nom et suit tes instructions au lieu de repartir de zéro. Le résultat ressemble à ce que tu obtenais avant en réexpliquant tout, mais sans avoir eu à le réexpliquer.",
        siCaBloque:
          "Tu tapes /nom et il ne se passe rien ? Vérifie le nom exact (c'est le nom du dossier). Pas sûr du nom ? Demande à Claude Code « quel est le nom exact pour appeler mon skill ? ». L'IA ne le déclenche pas toute seule alors que la situation s'y prête ? C'est presque toujours la description qui n'est pas assez claire : passe à la sous-étape suivante.",
        conseil: "Teste-le sur un vrai cas, celui qui t'a donné l'idée du skill. C'est le meilleur test.",
      },
      {
        titre: "Ajuste la description jusqu'à ce qu'il parte au bon moment.",
        duree: "≈ 10 min",
        cestquoi:
          "La description, c'est ce qui dit à l'IA QUAND utiliser le skill. Si elle est floue, l'IA ne le déclenche pas. Tu n'ouvres rien toi-même : tu demandes à Claude Code de la retravailler, jusqu'à ce que ça marche.",
        attendu: "Un skill qui se déclenche tout seul quand la situation s'y prête.",
        prompt:
          "Mon skill ne se déclenche pas quand je [la situation]. Améliore sa description pour qu'il se lance dans ce cas, sans se déclencher à tort le reste du temps.",
        ceQueTuDoisVoir:
          "Tu refais ta demande normale, et cette fois le skill part tout seul, sans que tu tapes son nom. C'est le signe que la description est bonne.",
        monExemple:
          "La première fois, mes skills ne partaient pas tout seuls. En vrai, c'était juste la description à retravailler. Une fois qu'elle est claire, l'IA les déclenche au bon moment sans que j'y pense.",
        conseil: "Une bonne description dit clairement dans quels cas utiliser le skill, avec les mots que tu emploies vraiment. Et c'est normal de s'y reprendre à deux ou trois fois : c'est juste une question de formulation.",
      },
      {
        titre: "En option : fais réviser ton skill avec l'Improve (offert).",
        duree: "≈ 10 min",
        cestquoi:
          "L'Improve, c'est un deuxième skill qu'on te donne, là aussi en option. Il lit ton fichier SKILL.md, celui-là même que l'IA regarde pour décider quand lancer ton skill, et il le passe en revue comme un relecteur expert. Il te propose des améliorations, sur le fond (est-ce clair, utile) et sur la technique (le format, la description). Il ne casse rien, il conseille.",
        attendu: "Une revue de ton skill avec des pistes concrètes d'amélioration.",
        outils: [F.improve],
        exemples: [
          "Télécharge l'Improve sur la page du module (un .zip), fais-le glisser dans la fenêtre de Claude Code et écris « installe ce skill ». C'est la même manip que le Skill Creator.",
          "Demande-lui de passer ton skill en revue, puis applique ce qui te parle.",
        ],
        prompt:
          "Utilise le skill improve-skill-tools pour passer mon skill [nom] en revue et propose-moi des améliorations, sur le fond et sur la technique.",
        siCaBloque:
          "Claude Code ne trouve pas l'Improve après l'install ? Ferme et rouvre-le : un nouveau skill n'est parfois pris en compte qu'au redémarrage.",
        monExemple:
          "Faire relire mes skills par l'Improve, ça les fait passer un cap. Il repère ce que je ne voyais pas, sur le fond comme sur la forme.",
        conseil: "Tu n'es pas obligé de tout appliquer. Prends ce qui rend ton skill plus clair et plus utile.",
      },
    ],
    livrable: "Un skill testé qui se déclenche et fait ce qu'on attend (et, si tu veux, passé au crible de l'Improve).",
    reussite: "Le skill part au bon moment, à la main et tout seul.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Réutilise-le",
    tag: ["Ship", "t-ship"],
    dur: "≈ 15 min",
    obj: "Le vrai gain est double : ce skill te suit sur tous tes projets, et surtout tu as maintenant le réflexe d'en créer dès que tu répètes quelque chose. Au prochain module, tu créeras les skills dont tu as besoin, tu sais faire.",
    detailPret: true,
    sous: [
      {
        titre: "Sers-t'en sur une vraie tâche.",
        duree: "≈ 5 min",
        cestquoi:
          "Utilise ton skill pour de bon, pas juste pour tester. Reprends le vrai cas qui t'a donné l'idée du skill, et cette fois laisse-le faire le travail. Tu gagnes tout le temps que tu passais à réexpliquer la même chose.",
        attendu: "Ton skill utilisé sur un vrai besoin.",
        monExemple:
          "Mon skill de DA (mon style visuel), je m'en sers sur presque tous nos visuels. Je ne redécris plus jamais notre style, il est capturé une fois pour toutes.",
        conseil: "À chaque fois que tu te surprends à réexpliquer la même chose, c'est un futur skill.",
      },
      {
        titre: "Garde le réflexe pour tes prochains projets.",
        duree: "≈ 2 min · rien à faire, juste à retenir",
        cestquoi:
          "Ton skill est rangé chez toi, pas dans le dossier de ton site. Du coup il te suit partout : tu pourras l'utiliser sur ton prochain projet sans le recréer. Au module suivant, tu créeras les skills dont tu as besoin, maintenant que tu sais faire.",
        attendu: "Le réflexe est là : dès que tu répètes quelque chose, tu en fais un skill.",
        monExemple:
          "Aujourd'hui, j'ai même un skill pour créer des skills. C'est dire si c'est devenu un réflexe : dès que je répète quelque chose, j'en fais un skill.",
        conseil: "Avant de partir, note en une phrase la prochaine répétition que tu transformeras en skill. C'est ça, le réflexe.",
      },
    ],
    livrable: "Ton premier skill à toi, créé, testé, et prêt à te resservir. Et surtout, tu sais faire, maintenant : c'est acquis.",
    reussite: "Ton skill te resservira, et tu sais désormais en créer un dès que tu te répètes.",
  },
];
