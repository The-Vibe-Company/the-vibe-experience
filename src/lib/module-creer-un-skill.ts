import type { EtapeDetail } from "./module-faire-un-site";

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
    dur: "≈ 10 min · rien à installer",
    obj: "Tu as déjà Claude Code de ton premier projet, rien de neuf à installer. Un skill, c'est une compétence que tu apprends une fois à l'IA et qu'elle réutilise ensuite toute seule. Tu viens d'en utiliser des tout faits (Impeccable, Agent Browser), là tu fais le tien. Et rassure-toi : créer un skill n'abîme rien, ça s'ajoute à côté.",
    detailPret: true,
    sous: [
      {
        titre: "Tu as déjà ton seul outil : Claude Code.",
        duree: "≈ 2 min",
        cestquoi:
          "Le seul outil de ce module, c'est Claude Code, déjà installé à ton premier projet. Un skill, c'est juste un dossier rangé chez toi, dont Claude Code s'occupe tout seul : tu n'as jamais à aller le chercher à la main. Rien à installer, rien à payer en plus. Et tout se passe en parlant à Claude Code, jamais dans le Terminal. Créer un skill ne touche ni à ton site ni à Claude Code : ça s'ajoute simplement à côté.",
        attendu:
          "Claude Code rouvert, comme au module précédent. Le plus simple : rouvre ton dossier de site, l'étape 1 t'y fera repérer tes répétitions. Mais un skill se range chez toi, pas dans un projet précis, donc n'importe quel dossier marcherait aussi.",
        outils: [F.claudecode],
        ceQueTuDoisVoir:
          "Claude Code s'ouvre et tu retrouves la zone où tu écris tes messages, exactement comme au module précédent. Si l'app te redemande de te connecter, fais-le, c'est normal après une fermeture. Dès que tu vois la zone de discussion, tu es prêt.",
        siCaBloque:
          "Tu ne sais plus comment rouvrir Claude Code ? Clique sur son icône comme n'importe quelle app (elle est dans tes Applications, ou tape son nom avec cmd + espace). Elle refuse de s'ouvrir ou te déconnecte ? Rouvre-la une fois et reconnecte-toi, il n'y a rien de cassé.",
        monExemple:
          "Ce qui me plaît, c'est d'avoir un seul outil qui gère tout, très complet, et qui s'adapte à ce que tu veux faire. Rien d'autre à payer, rien d'autre à installer : tu commences tout de suite. Et comme il sait presque tout faire, tu évites d'empiler plusieurs produits différents.",
        conseil:
          "Si tu as sauté le module « Faire un site », installe d'abord Claude Code (son étape 0). Tout part de là. Et garde ce réflexe pour tout le module : quand quelque chose cloche ou te surprend, décris ton problème à Claude Code (ce que tu as fait, ce que tu attendais, ce que tu vois) et discute avec lui. Il y aura toujours des cas imprévus, et c'est comme ça qu'ils se résolvent.",
      },
      {
        titre: "Comprends ce qu'est un skill (et pourquoi ça change tout).",
        duree: "≈ 5 min",
        cestquoi:
          "Un skill, c'est le petit dossier dont on parlait, et dedans il y a trois choses : un nom, une description (quand l'IA doit l'utiliser) et des instructions (ce qu'elle doit faire). Techniquement, tout ça tient dans un simple fichier texte appelé SKILL.md. Tu n'auras jamais à l'écrire toi-même, Claude Code s'en occupe, retiens juste le mot, tu le reverras. Tu l'appelles en tapant /nom dans la zone où tu écris à Claude Code, comme un message (par exemple /impeccable), ou l'IA le déclenche toute seule quand ta demande colle à la description. Tu l'apprends une fois, elle s'en ressert toujours.",
        attendu:
          "Avoir compris l'idée : capturer une compétence pour ne plus la réexpliquer à chaque fois.",
        exemples: ["Les skills tout faits que tu as déjà utilisés au module précédent : Impeccable, Agent Browser."],
        visuel: {
          src: "/module/skill-0-2-docs.png",
          alt: "La documentation officielle de Claude Code sur les skills : un skill est un fichier SKILL.md, déclenché tout seul ou avec /nom.",
          legende: "Un skill n'est pas un truc maison : c'est le standard officiel de Claude Code. Un fichier SKILL.md avec tes instructions, que l'IA lance toute seule au bon moment ou que tu appelles avec /nom.",
        },
        ceQueTuDoisVoir:
          "Tu n'as rien à produire ici, juste à retenir une idée simple. Le signe que c'est acquis : tu peux dire en une phrase, à voix haute, à quoi sert un skill (par exemple, capturer une façon de faire une fois pour ne plus la réexpliquer à chaque fois). Si tu y arrives, tu peux avancer.",
        siCaBloque:
          "Tu ne vois toujours pas l'intérêt ? Repense à Impeccable au module précédent : tu ne lui as jamais réexpliqué comment rendre ton code propre, il savait déjà. Un skill, c'est exactement ça, sauf que cette fois c'est toi qui l'apprends à l'IA, une seule fois.",
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
    dur: "≈ 10 min",
    obj: "Le meilleur premier skill, c'est un truc que tu réexpliques sans arrêt à l'IA. On repère cette répétition, et on en choisit un qui te resservira, idéalement dès ton prochain projet.",
    detailPret: true,
    sous: [
      {
        titre: "Repère ce que tu réexpliques tout le temps.",
        duree: "≈ 5 min",
        cestquoi:
          "Un bon skill part d'une répétition : une consigne, une vérif, une façon de faire que tu redonnes à l'IA à chaque fois. Tu sors d'un seul projet et tu n'as pas encore l'impression de te répéter ? C'est le cas normal ici, pas un problème. Pars alors d'une répétition que tu sais à venir : ton style visuel, pour ne plus le redécrire à chaque fois, ou ta vérif avant de mettre en ligne. Petit truc à savoir : Claude Code ne se souvient pas de vos conversations passées, il regarde seulement les fichiers de ton projet. Ouvre donc ton dossier de site avant de lui demander.",
        attendu: "Une répétition identifiée, écrite en une phrase quelque part.",
        exemples: [
          "« À chaque fois, je réexplique mon style visuel. »",
          "« Je redemande toujours la même vérif avant de mettre en ligne. »",
          "« Je réécris toujours mes textes de la même façon. »",
        ],
        prompt:
          "Regarde les fichiers de mon projet. D'après ce que tu vois, qu'est-ce que j'ai sans doute dû te réexpliquer plusieurs fois, par exemple mon style ou ma façon de vérifier ? Aide-moi à en faire une phrase courte.",
        ceQueTuDoisVoir:
          "Tu as une phrase écrite quelque part, qui nomme une action précise (par exemple « je réexplique mon style visuel à chaque image »), pas un vague objectif (« je veux que ce soit beau »). Si ta phrase pourrait s'appliquer à n'importe quoi, resserre-la sur le geste exact que tu répètes.",
        siCaBloque:
          "Tu ne vois vraiment aucune répétition, ni présente ni à venir ? Prends la plus courante pour presque tout le monde : ton style visuel, que tu redécris à chaque page ou chaque image. C'est un excellent premier skill.",
        monExemple:
          "Mon tout premier skill, c'était la documentation : je réexpliquais sans cesse comment je voulais que mon travail soit documenté. Le deuxième, c'était notre DA image, pour ne plus redécrire notre style à chaque visuel.",
        conseil:
          "Ouvre une note sur ton ordi ou prends un papier, et écris ta répétition en une seule phrase. L'écrire, ça matérialise la décision. Cherche le truc que tu as tapé plusieurs fois cette semaine : c'est lui, ton premier skill.",
      },
      {
        titre: "Réduis ton idée à une seule chose (et garde le réflexe).",
        duree: "≈ 3 min · surtout à comprendre",
        cestquoi:
          "Pour un premier skill, prends-en un utile tout de suite. Le plus important, ce n'est pas ce skill précis, c'est le réflexe : repérer une répétition et la capturer. Ce skill-là te resservira peut-être tel quel, ou tu en créeras d'autres selon tes besoins.",
        attendu:
          "Ta répétition tient en une seule phrase et ne fait qu'une chose. Si ta phrase contient un « et » qui cache deux missions différentes, coupe et garde-en une. C'est ça, un premier skill à ta taille.",
        exemples: [
          "Un skill « mon style » qui garde une ambiance visuelle (couleurs, ton) pour la réappliquer d'un coup.",
          "Un skill « documente mon projet » qui écrit proprement ce que tu construis, à chaque fois de la même façon.",
        ],
        siCaBloque:
          "Tu as noté deux ou trois répétitions et tu n'arrives pas à choisir ? Prends la plus pénible, celle qui te fait soupirer à chaque fois, ou celle qui reviendra dès ton prochain projet. Aucune ne te paraît utile tout de suite ? Ce n'est pas grave, ce premier skill est un galop d'essai : prends celle que tu comprends le mieux.",
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
    dur: "≈ 25 min",
    obj: "Créer un skill, c'est simple : tu peux le demander directement à Claude Code, juste avec un prompt. Et pour un skill vraiment carré, on te donne notre Skill Creator, en option, qui garantit le bon format et la qualité sans que tu touches à la technique.",
    detailPret: true,
    sous: [
      {
        titre: "Le plus simple : demande ton skill à Claude Code.",
        duree: "≈ 8 min",
        cestquoi:
          "Tu n'as besoin de rien d'autre que Claude Code. Tu lui dis en français ce que tu veux capturer, quand ça doit se déclencher, et ce que ça doit faire. Il crée le skill. C'est aussi direct que ça : pas besoin d'outil spécial pour commencer.",
        attendu: "Un skill créé, juste en le demandant.",
        prompt:
          "Crée-moi un skill à partir de ça : [ce que tu répètes]. Il doit se déclencher quand [la situation], et faire [ce qu'il fait]. Range-le dans mes skills personnels, pour qu'il me suive sur tous mes projets. Explique-moi en français simple ce que tu as mis dedans.",
        exemples: [
          "Concrètement, ça donne : « Crée-moi un skill à partir de ça : je réexplique tout le temps mon style visuel (fond crème, titres en gros, ton chaleureux). Il doit se déclencher quand je demande de créer ou refaire une page, et faire en sorte que la page respecte ce style. Explique-moi en français simple ce que tu as mis dedans. »",
        ],
        ceQueTuDoisVoir:
          "Claude Code crée un dossier avec un SKILL.md (un nom, une description, tes instructions) et te montre ce qu'il a fait. Il le range tout seul chez toi, tu n'as rien à déplacer toi-même. S'il te demande l'autorisation de créer un fichier, dis oui, c'est juste lui qui range ton skill.",
        siCaBloque:
          "Claude Code te demande si tu veux le skill « pour ce projet » ou « pour tous tes projets » ? Réponds : pour tous mes projets. C'est ce qui fait qu'il te suivra partout, y compris sur ton prochain produit. Il te dit qu'il a créé le skill mais tu ne vois aucun dossier apparaître ? C'est normal, les skills sont rangés dans un dossier système que tu n'as pas à ouvrir. Pour le voir quand même, demande-lui « montre-moi le fichier de mon skill ». Et s'il te demande l'autorisation de créer un fichier, dis oui : c'est juste lui qui range ton skill.",
        monExemple:
          "Mes premiers skills, je les ai juste demandés à Claude Code. Un bon prompt suffit largement pour se lancer, sans aucun outil en plus.",
        conseil: "Sois précis sur le QUAND (la description) : c'est ce qui fait que l'IA lance ton skill toute seule au bon moment.",
      },
      {
        titre: "Pour un skill au top : le Skill Creator (offert, en option).",
        duree: "≈ 10 min",
        cestquoi:
          "Le Skill Creator (son vrai nom technique, celui que tu verras, c'est create-skill-tools), c'est notre vrai outil de travail, celui qu'on utilise nous-mêmes tous les jours, et tu repars avec. Ce n'est pas obligatoire, tu sais déjà créer un skill avec un simple prompt. Mais c'est un vrai plus : il crée le skill en suivant la bonne méthode, au bon format, et s'assure qu'il est propre et fonctionnel. C'est un outil de pro : il sait faire beaucoup plus que ce qu'on utilise ici (des tests, des mesures), et il est écrit en anglais à l'intérieur. Aucun souci : tu lui parles en français, et on lui demande la version simple. C'est aussi la première fois que tu installes un skill toi-même, on y va pas à pas.",
        attendu: "Un skill créé avec le Skill Creator, encore plus carré.",
        telechargements: [{ n: "le Skill Creator", href: "/skills/create-skill-tools.zip" }],
        outils: [F.skillcreator],
        exemples: [
          "Clique sur le bouton « Télécharger le Skill Creator » juste au-dessus. Un fichier create-skill-tools.zip arrive dans ton dossier Téléchargements. Ne double-clique pas dessus, ne le décompresse pas, laisse-le tel quel.",
          "Mets la fenêtre de Claude Code et la fenêtre de tes Téléchargements côte à côte, pour bien voir les deux en même temps. Attrape le fichier .zip avec la souris, garde le clic enfoncé, amène-le jusque dans la zone où tu écris tes messages à Claude Code, puis relâche. Une pastille au nom du fichier apparaît dans la zone de message. Écris alors « installe ce skill » et envoie. Si Claude Code te demande l'autorisation de lancer une action pour ranger le skill, dis oui, c'est juste lui qui l'installe. Tu ne fais ça qu'une seule fois, il reste disponible ensuite.",
          "Ensuite, sers-toi du Skill Creator à la place du simple prompt : pas besoin de recréer un deuxième skill, tu peux refaire le même en mieux, ou en créer un nouveau.",
        ],
        prompt:
          "Utilise le skill create-skill-tools pour me créer un skill à partir de ça : [ce que tu répètes]. Il doit se déclencher quand [la situation]. Range-le dans mes skills personnels. Fais la version simple, sans évaluations ni tests automatiques : c'est mon premier skill. Et parle-moi en français.",
        ceQueTuDoisVoir:
          "Quand tu lâches le .zip dans la fenêtre, Claude Code affiche le nom du fichier. Après « installe ce skill », il te confirme que le skill est installé et disponible. Ensuite, quand tu l'utilises, le Skill Creator peut te poser une ou deux questions avant de créer (c'est sa méthode de pro) : réponds simplement en français. Puis il crée le skill, vérifie le format et te montre ce qu'il a fait. C'est plus carré que le simple prompt, surtout si tu n'es pas à l'aise avec la technique.",
        siCaBloque:
          "Tu te retrouves avec un dossier au lieu d'un .zip ? Sur Safari, le téléchargement peut se décompresser tout seul, même sans double-clic : glisse le dossier, ça marche pareil. Les deux fenêtres se cachent l'une l'autre ? Réduis-les pour les voir côte à côte avant de glisser. Le glisser-déposer n'a rien fait ? Recommence doucement, en relâchant bien à l'intérieur de la zone de message. Claude Code ne trouve pas le skill juste après l'install ? Ferme et rouvre-le : un nouveau skill n'est parfois pris en compte qu'au redémarrage. Le Skill Creator part dans de grandes questions techniques ou une longue boucle de tests ? C'est son mode expert : dis-lui « reste sur la version simple, c'est mon premier skill » et il se recentre. Tu refais « le même en mieux » et tu te demandes ce que devient le premier ? Demande simplement « remplace mon skill existant » pour ne pas te retrouver avec deux versions dans la liste. Et si Claude Code s'arrête en disant que tu as atteint ta limite d'utilisation, attends qu'elle se réinitialise et reprends, pas besoin de passer à l'offre Max.",
        monExemple:
          "Aujourd'hui, j'utilise notre Skill Creator pour que mes skills soient nickel sans que j'y pense. Mais au début, un simple prompt suffisait déjà, et c'est très bien pour commencer.",
        conseil: "Optionnel, mais recommandé dès que tu veux des skills vraiment propres. À toi de voir.",
      },
      {
        titre: "Relis ton skill.",
        duree: "≈ 7 min",
        cestquoi:
          "Le skill est un dossier avec un SKILL.md : un nom, une description (quand l'utiliser), et tes instructions. Tu relis juste pour vérifier que ça te ressemble.",
        attendu: "Un skill que tu as relu et qui te convient.",
        prompt: "Montre-moi le contenu de mon skill et explique-moi sa description en français simple.",
        ceQueTuDoisVoir:
          "Claude Code te montre ton fichier SKILL.md : en haut, entre deux lignes de tirets, le nom et la description ; en dessous, les instructions. Tu n'as pas besoin d'aller le chercher toi-même, il te l'affiche. Pas besoin de tout comprendre : vérifie surtout que la description dit bien quand l'utiliser.",
        visuel: {
          src: "/module/skill-2-3-skillmd.png",
          alt: "Le haut d'un SKILL.md ouvert dans Claude Code : le nom du skill, puis sa longue description qui explique quand l'utiliser.",
          legende: "Un de mes vrais SKILL.md : le nom en haut, puis la description. C'est elle que tu relis en priorité, elle dit à l'IA quand utiliser ton skill.",
        },
        siCaBloque:
          "Tu ne retrouves pas le dossier ? Demande à Claude Code « où as-tu créé mon skill, montre-moi le fichier ».",
        monExemple:
          "La première fois que j'ai ouvert un de mes SKILL.md, ça ressemblait à un fichier technique. En vrai, j'ai compris que la description est essentielle : c'est elle qui te dit ce que fait ton skill, et le reste, ce sont tes instructions écrites noir sur blanc. Mes premiers skills, justement, manquaient de descriptions.",
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
          "Deux façons de le lancer : tu tapes /nom-du-skill dans la zone où tu écris à Claude Code (comme un message), ou tu fais une demande normale qui correspond à sa description, et l'IA le déclenche toute seule. Ton skill a un nom court, souvent un ou deux mots reliés par un tiret, par exemple mon-style. Si tu ne l'as pas noté en le créant, pas de panique, on le retrouve juste en dessous.",
        attendu: "Ton skill se lance et fait ce que tu attendais.",
        exemples: [
          "Taper /ma-da pour l'appeler directement.",
          "Écrire « applique mon style à cette page » et voir le skill se déclencher tout seul.",
        ],
        ceQueTuDoisVoir:
          "Dès que tu tapes la barre oblique /, une petite liste de noms s'ouvre au-dessus de la zone d'écriture. Ton skill doit y figurer : le fait qu'il soit dans la liste, c'est déjà la preuve qu'il est installé. Choisis-le, ou finis de taper son nom, puis envoie. Quand le skill part, une ligne à son nom s'affiche (du genre « Skill : mon-style »), et l'IA enchaîne en suivant tes instructions au lieu de te reposer les mêmes questions. Pour le déclenchement tout seul, c'est le même repère : sans que tu aies tapé le moindre /, cette ligne au nom de ton skill apparaît. Si elle est là, il s'est vraiment lancé de lui-même.",
        visuel: {
          src: "/module/skill-3-1-slash-menu.png",
          alt: "Le menu « / » de Claude Code : le nom du skill s'affiche dans la liste pendant la frappe, avec sa description au-dessus.",
          legende: "Chez moi : je tape / et mon skill apparaît dans la liste, avec sa description. S'il est là, il est installé.",
        },
        siCaBloque:
          "Ton skill n'apparaît pas dans la liste du / ? Ferme et rouvre Claude Code : un skill tout juste créé n'est parfois pris en compte qu'au redémarrage. Toujours rien après ça ? Vérifie le nom exact (c'est le nom du dossier), ou demande à Claude Code « quel est le nom exact pour appeler mon skill ? ». L'IA ne le déclenche pas toute seule alors que la situation s'y prête ? C'est presque toujours la description qui n'est pas assez claire : passe à la sous-étape suivante.",
        monExemple:
          "Mes premiers skills, c'étaient Impeccable et Agent Browser. La toute première fois, je n'étais même pas sûr que ça avait marché : Impeccable travaille le code, le changement ne se voyait presque pas à l'écran. D'où l'importance de ce repère : la ligne au nom du skill, c'est elle qui te dit qu'il est bien parti.",
        conseil: "Teste-le sur un vrai cas, celui qui t'a donné l'idée du skill. C'est le meilleur test.",
      },
      {
        titre: "Ajuste la description jusqu'à ce qu'il parte au bon moment.",
        duree: "≈ 10 min",
        cestquoi:
          "La description, c'est ce qui dit à l'IA QUAND utiliser le skill. Si elle est floue, l'IA ne le déclenche pas. Tu n'ouvres rien toi-même : tu demandes à Claude Code de la retravailler, jusqu'à ce que ça marche.",
        attendu: "Un skill qui se déclenche tout seul quand la situation s'y prête.",
        exemples: [
          "Une description trop vague, qui ne se déclenche pas : « pour mes visuels ».",
          "La même, retravaillée, qui se déclenche : « À utiliser quand je demande de créer une image, un visuel, une illustration ou une vignette, pour appliquer mon style maison. »",
          "La différence, ce sont les mots concrets que tu tapes vraiment quand tu fais ta demande.",
        ],
        prompt:
          "Mon skill ne se déclenche pas quand je [la situation]. Améliore sa description pour qu'il se lance dans ce cas, sans se déclencher à tort le reste du temps.",
        ceQueTuDoisVoir:
          "Important : teste dans une NOUVELLE conversation (ferme celle-ci ou ouvre-s'en une neuve). Dans la conversation où vous venez de créer le skill, l'IA l'a en tête de toute façon, le test ne prouve rien. Dans la conversation neuve, tu refais ta demande normale, et cette fois le skill part tout seul, sans que tu tapes son nom. C'est le signe que la description est bonne.",
        siCaBloque:
          "Même après deux ou trois essais il ne part pas tout seul ? Donne à Claude Code la phrase exacte que tu tapes, mot pour mot, et dis-lui « mets ces mots-là dans la description pour que le skill se déclenche quand j'écris ça ». À l'inverse, il se lance alors que tu ne veux pas ? Dis-lui « resserre la description, il ne doit se déclencher que quand [ton cas précis] ». En attendant, tu peux toujours l'appeler à la main avec /nom : le skill marche déjà, c'est juste le moment du départ qu'on règle.",
        monExemple:
          "La première fois, mes skills ne partaient pas tout seuls. En vrai, c'était juste la description à retravailler. Une fois qu'elle est claire, l'IA les déclenche au bon moment sans que j'y pense.",
        conseil: "Une bonne description dit clairement dans quels cas utiliser le skill, avec les mots que tu emploies vraiment. Et c'est normal de s'y reprendre à deux ou trois fois : c'est juste une question de formulation.",
      },
      {
        titre: "En option : fais réviser ton skill avec l'Improve (offert).",
        duree: "≈ 10 à 15 min",
        cestquoi:
          "L'Improve (vrai nom : improve-skill-tools), c'est notre deuxième vrai outil, offert lui aussi. Il lit ton fichier SKILL.md, celui-là même que l'IA regarde pour décider quand lancer ton skill, et il le passe en revue comme un relecteur expert. Il te propose des améliorations, sur le fond (est-ce clair, utile) et sur la technique (le format, la description). Un point important sur sa façon de travailler : l'Improve RELIT, il ne modifie jamais rien lui-même, c'est voulu (un relecteur ne touche pas au texte). Pour appliquer ses remarques, c'est à Claude Code que tu le demandes ensuite.",
        attendu: "Une revue de ton skill avec des pistes concrètes d'amélioration.",
        telechargements: [{ n: "l'Improve", href: "/skills/improve-skill-tools.zip" }],
        outils: [F.improve],
        exemples: [
          "Télécharge l'Improve avec le bouton juste au-dessus (un .zip), fais-le glisser dans la fenêtre de Claude Code et écris « installe ce skill ». C'est la même manip que le Skill Creator.",
          "Demande-lui de passer ton skill en revue, puis applique ce qui te parle.",
        ],
        prompt:
          "Utilise le skill improve-skill-tools pour passer mon skill [nom] en revue et propose-moi des améliorations, sur le fond et sur la technique. Résume-moi la revue en français simple.",
        ceQueTuDoisVoir:
          "L'Improve lit ton skill et te répond une liste de remarques numérotées : ce qui est déjà bien, et ce qui gagnerait à être plus clair, comme la description, le format ou une instruction floue. Il peut aussi ranger sa revue dans un dossier « plans » de ton projet : c'est son carnet de notes, tu n'as pas à l'ouvrir. Lui ne change rien, c'est son rôle de relecteur. Pour appliquer, demande ensuite tout simplement à Claude Code : « applique les points 1 et 3 de cette revue à mon skill ». Tu n'es pas obligé de tout prendre.",
        visuel: {
          src: "/module/skill-3-3-improve.png",
          alt: "La sortie de l'Improve : un tableau de constats numérotés avec pour chacun une catégorie, un impact, un effort et une preuve.",
          legende: "Une vraie revue de l'Improve sur un de mes skills : chaque remarque est numérotée, avec son impact. Tu choisis celles que tu appliques.",
        },
        siCaBloque:
          "L'Improve te propose plein de choses et tu ne sais pas quoi en faire ? Prends-en une seule pour commencer : dis à Claude Code « applique juste le point 1 de la revue à mon skill » et regarde le résultat. L'Improve répond qu'il n'applique pas lui-même ? C'est normal, c'est son rôle : adresse ta demande d'application à Claude Code, pas à l'Improve. Sa revue est en anglais ? Demande « résume-moi cette revue en français simple ». Et s'il ne se trouve pas après l'install, ferme et rouvre Claude Code : un nouveau skill n'est parfois pris en compte qu'au redémarrage.",
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
    titre: "Réutilise-le et fais-le valider",
    tag: ["Ship", "t-ship"],
    dur: "≈ 20 à 25 min",
    obj: "Le vrai gain est double : ce skill te suit sur tous tes projets, et surtout tu as maintenant le réflexe d'en créer dès que tu répètes quelque chose. On s'en sert pour de vrai, on le fait valider par le juge, et c'est bouclé.",
    detailPret: true,
    sous: [
      {
        titre: "Sers-t'en pour de vrai, sur un vrai projet.",
        duree: "≈ 15 min",
        cestquoi:
          "Là, on ne teste plus, on s'en sert pour de bon. Rouvre un vrai projet dans Claude Code : ton site du module précédent, ou un nouveau dossier. Reprends le cas concret qui t'a donné l'idée du skill, et cette fois laisse-le faire le travail en entier, sans rien lui réexpliquer.",
        attendu: "Ton skill utilisé sur un vrai besoin, dans un vrai projet, du début à la fin.",
        prompt: "Utilise mon skill [nom] sur [le vrai cas, par exemple la page d'accueil de mon site]. Fais le travail en entier, je ne te réexplique rien.",
        ceQueTuDoisVoir:
          "Le skill se lance et fait le travail d'un coup, sans que tu redécrives ton style, ta checklist ou ta façon de faire. Compare au temps que ça te prenait avant, quand tu réexpliquais tout à chaque fois : c'est exactement ça, le gain que tu viens de fabriquer.",
        siCaBloque:
          "Le skill fait presque ce que tu veux mais pas tout à fait ? Ne corrige pas le résultat à la main. Dis à Claude Code ce qui manque et demande-lui d'améliorer le skill lui-même (par exemple « ajoute telle règle à mon skill »). Comme ça, la prochaine fois, il sera meilleur tout seul.",
        monExemple:
          "Mon skill de DA (mon style visuel), je m'en sers sur presque tous nos visuels. Je ne redécris plus jamais notre style, il est capturé une fois pour toutes.",
        conseil: "À chaque fois que tu te surprends à réexpliquer la même chose, c'est un futur skill.",
      },
      {
        titre: "Fais valider ton skill par le juge.",
        duree: "≈ 5 min",
        cestquoi:
          "Comme pour ton site au module précédent, on te donne un juge, mais pour les skills. Il lit ton fichier SKILL.md et vérifie qu'il est bien formé : un nom, une description qui dit quand l'utiliser, et des instructions. Ce n'est pas une note, juste un coup de main pour finir proprement.",
        attendu: "Ton skill passé au juge, et les points qu'il signale corrigés si besoin.",
        exemples: [
          "Sur la page du module, tout en bas, ouvre l'encadré « Le juge des skills » et clique dessus.",
          "Demande à Claude Code « montre-moi le contenu de mon skill », copie tout, colle-le dans le juge, et lance l'évaluation.",
        ],
        ceQueTuDoisVoir:
          "Le juge te dit ce qui va et ce qui manque, et à quelle étape revenir s'il faut. Quand tout est bon, tu as la confirmation que ton skill est propre et solide.",
        siCaBloque:
          "Le juge signale qu'il manque quelque chose ? C'est souvent la description à préciser. Corrige avec Claude Code, repasse le juge, et c'est bouclé. Ce n'est pas une punition, il t'aide juste à finir propre.",
        conseil: "Un skill validé par le juge, c'est un skill que tu peux réutiliser les yeux fermés sur tes prochains projets.",
      },
      {
        titre: "Garde le réflexe pour tes prochains projets.",
        duree: "≈ 2 min · rien à faire, juste à retenir",
        cestquoi:
          "Ton skill est rangé chez toi, pas dans le dossier de ton site. Du coup il te suit partout : tu pourras l'utiliser sur ton prochain projet sans le recréer. Et surtout, tu as maintenant le réflexe : sur tes prochains produits, tu créeras les skills dont tu as besoin au fur et à mesure, tu sais faire.",
        attendu: "Le réflexe est là : dès que tu répètes quelque chose, tu en fais un skill.",
        ceQueTuDoisVoir:
          "Tu peux nommer, en une phrase, la prochaine répétition que tu transformeras en skill. C'est le signe que le réflexe est là.",
        monExemple:
          "Aujourd'hui, j'ai même un skill pour créer des skills. C'est dire si c'est devenu un réflexe : dès que je répète quelque chose, j'en fais un skill.",
        conseil: "Avant de partir, note en une phrase la prochaine répétition que tu transformeras en skill. C'est ça, le réflexe.",
      },
    ],
    livrable: "Ton premier skill à toi, créé, testé, utilisé pour de vrai et validé par le juge. Et surtout, tu sais faire, maintenant : c'est acquis.",
    reussite: "Ton skill s'est déclenché sur un vrai projet, il est passé au juge, et tu sais désormais en créer un dès que tu te répètes.",
  },
];
